<!--
 * @Author: your name
 * @Date: 2021-08-02 20:47:46
 * @LastEditTime: 2021-08-27 19:24:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/header.vue
-->
<template>
  <header class="layer-header">
    <div class="logo" @click="home"><img src="../../assets/logo.png" /></div>
    <Nav />
    <div class="user-center">user center2</div>
  </header>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, onMounted, getCurrentInstance } from 'vue';
  import Nav from '@/components/front/nav.vue';
  import router from '../../router';
  export default defineComponent({
    name: 'header',
    components: { Nav },
    setup: () => {
      const home = () => {
        router.push('/');
      };

      return {
        home,
        Nav,
      };
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    width: 90px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
  }
  .layer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 5px #eee;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .user-center {
    width: 34px;
    height: 34px;
    border-radius: 20px;
    border: #ddd solid 1px;
    overflow: hidden;
    cursor: pointer;
  }
</style>
