/*
 * @Author: your name
 * @Date: 2021-07-28 20:43:45
 * @LastEditTime: 2021-08-12 20:47:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from '@/views/Home.vue';
import index from '@/views/index.vue';
// import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
  path: '/',
  component: index,
  children: [
    {
      path: '/',
      component:  () => import('@/views/frontend/default.vue'),
    },
    {
      path: 'a',
      component:  () => import('@/views/frontend/a.vue'),
    },
    {
      path: 'b',
      component: () => import('@/views/frontend/b.vue'),
    },
    {
      path: 'c',
      component: () => import('@/views/frontend/c.vue'),
    },
    {
      path: 'd',
      component: () => import('@/views/frontend/d.vue'),
    },
    {
      path: 'e',
      component: () => import('@/views/frontend/e.vue'),
    },
    {
      path: 'articledetail',
      component: () => import('@/views/frontend/article/article-detail.vue'),
    },
    
  ]
},
{
  path: '/admin',
  component: Home,
  children: [
    {
      path: '/admin',
      component:  () => import('@/views/backplat/index.vue')
    },
    {
      path: 'create',
      component:  () => import('@/views/frontend/a.vue'),
    },
    {
      path: 'b',
      component: () => import('@/views/frontend/b.vue'),
    },
    {
      path: 'c',
      component: () => import('@/views/frontend/c.vue'),
    },
    {
      path: 'd',
      component: () => import('@/views/frontend/d.vue'),
    },
    {
      path: 'e',
      component: () => import('@/views/frontend/e.vue'),
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