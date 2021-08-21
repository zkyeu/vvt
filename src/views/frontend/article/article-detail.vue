<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-21 04:09:53
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
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig } from '../../../utils/util';
  import router from '../../../router';
  import Content from './content.vue';
  import Types from '@com/front/types.vue';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types },
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const articleData = ref([]);

      const getArticle = (id: any) => {
        $http
          .getarticle({ id: id })
          .then((res: any) => {
            articleData.value = res;
            // console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      onMounted(() => {
        let id = router.currentRoute.value.query.id;
        if (id) {
          getArticle(id);
        }
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        articleData,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: flex;
    // justify-content: space-between;

    .content-left {
      min-width: 330px;
      margin-right: 30px;
      // background: #f5f5f5;
      // word-break: break-all;
      flex: 1;
      font-size: 14px;
      line-height: 26px;
    }

    .content-right {
      width: 300px;
      background: #f00;
    }
  }
</style>
