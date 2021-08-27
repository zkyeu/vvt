<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-27 17:51:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/frontend/article/article-detail.vue
-->

<template>
  <section class="content">
    <div class="content-left">
      <Content />
    </div>
    <div class="content-right">
      <Types />
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Content from './content.vue';
  import Types from '@com/front/types.vue';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types },
  });
</script>

<style lang="less" scoped>
  .content {
    display: flex;
    // justify-content: space-between;

    .content-left {
      min-width: 330px;
      margin-right: 2rem;
      background: #fff;
      word-break: break-all;
      flex: 1;
      font-size: 14px;
      line-height: 26px;
      padding: 1rem 2rem;
    }

    .content-right {
      width: 300px;
      background: #fff;
    }
  }
</style>
