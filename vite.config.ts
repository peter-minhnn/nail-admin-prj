import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import vercel from 'vite-plugin-vercel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), vercel()],
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
    sourcemap: false, // 소스맵 생성 비활성화
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
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://dejavu.api.langgao.net',
        changeOrigin: true,
        secure: false,
        cookiePathRewrite: {
          '*': '/',
        },
        cookieDomainRewrite: {
          '*': 'dejavu.api.langgao.net',
        },
      },
    },
  },
  envDir: './env',
})
