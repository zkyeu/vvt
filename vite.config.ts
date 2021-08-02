/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-07-28 19:04:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vvt/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, './src'),
    views: path.resolve(__dirname, './src/views'),
    components: path.resolve(__dirname, './src/components'),
    utils: path.resolve(__dirname, './src/utils'),
    less: path.resolve(__dirname, "./src/less"),
    assets: path.resolve(__dirname, "./src/assets"),
    com: path.resolve(__dirname, "./src/components"),
    store: path.resolve(__dirname, "./src/store"),
    mixins: path.resolve(__dirname, "./src/mixins")
  },
  server: {
    // hostname: '0.0.0.0',
    host: "localhost",
    port: 3001,
    // // 是否自动在浏览器打开
    // open: true,
    // // 是否开启 https
    // https: false,
    // // 服务端渲染
    // ssr: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3333/',
        changeOrigin: true,
        ws: true,
        rewrite: (pathStr) => pathStr.replace('/api', '')
      },
    },
  },
})
