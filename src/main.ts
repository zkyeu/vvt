/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-08-23 11:10:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/main.ts
 */
import { createApp } from 'vue'
import ElementUI from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import { store, key } from './store'
import router from "./router";
import http from './api';

// declare module '@vue/runtime-core' {
//   // eslint-disable-next-line no-unused-vars
//   interface ComponentCustomProperties {
//     $http: typeof http;
//   }
// }
const app = createApp(App)
app.config.globalProperties.$http = http;
app.use(store, key)
.use(router)
.use(ElementUI)
.mount('#app')
