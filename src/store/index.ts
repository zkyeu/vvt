/*
 * @Author: your name
 * @Date: 2021-07-28 19:58:29
 * @LastEditTime: 2021-07-28 20:36:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/store/index.ts
 */
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  count: number,
  userName: string,
  noChangeValue: string
}

const defaultState = {
  count: 9,
  userName: '123',
  noChangeValue: '我不变化'
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