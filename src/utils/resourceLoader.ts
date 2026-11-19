/**
 * 资源加载管理器
 * 集中管理所有静态资源的预加载，包括字体、图片等
 * 支持缓存机制，避免重复加载
 *
 * 加载顺序：critical（加载页 + 首页主视觉 + 全局按钮皮肤）先行，
 * secondary（其余页面素材）紧随其后 —— 全部完成后才进入应用，
 * 页面渲染时图片直接命中 HTTP 缓存，不再逐张闪现
 */

import { CDN_PRELOAD_CRITICAL, CDN_PRELOAD_SECONDARY } from '../constants/cdn';

// 单个资源加载超时时间：超时后放行，避免网络挂起导致应用永远无法进入
const RESOURCE_TIMEOUT = 8000;

export interface ResourceItem {
  name: string;
  type: 'font' | 'image' | 'other';
  url: string;
  /** 关键资源：优先加载，决定进入应用的临界路径 */
  critical?: boolean;
}

export interface LoadProgress {
  loaded: number;
  total: number;
  percentage: number;
  currentResource: string;
}

type ProgressCallback = (progress: LoadProgress) => void;
type CompleteCallback = () => void;
type ErrorCallback = (error: Error, resourceName: string) => void;

// 缓存管理器
class ResourceCache {
  private cache = new Map<string, boolean>();
  private imageCache = new Map<string, HTMLImageElement>();

  /**
   * 检查资源是否已缓存
   */
  has(url: string): boolean {
    return this.cache.has(url);
  }

  /**
   * 标记资源为已缓存
   */
  set(url: string): void {
    this.cache.set(url, true);
  }

  /**
   * 获取缓存的图片
   */
  getImage(url: string): HTMLImageElement | undefined {
    return this.imageCache.get(url);
  }

  /**
   * 缓存图片
   */
  setImage(url: string, img: HTMLImageElement): void {
    this.imageCache.set(url, img);
    this.set(url);
  }

  /**
   * 清空缓存
   */
  clear(): void {
    this.cache.clear();
    this.imageCache.clear();
  }
}

class ResourceLoader {
  private resources: ResourceItem[] = [];
  private loadedCount = 0;
  private totalCount = 0;
  private onProgress?: ProgressCallback;
  private onComplete?: CompleteCallback;
  private onError?: ErrorCallback;
  private cache = new ResourceCache();
  private isLoading = false;
  private hasLoaded = false; // 标记是否已经加载过

  // 默认资源列表 - 从 cdn.ts 的预加载清单构建（critical 分组优先加载）
  private defaultResources: ResourceItem[] = [
    ...CDN_PRELOAD_CRITICAL,
    ...CDN_PRELOAD_SECONDARY,
  ].map((url): ResourceItem => ({
    name: decodeURIComponent(url.split('/').pop() || url),
    type: url.endsWith('.ttf') || url.endsWith('.otf') ? 'font' : 'image',
    url,
    critical: CDN_PRELOAD_CRITICAL.includes(url),
  }));

  constructor() {
    this.resources = [...this.defaultResources];
  }

  /**
   * 检查是否已经加载完成
   */
  hasCompleted(): boolean {
    return this.hasLoaded;
  }

  /**
   * 添加资源到加载列表
   */
  addResource(resource: ResourceItem): void {
    this.resources.push(resource);
  }

  /**
   * 添加多个资源
   */
  addResources(resources: ResourceItem[]): void {
    this.resources.push(...resources);
  }

  /**
   * 设置进度回调
   */
  setOnProgress(callback: ProgressCallback): void {
    this.onProgress = callback;
  }

  /**
   * 设置完成回调
   */
  setOnComplete(callback: CompleteCallback): void {
    this.onComplete = callback;
  }

  /**
   * 设置错误回调
   */
  setOnError(callback: ErrorCallback): void {
    this.onError = callback;
  }

  /**
   * 加载单个字体
   */
  private loadFont(resource: ResourceItem): Promise<void> {
    return new Promise((resolve) => {
      // 检查缓存
      if (this.cache.has(resource.url)) {
        resolve();
        return;
      }

      const fontFace = new FontFace('PixelFont', `url(${resource.url})`);

      const timer = setTimeout(() => {
        console.warn(`字体加载超时: ${resource.name}`);
        resolve();
      }, RESOURCE_TIMEOUT);

      fontFace
        .load()
        .then((loadedFace) => {
          document.fonts.add(loadedFace);
          this.cache.set(resource.url);
          clearTimeout(timer);
          resolve();
        })
        .catch((error) => {
          console.warn(`字体加载失败: ${resource.name}`, error);
          // 字体加载失败不阻断应用，继续执行
          clearTimeout(timer);
          resolve();
        });
    });
  }

  /**
   * 加载单个图片
   */
  private loadImage(resource: ResourceItem): Promise<void> {
    return new Promise((resolve) => {
      // 检查缓存
      if (this.cache.has(resource.url)) {
        resolve();
        return;
      }

      const img = new Image();

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve();
      };

      const timer = setTimeout(() => {
        console.warn(`图片加载超时: ${resource.url}`);
        finish();
      }, RESOURCE_TIMEOUT);

      img.onload = () => {
        this.cache.setImage(resource.url, img);
        finish();
      };

      img.onerror = () => {
        const error = new Error(`图片加载失败: ${resource.url}`);
        this.onError?.(error, resource.name);
        finish();
      };

      img.src = resource.url;
    });
  }

  /**
   * 更新进度
   */
  private updateProgress(resourceName: string): void {
    this.loadedCount++;
    const percentage = Math.round((this.loadedCount / this.totalCount) * 100);

    if (this.onProgress) {
      this.onProgress({
        loaded: this.loadedCount,
        total: this.totalCount,
        percentage,
        currentResource: resourceName,
      });
    }
  }

  /**
   * 开始加载所有资源
   * 如果已经加载过，直接触发完成回调
   */
  async load(): Promise<void> {
    // 如果已经加载完成，直接返回
    if (this.hasLoaded) {
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // 如果正在加载中，等待完成
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.loadedCount = 0;
    this.totalCount = this.resources.length;

    if (this.totalCount === 0) {
      this.hasLoaded = true;
      this.isLoading = false;
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    // 初始化进度
    if (this.onProgress) {
      this.onProgress({
        loaded: 0,
        total: this.totalCount,
        percentage: 0,
        currentResource: '准备加载...',
      });
    }

    // 分两波加载：critical 决定进入应用的临界路径，先完成；
    // secondary 紧随其后，进入对应页面时图片已在 HTTP 缓存中
    const criticalResources = this.resources.filter(r => r.critical);
    const secondaryResources = this.resources.filter(r => !r.critical);

    const loadOne = async (resource: ResourceItem) => {
      try {
        switch (resource.type) {
          case 'font':
            await this.loadFont(resource);
            break;
          case 'image':
            await this.loadImage(resource);
            break;
          default:
            // 其他类型资源，直接标记为完成
            break;
        }
        this.updateProgress(resource.name);
      } catch (error) {
        console.error(`资源加载失败: ${resource.name}`, error);
        this.updateProgress(resource.name);
      }
    };

    await Promise.all(criticalResources.map(loadOne));
    await Promise.all(secondaryResources.map(loadOne));

    // 所有资源加载完成
    this.hasLoaded = true;
    this.isLoading = false;

    if (this.onComplete) {
      this.onComplete();
    }
  }

  /**
   * 清除所有回调
   * 用于组件卸载时解绑，避免卸载后回调触发 setState
   * 注意：不重置已加载缓存与 hasLoaded，保证再次进入时无需重复加载
   */
  clearCallbacks(): void {
    this.onProgress = undefined;
    this.onComplete = undefined;
    this.onError = undefined;
  }

  /**
   * 重置加载器
   */
  reset(): void {
    this.resources = [...this.defaultResources];
    this.loadedCount = 0;
    this.totalCount = 0;
    this.isLoading = false;
    // 注意：不清空 hasLoaded，避免重复加载
  }

  /**
   * 完全重置（包括缓存）
   */
  fullReset(): void {
    this.reset();
    this.hasLoaded = false;
    this.cache.clear();
  }

  /**
   * 获取资源列表
   */
  getResources(): ResourceItem[] {
    return [...this.resources];
  }

  /**
   * 获取缓存的图片
   */
  getCachedImage(url: string): HTMLImageElement | undefined {
    return this.cache.getImage(url);
  }
}

// 导出单例实例
export const resourceLoader = new ResourceLoader();

// 导出全局资源加载状态（用于组件间共享状态）
export const ResourceLoadingState = {
  isLoading: true,
  progress: 0,
  currentResource: '',
};
