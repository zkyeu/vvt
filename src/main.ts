/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2022-02-11 13:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/main.ts
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import App from './App.vue'
import { store, key } from './store'
import router from "./router";
import http from './api';
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon';
import '@yzfe/svgicon/lib/svgicon.css';
import 'quill/dist/quill.snow.css'

const app = createApp(App)
app.config.globalProperties.$http = http;
app.use(store, key)
.use(router)
.use(ElementPlus, { locale: zhCn })
.use(VueSvgIconPlugin, {
  tagName: 'icon'
})
.mount('#app')
