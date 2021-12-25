/*
 * @Author: your name
 * @Date: 2021-07-28 20:43:45
 * @LastEditTime: 2021-12-25 22:24:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from '@/views/Home.vue';
import index from '@/views/index.vue';

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
      path: 'notice',
      component: () => import('@/views/frontend/notice.vue'),
    },
    {
      path: 'wechat',
      component: () => import('@/views/frontend/wechat/wechat-login.vue'),
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
      path: '/admin', // 后台首页
      component:  () => import('@/views/admin/article/index.vue')
    },
    { // 文章管理
      path: 'article',
      component:  () => import('@/views/admin/article/article.vue'),
      children: [
        {
          path: '/admin/article',
          component:  () => import('@/views/admin/article/list.vue')
        },
        {
          path: '/admin/article/add',
          component:  () => import('@/views/admin/article/add.vue')
        },
        {
          path: '/admin/article/edit',
          component:  () => import('@/views/admin/b.vue')
        }
      ]
    },
    { // 基础配置
      path: 'diy',
      component:  () => import('@/views/admin/diy/index.vue'),
      children: [
        {
          path: '/admin/diy',
          component:  () => import('@/views/admin/diy/views.vue')
        },
        {
          path: '/admin/diy/basic',
          component:  () => import('@/views/admin/diy/basic.vue')
        },
        {
          path: '/admin/diy/type',
          component:  () => import('@/views/admin/diy/type.vue')
        },
        {
          path: '/admin/diy/tag',
          component:  () => import('@/views/admin/diy/tag.vue')
        },
        // {
        //   path: '/admin/diy/roles',
        //   component:  () => import('@/views/admin/diy/roles.vue')
        // },
        // {
        //   path: '/admin/diy/powers',
        //   component:  () => import('@/views/admin/diy/powers.vue')
        // },
        // {
        //   path: '/admin/diy/persons',
        //   component:  () => import('@/views/admin/diy/persons.vue')
        // }
        
      ]
    },
    { // 权限配置
      path: 'powers',
      component:  () => import('@/views/admin/roles/index.vue'),
      children: [
        {
          path: '/admin/powers',
          component:  () => import('@/views/admin/roles/views.vue')
        },
        {
          path: '/admin/powers/roles',
          component:  () => import('@/views/admin/roles/roles.vue')
        },
        {
          path: '/admin/powers/persons',
          component:  () => import('@/views/admin/roles/persons.vue')
        }
        
      ]
    }
  ]
},
// {
//   path: '/admin/diy',
//   component:  () => import('@/views/admin/diy.vue')
// },
// {
//   path: '/admin/power',
//   component: () => import('@/views/admin/c.vue')
// }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;