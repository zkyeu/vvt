<template>
  <section class="item-list" v-loading="loading">
    <ul>
      <li v-for="item in articleData" :key="item" @click="changeRoute(item.id)">
        <div class="title">{{ item.title }}</div>
        <div class="author">
          <span>{{ item.author }}</span>
          <span>{{ item.createtime }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig, getScrollTop, getScrollHeight } from '../../../utils/util';
  import router from '../../../router';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Article-detail',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const loading = ref(true);
      const articleData = ref();
      const changeRoute = (v: string) => {
        router.push(`articledetail?id=${v}`);
      };

      const getArticleList = (v: any) => {
        loading.value = true;
        $http
          .getarticlelist(v)
          .then((res: any) => {
            if (res.errNo === 0) {
              loading.value = false;
              articleData.value = res.data;
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };
      const scrollEvent = () => {
        // 检测滚动条位置，为无限加载准备
        window.onscroll = () => {
          console.log(getScrollHeight() - getScrollTop());
        };
      };

      onMounted(() => {
        getArticleList({ pn: 1, rn: 25 });
        scrollEvent();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        articleData,
        changeRoute,
        loading,
      };
    },
  });
</script>

<style lang="less" scoped>
  .item-list {
    background: #fff;
    padding: 2rem;
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
      font-size: 1.4rem;
    }
    .author {
      span {
        font-size: 14px;
        margin-right: 10px;
        color: #555;
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
