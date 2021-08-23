<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-21 18:59:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/front/types.vue
-->
<template>
  <section class="item">
    <h5>分类</h5>
    <div v-for="item in types" :key="item.id" @click="changeRoute(item.aliasname)">{{
      item.typename
    }}</div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, onMounted, getCurrentInstance, watch } from 'vue';
  import { useStore } from 'vuex';
  import router from '../../router';
  import { key } from '../../store';

  export default defineComponent({
    name: 'LeftNav',
    setup: () => {
      const store = useStore(key);
      const types = computed(() => store.state.types);
      const changeRoute = (v: string) => {
        activeRouter.value = v;
        router.push(v);
        // console.log(router.currentRoute.value.path);
      };
      const activeRouter = ref('');
      onMounted(() => {});

      return {
        types,
        changeRoute,
      };
    },
  });
</script>

<style lang="less" scoped>
  .item {
    h5 {
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background: #f1f1f1;
    }
    div {
      height: 40px;
      line-height: 40px;
      background: #f8f8f8;
      padding-left: 20px;
      &:hover {
        background: #e8f3ff;
        cursor: pointer;
        text-shadow: 0 0 8px #777;
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
