<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:05
 * @LastEditTime: 2022-03-10 18:59:17
 * @LastEditors: Please set LastEditors
 * @Description: 后台首页
 * @FilePath: /vvt/src/views/home.vue
-->
<template>
  <section class="main-content">
    <Header />
    <div class="content-layer">
      <LeftNav />
      <router-view class="main-content-right" />
    </div>
  </section>
</template>

<script lang="ts">
  import LeftNav from '@/components/admin/left-nav.vue';
  import Header from '@/components/admin/header.vue';
  export default {
    components: { Header, LeftNav },
  };
</script>

<style lang="less" scoped>
  .main-content {
    background: #fff;

    .content-layer {
      display: flex;
      flex-direction: row;

      .main-content-right {
        background: #fff;
        margin: 10px 10px 2px;
        width: 100%;
        min-width: 600px;
        height: calc(100vh - 62px);
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 3px;
        }
        &::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 2px;
        }
      }
    }
  }
</style>
