<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-01-24 23:44:45
 * @LastEditors: Please set LastEditors
 * @Description: 因为分类不经常变化，所以在页面加载时候加载一次就可以了,注释部分是用之前方式处理
 * @FilePath: /vvt/src/components/front/types.vue
-->
<template>
  <section class="item">
    <h5>分类</h5>
    <div v-for="item in types" :key="item.id" @click="changeRoute(item.id)">{{
      item.typename
    }}</div>
    <!-- {{ theType }} -->
  </section>
</template>

<script lang="ts">
  import { log } from 'console';
  import { ref, defineComponent, computed, onMounted, watch, reactive } from 'vue';
  import { useStore, mapActions, mapGetters } from 'vuex';
  import { useRouter, useRoute } from 'vue-router';
  import router from '../../router';
  import { key } from '../../store';

  export default defineComponent({
    name: 'Types',
    // methods: {
    //   ...mapActions(['getTypes']),
    // },
    // computed: {
    //   ...mapGetters(['theType']),
    // },
    // created() {
    //   // 判断是否有了分类，有了就不在加载

    //   // if (true) {
    //     // this.getTypes();
    //   // }
    // },
    setup: () => {
      const store = useStore(key);
      const types = computed(() => store.state.types);
      const activeRouter = ref('');

      const changeRoute = (v: string) => {
        // console.log(v);
        activeRouter.value = v;
        router.push({
          path: 't',
          query: {
            i: v,
          },
        });
      };

      onMounted(() => {
        // 调用action中getTypes
        if (JSON.stringify(types.value) === '[]') {
          store.dispatch('getTypes');
        }
        // console.log(useRoute().query);
      });

      return {
        types,
        changeRoute,
        activeRouter,
      };
    },
  });
</script>

<style lang="less" scoped>
  .item {
    padding-bottom: 10px;
    h5 {
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      // background: #f1f1f1;
      border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
    }
    div {
      margin: 0 5px;
      height: 40px;
      line-height: 40px;
      // background: #f8f8f8;
      padding-left: 20px;
      &:hover {
        // background: #e8f3ff;
        background: #f5f5f5;
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
