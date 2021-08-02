<!--
 * @Author: your name
 * @Date: 2021-07-28 20:55:14
 * @LastEditTime: 2021-07-28 21:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/About.vue
-->
<template>
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
  // 组件引用部分========
  import { defineComponent } from 'vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'About',
    data() {
      return {
        msg: '心内容',
      };
    },
    setup() {},
  });
</script>

<style scoped></style>
