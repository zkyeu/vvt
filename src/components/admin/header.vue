<!--
 * @Author: your name
 * @Date: 2021-08-02 20:47:46
 * @LastEditTime: 2022-03-10 18:41:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/header.vue
-->
<template>
  <header class="layer-header">
    <div @click="handleClick('home')">logo</div>
    <div>user center</div>
  </header>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import router from '../../router/index';

  const route = useRoute();

  const handleClick = (v: string) => {
    if (v === 'home') {
      router.push('/admin/');
    }
  };
  // onMounted(() => {});
</script>

<style lang="less" scoped>
  @import url('../src/assets/style/init.less');
  .layer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background-color: @root-color-a;
    // box-shadow: 0 1px 5px #ccc;
    position: sticky;
    top: 0;
    color: #fff;
    z-index: 999;
  }
</style>
