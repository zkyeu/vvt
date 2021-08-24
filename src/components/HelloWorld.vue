<!--
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-07-28 20:42:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/HelloWorld.vue
-->
<template>
  <h1>{{ msg }}</h1>

  <button type="button" @click="addCount">count is: {{ count }}</button>
  <div>{{ noChangeValue }}</div>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../store';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true,
      },
    },
    setup: () => {
      // const count = ref(0);
      // return { count };
      const store = useStore(key);
      const count = computed(() => store.state.count);
      const noChangeValue = computed(() => store.state.noChangeValue);

      const addCount = (): void => {
        store.commit('addcount');
      };

      const changeName = (): void => {
        store.commit('changename');
      };

      // 挂载时候打印X默认数据========
      onMounted(() => {
        console.log(count.value);
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        count,
        noChangeValue,
        addCount,
        changeName,
      };
    },
  });
</script>

<style scoped></style>
