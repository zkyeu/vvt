<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-08-12 20:42:05
 * @LastEditors: Please set LastEditors
 * @Description: 前台默认页面
 * @FilePath: /vvt/src/views/frontend/default.vue
-->
<template>
  <section class="content">
    <div class="content-left">
      <ArticleList />
    </div>
    <div class="content-right">
      <Types />
    </div>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../../store';
  import { useGlobalConfig } from '../../utils/util';
  import ArticleList from './article/article-list.vue';
  import Types from '../../components/front/types.vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Default',
    components: { ArticleList, Types },
    setup: () => {
      const store = useStore(key);
      const msg = computed(() => store.state.count);
      const { $http, $confirm, $message } = useGlobalConfig();
      const userData = ref([]);
      const articleData = ref([]);
      const aid = ref('3');
      const content = ref('');

      const getUser = () => {
        $http
          .getUser()
          .then((res: any) => {
            userData.value = res;
            // console.log(res);
          })
          .catch((err: any) => {
            console.log('errrrrrr', err);
          });
      };

      const getArticle = () => {
        $http
          .getArticle()
          .then((res: any) => {
            articleData.value = res;
            // console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const createarticle = () => {
        $http
          .createarticle({
            title: '我是标题信息',
            content: '我内容信息',
            author: 'zhu',
            type: 2,
            typename: '221231322',
          })
          .then((res: any) => {
            articleData.value = res;
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };
      const delitem = () => {
        console.log(aid.value);
        $http
          .deletearticle({
            id: aid.value,
          })
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const updateData = () => {
        console.log(aid.value, content.value);
        $http
          .updatearticle({
            id: aid.value,
            content: content.value,
          })
          .then((res: any) => {
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };
      onMounted(() => {
        // 获取信息
        // getUser();
        //获取文章
        // getArticle();
        // 创建文章
        //createarticle();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        msg,
        userData,
        articleData,
        delitem,
        updateData,
        aid,
        content,
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
