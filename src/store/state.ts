/*
 * @Author: your name
 * @Date: 2021-08-21 11:04:41
 * @LastEditTime: 2021-08-21 11:10:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/store/state.ts
 */
import { State } from './types';
const state: State = {
  count: 9,
  noChangeValue: '我不变化',
  leftNav: [
    {
      id: 5,
      title: '文章管理',
      router: '/admin/article',
      icon: 'el-icon-menu',
    },
    {
      id: 6,
      title: '基础配置',
      router: '/admin/diy',
      icon: 'el-icon-setting',
    },
    {
      id: 7,
      title: '权限管理',
      router: '/admin/power',
      icon: 'el-icon-setting',
    }
  ],
  nav: [
    {
      id: 1,
      title: '首页',
      router: '/',
    },
    {
      id:2,
      title: '文章',
      router: 'b',
    },
    {
      id: 3,
      title: '学习积累',
      router: 'c',
    },
    {
      id: 4,
      title: '胡思乱想',
      router: 'd',
    },
    {
      id: 5,
      title: 'tool',
      router: 'e',
    },
  ],
  type: [
    {
      id: 1,
      title: 'HTML',
      router: 'html',
    },
    {
      id:2,
      title: 'CSS',
      router: 'css',
    },
    {
      id: 3,
      title: 'JS',
      router: 'js',
    }
  ],
  articleConfig: [
    {
      id: 1,
      value: 'add',
      label: '添加文章',
      router: 'add',
    },
    {
      id: 2,
      value: 'delete',
      label: '删除文章',
      router: 'add',
    },
    {
      id: 3,
      value: 'move',
      label: '移动文章',
      router: 'move',
    }
  ],
  adminConfig: [
    {
      id: 1,
      value: 'basic',
      label: '网站基础设置',
      router: 'basic',
    },
    {
      id: 1,
      value: 'type',
      label: '分类处理',
      router: 'type',
    },
    {
      id: 2,
      value: 'tag',
      label: '标签管理',
      router: 'tag',
    },
    {
      id: 3,
      value: 'roles',
      label: '角色管理',
      router: 'roles',
    },
    {
      id: 3,
      value: 'powers',
      label: '权限管理',
      router: 'powers',
    },
    {
      id: 3,
      value: 'persons',
      label: '人员管理',
      router: 'persons',
    }
  ]
};
export default state;