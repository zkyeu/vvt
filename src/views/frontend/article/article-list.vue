<template>
  <section class="item-list">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="dis"
      infinite-scroll-distance="100"
      v-loading="loading"
    >
      <li v-for="item in articleData.list" :key="item" @click="changeRoute(item.id)">
        <div class="title">{{ item.title }}</div>
        <div class="author">
          <span>{{ item.author }}</span>
          <span>{{ item.create_time }}</span>
        </div>
      </li>
    </ul>
    <div v-if="noMore" class="bottom-line">
      <div><span>我是有底线的</span></div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  // 组件引用部分========
  import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
  import { useGlobalConfig, getScrollTop, getScrollHeight } from '../../../utils/util';
  import router from '../../../router';
  import { useRouter, useRoute } from 'vue-router';

  const { $http, $confirm, $message } = useGlobalConfig();
  const loading = ref(true);
  const articleData: any = reactive({ list: [] });
  const route = useRoute();
  const routeObj = route.query;
  const page: any = reactive({ pn: 1, rn: 10, type: '' });
  const count = ref(0);
  const load = () => {
    loading.value = true;
    setTimeout(() => {
      page.pn += 1;
      getArticleList(page);
    }, 200);
  };
  const noMore = computed(() => {
    return articleData.list.length === count.value;
  });
  const dis = computed(() => {
    return loading.value || noMore.value;
  });

  const changeRoute = (v: string) => {
    router.push(`ad?id=${v}`);
  };

  const getArticleList = async (v: any) => {
    loading.value = true;
    await $http
      .getarticlelist(v)
      .then((res: any) => {
        if (res.errNo === 0) {
          count.value = parseInt(res.count);
          loading.value = false;
          articleData.list = articleData.list.concat(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const scrollEvent = () => {
    // 检测滚动条位置，为无限加载准备
    window.onscroll = () => {
      console.log(getScrollHeight(), getScrollTop());
    };
  };

  // 检测分类
  const checkRoute = () => {
    console.log();
  };

  onMounted(() => {
    // scrollEvent();
    checkRoute();
    page.type = routeObj.type;
    getArticleList(page);
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
    .bottom-line {
      display: flex;
      justify-content: center;
      padding-bottom: 30px;
      div {
        display: flex;
        justify-content: center;
        width: 300px;
        border-bottom: 1px solid #ddd;
      }
      span {
        position: relative;
        top: 14px;
        width: 100px;
        font-size: 14px;
        color: #999;
        background-color: #fff;
        text-align: center;
      }
    }
  }
</style>
