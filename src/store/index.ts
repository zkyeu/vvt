/*
 * @Author: your name
 * @Date: 2021-07-28 19:58:29
 * @LastEditTime: 2021-08-13 15:38:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/store/index.ts
 */
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number,
  userName: string,
  noChangeValue: string,
  leftNav: Array<any>,
  nav: Array<any>,
  type: Array<any>
}

const defaultState = {
  count: 9,
  userName: '123',
  noChangeValue: '我不变化',
  leftNav: [
    { 
      id: 1,
      icon: 'el-icon-location',
      title: '菜单一',
      child: [
        {
          id: 2,
          title: 'create',
          router: 'create',
        },
        {
          id: 3,
          title: '22222',
          router: 'b',
        },
        {
          id: 4,
          title: '33333',
          router: 'c',
        }
      ]
    },
    {
      id: 5,
      title: '菜单2',
      router: 'bc/d',
      icon: 'el-icon-menu',
    },
    {
      id: 6,
      title: '菜单3',
      router: 'bc/e',
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
  ]
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return defaultState;
  },
  mutations: {
    addcount(state) {
      state.count++;
    },
    changename(state) {
      state.userName = 'liliang';
    }
  },
  actions: {

  },
  getters: {
    
  }
})