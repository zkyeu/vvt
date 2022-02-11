<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:38
 * @LastEditTime: 2022-01-24 13:46:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/baseLayer/left-nav.vue
-->
<template>
  <section class="navs" v-if="navData.length">
    <span
      v-for="item in navData"
      :key="item.id"
      @click="therouter(item.router)"
      :class="{ active: activeRouter === item.router }"
    >
      {{ item.title }}</span
    >
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, onMounted, getCurrentInstance, watch } from 'vue';
  import { useStore } from 'vuex';
  import router from '../../router';
  import { key } from '../../store';

  export default defineComponent({
    name: 'Nav',
    setup: () => {
      const store = useStore(key);
      const navData = computed(() => store.state.nav);
      const therouter = (v: string) => {
        activeRouter.value = v;
        router.push(v);
        // console.log(router.currentRoute.value.path);
      };
      const activeRouter = ref('');
      // const routers = Router;
      onMounted(() => {
        // console.log(leftNavData.value);
        // const { proxy }: any = getCurrentInstance();
        // console.log(proxy.$router.currentRoute.value);
        // console.log(router.currentRoute.value);
        // console.log(Proxy);
        // console.log(router.currentRoute.value.path);     1
      });
      // watch(activeRouter, (n, o) => {
      //   console.log('new==>', n);
      //   console.log('old-->', o);
      // });

      return {
        navData,
        therouter,
        activeRouter,
      };
    },
  });
</script>

<style lang="less" scoped>
  .navs {
    display: flex;
    width: 400px;
    // background: #ddd;
    span {
      display: inline-block;
      padding: 8px 16px;
      text-align: center;
      cursor: pointer;
      border-bottom: solid 2px transparent;
      &:hover {
        animation-name: bottomborder;
        animation-duration: 1s;
        color: rgb(58, 86, 243);
      }
      &.active {
        border-bottom: solid 2px rgb(58, 86, 243);
      }
    }
  }
  @keyframes bottomborder {
    from {
      border-bottom: transparent solid 2px;
    }
    to {
      border-bottom: rgb(58, 86, 243) solid 2px;
    }
  }
</style>
