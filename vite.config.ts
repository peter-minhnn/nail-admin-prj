import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'
import mkcert from 'vite-plugin-mkcert'
import vitePluginSitemap from 'vite-plugin-sitemap'
import vercel from 'vite-plugin-vercel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    vercel(),
    mkcert(),
    visualizer(),
    vitePluginSitemap({
      hostname: 'https://dejavunailspa.net',
      exclude: ['/auth/*', '/admin/*', '/_error'],
      robots: [
        {
          userAgent: '*',
          disallow: ['/auth/*', '/admin/*'],
        },
      ],
      i18n: {
        languages: ['en', 'vi'],
        defaultLanguage: 'vi',
      },
      generateRobotsTxt: true,
      readable: true, // Makes the XML more readable
    }),
    compression({ algorithm: 'brotliCompress' }), // Use Brotli
    compression({ algorithm: 'gzip' }), // Use Gzip
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@images': path.resolve(__dirname, './public/images'),
      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://api.dejavunailspa.net',
        changeOrigin: true,
        secure: true, // Ignore SSL issues in dev
      },
    },
  },
  envDir: './env',
  css: {
    devSourcemap: false
  }
})
