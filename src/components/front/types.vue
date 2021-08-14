<template>
  <section class="item">
      <div v-for="item in type" :key="item.id" @click="changeRoute(item.router)">{{item.title}}</div>
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
      const type = computed(() => store.state.type);
      const changeRoute = (v: string) => {
        activeRouter.value = v;
        router.push(v);
        // console.log(router.currentRoute.value.path);
      };
      const activeRouter = ref('');
      onMounted(() => {

      });


      return {
        type,
        activeRouter,
        changeRoute
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
