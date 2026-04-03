import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '星露账本',
        short_name: '星露账本',
        description: '一款像素风格的记账应用，灵感来自星露谷物语',
        theme_color: '#8B5A2B',
        background_color: '#f5e8c7',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        lang: 'zh-CN',
        icons: [
          {
            src: `${CDN_BASE_URL}/icons/icon-72x72.png`,
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-96x96.png`,
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-128x128.png`,
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-144x144.png`,
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-152x152.png`,
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-384x384.png`,
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: `${CDN_BASE_URL}/icons/icon-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/vercel-icons\.vercel\.app\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\/(api|auth)\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.83:9876',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 将 @ 映射到 /src 目录
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        // 代码分割策略 - 使用函数形式
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('antd')) {
              return 'vendor-ui';
            }
            if (id.includes('echarts')) {
              return 'vendor-charts';
            }
            if (id.includes('dayjs') || id.includes('axios')) {
              return 'vendor-utils';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            return 'vendor-others';
          }
        },
        // 资源文件命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          if (info.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (info.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (info.match(/\.(woff2?|ttf|otf|eot)$/)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // 启用源码映射（生产环境可关闭）
    sourcemap: false,
    // 压缩选项
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  }
})
