<!--
 * @Author: your name
 * @Date: 2021-08-12 11:33:22
 * @LastEditTime: 2022-01-20 14:30:30
 * @LastEditors: Please set LastEditors
 * @Description: 前台首页
 * @FilePath: /vvt/src/views/index.vue
-->

<template>
  <section class="main-content">
    <Headers />
    <div class="content-layer">
      <router-view class="content-body" />
    </div>
    <!-- <Footer /> -->
  </section>
</template>

<script lang="ts">
  import Headers from '@/components/front/header.vue';
  import Footer from '@/components/front/footer.vue';
  import { defineComponent } from 'vue';
  import { mapActions } from 'vuex';
  export default defineComponent({
    components: { Headers, Footer },
    methods: {
      // ...mapActions(['getTypes']),
    },
    created() {
      const route = this.$route;
      // console.log(route);
      // this.getTypes();
      // console.log('1111111');
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
        // width: 100%;
        // min-width: 800px;
        // max-width: 1200px;
      }
    }
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
