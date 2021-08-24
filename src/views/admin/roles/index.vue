<!--
 * @Author: your name
 * @Date: 2021-08-18 08:38:23
 * @LastEditTime: 2021-08-24 10:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/config/index.vue
-->
<template>
  <section class="content">
    <div class="hanlde">
      <div>基础配置</div>
      <div>
        <router-link
          :to="'/admin/powers/' + item.router"
          v-for="item in itemButton"
          :key="item.router"
          >{{ item.label }}</router-link
        >
      </div>
    </div>
    <div>
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { defineComponent, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../../../store';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Config',
    setup: () => {
      const store = useStore(key);
      const itemButton = computed(() => store.state.powerConfig);
      const { $http, $confirm, $message } = useGlobalConfig();

      const handleOperate = (v: string, id: any) => {
        console.log(v, id);
      };
      onMounted(() => {});

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        itemButton,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: block;
    .hanlde {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f3f3f3;
      border-bottom: #ddd solid 1px;
      div:nth-child(1) {
        padding-left: 10px;
        font-weight: 700;
      }
      div:nth-child(2) {
        display: flex;
      }
      a {
        padding: 10px 15px;
        border-right: #ddd solid 1px;
        cursor: pointer;
        text-decoration: none;
        color: #555;
        &:hover {
          background: #3587f3;
          color: #fff;
        }
        &:last-child {
          border: none;
        }
      }
    }
    .hover {
      cursor: pointer;
      &:hover {
        color: rgb(46, 2, 244);
      }
    }
    .operate {
      padding-right: 15px;
    }
    .router-link-active {
      background: #3587f3;
      color: #fff !important;
    }
  }
</style>
