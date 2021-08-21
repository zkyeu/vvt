<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-21 17:15:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/front/types.vue
-->
<template>
  <section class="item">
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
