<template>
  <section class="item-list">
    <ul>
      <li v-for="item in articleData" :key="item" @click="changeRoute(item.id)">
        <div class="title">{{item.title}}</div>
        <div class="author">
          <span>{{item.author}}</span>
          <span>{{item.createtime}}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig } from '../../../utils/util';
  import router from '../../../router';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Article-detail',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const articleData = ref();
      const list = [
        {
          id: 1,
          title: '这里是标题信息内容，一个伟大的开始',
          author: '李亮',
          createtime: '2021年08月26日'
        },
        {
          id: 2,
          title: '新闻标题内容信息',
          author: '李亮',
          createtime: '2021年08月25日'
        },
        {
          id: 3,
          title: '信息标题4',
          author: '李亮',
          createtime: '2021年08月20日'
        },
        {
          id: 4,
          title: '暖融融信息',
          author: '李亮',
          createtime: '2021年08月19日'
        },
      ];
      const changeRoute = (v: string) => {
        router.push(`articledetail?id=${v}`);
      };

      const getArticleList = () => {
        $http
          .getarticlelist()
          .then((res: any) => {
            articleData.value = res;
          })
          .catch((err: any) => {
            console.log(err);
          });
      };
      // const toArticle = () => {
        
      // };

      onMounted(() => {
        getArticleList();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        articleData,
        list,
        changeRoute
      };
    },
  });
</script>

<style lang="less" scoped>
  .item-list {
    li {
      margin-bottom: 10px;
      padding: 8px 5px;
      
      &:hover {
        background: #e8f3ff;
        cursor: pointer;
        animation-name: back;
        animation-duration: 340ms;
        .title {
          color: #1e80ff;
         
        }
      }
    }
    .title {
      font-size: 16px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      
    }
    .author {
      span {
        font-size: 14px;
        margin-right: 10px;
        color:#555;
      }
    }
  }
  @keyframes back {
    from {
      background: #fff;
    }
    to {
      background: #e8f3ff;
    }
  }
</style>
