/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-08-03 07:49:03
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
const app = createApp(App)
app.use(store, key)
app.use(router)
app.use(ElementUI)

app.mount('#app')
