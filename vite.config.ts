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
        // target: 'http://10.11.56.245:51011/', // 测试
        // target: 'http://gis-server-1289574391.cn-northwest-1.elb.amazonaws.com.cn:9527/goldmap/', // 测试
        target: 'http://10.11.57.69:9527/goldmap/', // 测试
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
