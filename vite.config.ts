/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-08-16 12:29:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

const proxy = {
  target: 'http://localhost:3000/'
  // target: 'http://192.168.0.101:3000/'
}
export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
    views: path.resolve(__dirname, './src/views'),
    '@com': path.resolve(__dirname, "./src/components"),
    utils: path.resolve(__dirname, './src/utils'),
    less: path.resolve(__dirname, "./src/less"),
    assets: path.resolve(__dirname, "./src/assets"),
    store: path.resolve(__dirname, "./src/store"),
    mixins: path.resolve(__dirname, "./src/mixins"),
    router: path.resolve(__dirname, './src/router')
  },
  server: {
    // hostname: '0.0.0.0',
    // hmr: { overlay: false },
    host: "localhost",
    port: 3001,
    // // 是否自动在浏览器打开
    open: true,
    // // 是否开启 https
    // https: false,
    // // 服务端渲染
    // ssr: false,
    cors: true,
    proxy: {
      '/get': {
        target: proxy.target,
        changeOrigin: true,
        followRedirects: true
      }
    },
  },
})
