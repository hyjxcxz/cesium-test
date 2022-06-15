import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  base: process.env.NODE_ENV === 'true' ? './' : '/',
  plugins: [vue(), eslintPlugin()], // 注册插件
  server: {
    proxy: {
      '/api': {
        target: 'http://10.12.9.167:52006', // 测试
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      '@': path.resolve(__dirname, 'src'),
      comps: path.resolve(__dirname, 'src/components')
    }
  }
})
