<!--
 * @Author: your name
 * @Date: 2021-07-28 15:51:41
 * @LastEditTime: 2021-08-02 20:46:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/App.vue
-->
<template>
  <!-- <img src="./assets/logo.png" />
  <HelloWorld msg="Hello" /> -->
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  // import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  // import HelloWorld from './components/HelloWorld.vue';
  // import About from './components/About.vue';

  export default defineComponent({
    name: 'App',
    // components: {
    //   HelloWorld,
    //   About,
    // },
  });
</script>

<style lang="less">
  @import url('../src/assets/style/init.less');
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // margin-top: 60px;
  }
</style>
