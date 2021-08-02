/*
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-07-28 21:00:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from "./router";
const app = createApp(App)
app.use(store, key)
app.use(router)

app.mount('#app')
