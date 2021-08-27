<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2021-08-27 19:13:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/frontend/article/content.vue
-->
<template>
  <section class="item-detail">
    <div class="title">{{ articleData.title }}</div>
    <div class="author-info">
      <span class="name">{{ articleData.author }}姓名</span>
      <span
        >发表于<i class="date">{{ articleData.createtime }}</i></span
      >
    </div>
    <div class="bodys" v-html="articleData.body"></div>
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
  .item-detail {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      line-height: 2rem;
    }
    .author-info {
      font-size: 14px;
      font-weight: 300;
      color: #555;
      margin-bottom: 20px;
      .name {
        color: rgb(14, 11, 211);
        margin: 0 8px;
      }
      .date {
        font-style: normal;
        padding-left: 5px;
      }
    }
  }
</style>
