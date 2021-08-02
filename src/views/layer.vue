<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:05
 * @LastEditTime: 2021-08-02 20:57:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/UserSettings.vue
-->
<template>
  <section class="main-content">
    <Header />
    <div class="content-layer">
      <LeftNav />
      <router-view />
    </div>

    <router-view name="helper" />
  </section>
</template>

<script lang="ts">
  import LeftNav from '../components/BaseLayer/left-nav.vue';
  import Header from '../components/BaseLayer/header.vue';
  export default {
    components: { Header, LeftNav },
  };
</script>

<style lang="less" scoped>
  .main-content {
    background: #dfdfdf;

    .content-layer {
      display: flex;
      flex-direction: row;
    }
  }
</style>
