<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-21 04:11:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/frontend/article/content.vue
-->
<template>
  <section class="item-detail">
    <div class="title">{{ articleData.title }}</div>
    <div class="author-info">
      <span class="name">{{ articleData.author }}</span>
      <span
        >发表于<i class="date">{{ articleData.createtime }}</i></span
      >
    </div>
    <div v-html="articleData.body"></div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig } from '../../../utils/util';
  import router from '../../../router';

  export default defineComponent({
    name: 'Content',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const articleData: any = ref([]);

      const getArticle = (id: any) => {
        $http
          .getarticle({ id: id })
          .then((res: any) => {
            if (res.errNo === 0) {
              articleData.value = res.data;
            }
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
