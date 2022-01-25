/*
 * @Author: your name
 * @Date: 2021-07-28 19:58:29
 * @LastEditTime: 2022-01-24 13:45:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/store/index.ts
 */
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import $http from '../api';
// import mutations from './mutations';
// import actions from './actions';
// import getters from './getters';

export interface State {
  count: number,
  noChangeValue: string,
  leftNav: Array<any>,
  nav: Array<any>,
  type: Array<any>,
  types: Array<any>,
  articleConfig: Array<any>,
  adminConfig: Array<any>,
  powerConfig: Array<any>,
}

const defaultState = {
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
      router: '/admin/powers',
      icon: 'el-icon-setting',
    }
  ],
  nav: [
    // {
    //   id: 1,
    //   title: '首页',
    //   router: '/',
    // },
    // {
    //   id:2,
    //   title: '文章',
    //   router: 'b',
    // },
    // {
    //   id: 3,
    //   title: '学习积累',
    //   router: 'c',
    // },
    // {
    //   id: 4,
    //   title: '胡思乱想',
    //   router: 'd',
    // },
    // {
    //   id: 5,
    //   title: 'wechat',
    //   router: 'wechat',
    // },
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
    }
  ],
  powerConfig: [
    {
      id: 1,
      value: 'roles',
      label: '角色管理',
      router: 'roles',
    },
    {
      id: 3,
      value: 'persons',
      label: '人员管理',
      router: 'persons',
    }
  ],
  types: []
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
    setTypes(state, data: any) {
      state.types = data;
    }
  },
  actions: {
    getTypes({ commit }) {
      $http.getdiytypes().then((res: any) => {
        commit('setTypes', res.data);
      });
    }
  },
  getters: {
    theType: (state) => {
      return state.types;
    }
  }
})