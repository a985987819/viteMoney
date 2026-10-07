/**
 * 资源加载管理器
 * 集中管理所有静态资源的预加载，包括字体、图片等
 * 支持缓存机制，避免重复加载
 */

import { CDN_BASE_URL } from '../constants/cdn';

// 单个资源加载超时时间：超时后放行，避免网络挂起导致应用永远无法进入
const RESOURCE_TIMEOUT = 8000;

export interface ResourceItem {
  name: string;
  type: 'font' | 'image' | 'other';
  url: string;
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

  // 默认资源列表 - 使用CDN
  private defaultResources: ResourceItem[] = [
    // 字体
    {
      name: 'mainFont',
      type: 'font',
      url: `${CDN_BASE_URL}/fonts/Cubic_11.ttf`,
    },
    // 加载页背景
    {
      name: 'loadingBg',
      type: 'image',
      url: `${CDN_BASE_URL}/loadingBg.png`,
    },
    // UI 背景图
    {
      name: 'dialogBg',
      type: 'image',
      url: `${CDN_BASE_URL}/dialogBg.png`,
    },
    // 按钮背景
    {
      name: 'shortBtn',
      type: 'image',
      url: `${CDN_BASE_URL}/shortBtn.png`,
    },
    {
      name: 'midBtn',
      type: 'image',
      url: `${CDN_BASE_URL}/midBtn.png`,
    },
    // 角色/头像图片
    {
      name: 'fallInFaint',
      type: 'image',
      url: `${CDN_BASE_URL}/fall in faint.png`,
    },
    {
      name: 'profile',
      type: 'image',
      url: `${CDN_BASE_URL}/profile.png`,
    },
    {
      name: 'hero',
      type: 'image',
      url: `${CDN_BASE_URL}/hero.png`,
    },
    // 导航图标
    {
      name: 'bill',
      type: 'image',
      url: `${CDN_BASE_URL}/bill.png`,
    },
    {
      name: 'report',
      type: 'image',
      url: `${CDN_BASE_URL}/report.png`,
    },
    {
      name: 'stardewvalley',
      type: 'image',
      url: `${CDN_BASE_URL}/stardewvalley.png`,
    },
    {
      name: 'icon',
      type: 'image',
      url: `${CDN_BASE_URL}/icon.png`,
    },
    // 冬季主题背景与装饰
    {
      name: 'winterBg',
      type: 'image',
      url: `${CDN_BASE_URL}/winterBg.png`,
    },
    {
      name: 'snowTop',
      type: 'image',
      url: `${CDN_BASE_URL}/snowTop.png`,
    },
    {
      name: 'mineBtnBg',
      type: 'image',
      url: `${CDN_BASE_URL}/mineBtnBg.png`,
    },
    // 首页背景与预算卡片背景
    {
      name: 'homeBottom',
      type: 'image',
      url: `${CDN_BASE_URL}/home-bottom.png`,
    },
    {
      name: 'budgetBg',
      type: 'image',
      url: `${CDN_BASE_URL}/budgetBg.png`,
    },
    // 其他界面装饰
    {
      name: 'chicken',
      type: 'image',
      url: `${CDN_BASE_URL}/chicken.png`,
    },
    {
      name: 'closeBtn',
      type: 'image',
      url: `${CDN_BASE_URL}/closeBtn.png`,
    },
    {
      name: 'backTop',
      type: 'image',
      url: `${CDN_BASE_URL}/backTop.png`,
    },
  ];

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

    // 并行加载所有资源
    const loadPromises = this.resources.map(async (resource) => {
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
    });

    await Promise.all(loadPromises);

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
