<template>
  <section class="item-list">
    <div class="survey" v-if="page.id === '39'">
      <div class="class-a">
        <span>兴趣/性格</span>
        <span>态度/评价</span>
        <span>能力/素养</span>
        <span>生涯/决策</span>
        <span>趣味/娱乐</span>
        <span>MBA</span>
        <span>其他</span>
      </div>
      <div class="class-b">
        <span>基础能力</span>
        <span>自我管理</span>
        <span>任务执行</span>
        <span>人际关系</span>
        <span>团队协作</span>
        <span>创新创业</span>
      </div>
    </div>
    <ul v-loading="loading" v-if="articleData.list.length">
      <li
        v-for="item in articleData.list"
        :key="item"
        @click="changeRoute({ id: item.id, t: item.type })"
      >
        <div class="title">{{ item.title }}</div>
        <div class="author">
          <span>{{ item.author }}</span>
          <span>{{ item.create_time }}</span>
        </div>
      </li>
    </ul>
    <div v-else>暂无信息</div>
    <div class="pages">
      <el-pagination
        v-if="count > 9 && articleData.list.length"
        background
        layout="prev, pager, next"
        :total="count"
        :current-page="page.pn"
        @current-change="changPage"
      >
      </el-pagination>
    </div>
  </section>
</template>

<script lang="ts" setup>
  // 组件引用部分========
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  import { useGlobalConfig, getScrollTop, getScrollHeight, testDevice } from '../../../utils/util';
  import router from '../../../router';
  import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
  import { useStore } from 'vuex';
  import { key } from '../../../store';
  import { log } from 'console';

  const { $http, $confirm, $message } = useGlobalConfig();
  const loading = ref(true);
  const articleData: any = reactive({ list: [] });
  const route = useRoute();
  const page: any = reactive({ pn: 1, rn: 10, id: '', word: '', origin: 1 });
  const count = ref(0);
  const pn = ref(1);
  const store = useStore(key);
  const searchWord = computed(() => store.state.searchWord);

  const changeRoute = (v: any) => {
    router.push(`ad?id=${v.id}&i=${v.t}`);
  };

  const getArticleList = async (v: any) => {
    loading.value = true;
    await $http
      .getarticlelist(v)
      .then((res: any) => {
        if (res.errNo === 0) {
          count.value = parseInt(res.count);
          loading.value = false;
          articleData.list = res.data;
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

  // onBeforeRouteUpdate((v, n) => {
  //   let id = v.query.i || '';
  //   console.log(id);
  //   console.log(n);
  // });
  watch(searchWord, () => {
    page.word = searchWord.value;
    page.pn = 1;
    getArticleList(page);
  });

  watch(
    () => route.query.i,
    (n) => {
      page.pn = 1;
      page.id = n;
      getArticleList(page);
    }
  );

  const displayDom = () => {
    let dom = document.querySelector('.content-right');
    (dom as any).style.display = 'none';
  };

  const changPage = (v: any) => {
    page.pn = v;
    getArticleList(page);
  };

  onMounted(() => {
    // scrollEvent();
    page.id = route.query.i;
    getArticleList(page);
    if (testDevice()) {
      displayDom();
    }
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
    .pages {
      display: flex;
      justify-content: center;
    }
    .survey {
      background: #f6f6f6;
      padding: 16px 16px 10px 16px;
      margin-bottom: 20px;
      border-radius: 3px;
      .class-a {
        display: flex;
        span {
          padding: 0 16px;
          height: 30px;
          line-height: 30px;
          background: #ddd;
          margin-right: 16px;
          border-radius: 2px;
          cursor: pointer;
          &:hover {
            background: #2483ff;
            color: #fff;
            font-weight: 700;
          }
        }
      }
      .class-b {
        padding-left: 8px;
        margin-top: 14px;
        span {
          padding: 0 10px;
          cursor: pointer;
          &:hover {
            color: #2483ff;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
