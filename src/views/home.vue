<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:05
 * @LastEditTime: 2021-08-03 17:16:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/UserSettings.vue
-->
<template>
  <section class="main-content">
    <Header />
    <div class="content-layer">
      <LeftNav />
      <router-view class="content-right" />
    </div>
    <!-- <Footer />
    <router-view name="helper" /> -->
  </section>
</template>

<script lang="ts">
  import LeftNav from '@/components/BaseLayer/left-nav.vue';
  import Header from '@/components/BaseLayer/header.vue';
  import Footer from '@/components/BaseLayer/footer.vue';
  export default {
    components: { Header, LeftNav, Footer },
  };
</script>

<style lang="less" scoped>
  .main-content {
    background: #ececf2;

    .content-layer {
      display: flex;
      flex-direction: row;
      .content-right {
        background: #fff;
        margin: 16px 16px 0;
        width: 100%;
        min-width: 600px;
        box-shadow: 0 0 5px #dedede;
      }
    }
  }
</style>
