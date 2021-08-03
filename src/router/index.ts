/*
 * @Author: your name
 * @Date: 2021-07-28 20:43:45
 * @LastEditTime: 2021-08-03 14:33:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Home from '@/views/Home.vue';
// import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
  path: '/',
  component: () => import('@/views/home.vue'),
  children: [
    {
      path: '/',
      component:  () => import('@/views/a.vue'),
    },
    {
      path: 'profile',
      component: () => import('@/views/b.vue'),
    },
    {
      path: 'set',
      component: () => import('@/views/c.vue'),
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