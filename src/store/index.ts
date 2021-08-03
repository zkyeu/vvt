/*
 * @Author: your name
 * @Date: 2021-07-28 19:58:29
 * @LastEditTime: 2021-08-03 14:34:48
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
  leftNav: Array<any>
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
          title: '111111',
          router: 'set',
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
      router: 'profile',
      icon: 'el-icon-menu',
    },
    {
      id: 6,
      title: '菜单3',
      router: '/',
      icon: 'el-icon-setting',
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