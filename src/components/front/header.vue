<!--
 * @Author: your name
 * @Date: 2021-08-02 20:47:46
 * @LastEditTime: 2022-01-20 14:34:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/header.vue
-->
<template>
  <div class="layer-header">
    <div class="content-body">
      <div class="logo" @click="home"><img src="../../assets/logo.png" /></div>
      <Nav />
      <div class="user-center">user center2</div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Nav from '@/components/front/nav.vue';
  import router from '../../router';
  export default defineComponent({
    name: 'headers',
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
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 40px;
    }
  }
  .layer-header {
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
  .content-body {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (min-width: 1201px) {
    .content-body {
      width: 1200px;
    }
  }
  @media screen and (max-width: 1200px) {
    .content-body {
      width: 800px;
    }
  }
  /* 设置了涉猎器宽度不大于1200px时 abc 显示900px宽度 */

  @media screen and (max-width: 800px) {
    .content-body {
      width: 700px;
    }
  }
</style>
