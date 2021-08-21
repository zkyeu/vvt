<!--
 * @Author: your name
 * @Date: 2021-08-12 11:33:22
 * @LastEditTime: 2021-08-21 16:29:29
 * @LastEditors: Please set LastEditors
 * @Description: 前台首页
 * @FilePath: /vvt/src/views/index.vue
-->

<template>
  <section class="main-content">
    <Header />
    <div class="content-layer">
      <router-view class="content-body" />
    </div>
    <!-- <Footer /> -->
  </section>
</template>

<script lang="ts">
  import Header from '@/components/front/header.vue';
  import Footer from '@/components/front/footer.vue';
  import { defineComponent } from 'vue';
  import { mapActions } from 'vuex';
  export default defineComponent({
    components: { Header, Footer },
    methods: {
      ...mapActions(['getTypes']),
    },
    created() {
      const route = this.$route;
      console.log(route);
      this.getTypes();
    },
  });
</script>

<style lang="less" scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    // background: #ececf2;

    .content-layer {
      display: flex;
      justify-content: center;
      flex-direction: row;
      .content-body {
        margin: 16px 16px 0;
        width: 100%;
        min-width: 1000px;
        max-width: 1200px;
      }
    }
  }
</style>
