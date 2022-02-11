<!--
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2022-02-11 13:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/App.vue
-->
<template>
  <!-- <img src="./assets/logo.png" /> -->
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
  });
</script>

<style lang="less">
  @import url('../src/assets/style/init.less');
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
</style>
