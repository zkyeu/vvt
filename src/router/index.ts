/*
 * @Author: your name
 * @Date: 2021-07-28 20:43:45
 * @LastEditTime: 2021-08-02 20:34:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from '@/views/Home.vue';
import UserSettings from '../views/layer.vue'

const routes: Array<RouteRecordRaw> = [
  {
  path: '/',
  component: UserSettings,
  children: [
    {
      path: '/',
      component:  () => import('@/views/a.vue'),
    },
    {
      path: 'profile',
      components: {
        default:  () => import('@/views/b.vue'),
        helper:  () => import('@/views/c.vue'),
      },
    },
  ]
}];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;