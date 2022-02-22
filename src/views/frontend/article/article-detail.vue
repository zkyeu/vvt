<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-02-22 21:41:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/frontend/article/article-detail.vue
-->

<template>
  <section class="content">
    <div class="content-left">
      <div class="main-content">
        <Content />
        <div class="basic-info">
          <div @click="handleClick('shoucang', basicInfo.shoucang)">
            <icon :data="shoucang"></icon>
            <spa v-if="true">收藏</spa>
          </div>
          <div @click="handleClick('pinglun', basicInfo.pinglun)">
            <icon :data="pinglun"></icon>
            <span v-if="true">{{ commLength }}</span>
            <span v-else>评论</span>
          </div>
          <div @click="handleClick('zan', basicInfo.zan)">
            <icon :data="basicInfo.zan ? zaned : zan" :class="{ active: basicInfo.zan }"></icon>
            <span v-if="true">{{ 19 }}</span>
            <span v-else>点赞</span>
          </div>
        </div>
        <Comment
          :aid="Number(aid)"
          @getList="fetchCommentInfo"
          pl="我来说说..."
          type="newcomment"
        />
      </div>
      <CommentComp ref="getNew" @commentLength="commLengthFn"></CommentComp>
    </div>
    <div class="content-right">
      <Types />
    </div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import Content from './content.vue';
  import Comment from '../../../components/front/comment.vue';
  import CommentComp from './comment-list.vue';
  import Types from '@com/front/types.vue';
  import shoucang from 'assets/svg/origin/shoucang.svg';
  import pinglun from 'assets/svg/origin/pinglun.svg';
  import zaned from 'assets/svg/origin/praise.svg';
  import zan from 'assets/svg/origin/praise-o.svg';
  import { testDevice } from '../../../utils/util';
  import { log } from 'console';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types, Comment, CommentComp },
    setup: () => {
      const route = useRoute();
      const showEmojiLayer = ref(false);
      const aid = ref();
      const getNew = ref();
      const commLength = ref(0);
      const basicInfo = reactive({
        shoucang: 0,
        pinglun: 0,
        zan: 0,
      });

      const fetchCommentInfo = () => {
        // console.log('获取评论信息');
        // CommentComp.value.fetchComment;
        getNew.value.fetchComment();
        console.log(getNew.value.commentLength);
      };
      const commLengthFn = (v: any) => {
        commLength.value = v;
      };

      const displayDom = () => {
        let dom = document.querySelector('.content-right');
        (dom as any).style.display = 'none';
      };
      const changeValue = (obj: any, v: any, i: any) => {
        if (i) {
          LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), zan: 0 }));
          basicInfo.zan = 0;
        } else {
          LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), zan: 1 }));
          basicInfo.zan = 1;
        }
      };
      const handleClick = (v: string, i: any) => {
        let LS = window.localStorage;
        let localBasicInfo: any = LS.getItem('basicInfo');

        switch (v) {
          case 'zan':
            if (i) {
              LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), zan: 0 }));
              basicInfo.zan = 0;
            } else {
              LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), zan: 1 }));
              basicInfo.zan = 1;
            }
            break;
          case 'pinglun':
            LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), pinglun: 1 }));
            basicInfo.pinglun = 1;
            break;
          case 'shoucang':
            LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), shoucang: 1 }));
            basicInfo.shoucang = 1;
            break;
          default:
        }
      };

      onMounted(() => {
        aid.value = route.query.id;
        if (testDevice()) {
          displayDom();
        }
        let LS = window.localStorage;
      });

      return {
        shoucang,
        pinglun,
        zan,
        zaned,
        aid,
        fetchCommentInfo,
        getNew,
        commLengthFn,
        commLength,
        basicInfo,
        handleClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: flex;

    .content-left {
      min-width: 330px;
      margin-right: 2rem;

      word-break: break-all;
      flex: 1;
      font-size: 14px;
      line-height: 26px;

      .main-content {
        padding: 1.2rem 1.6rem;
        background: #fff;
        .basic-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
    svg {
      position: relative;
      top: -2px;
      width: 18px;
      height: 18px;
      color: #333;
      margin-right: 3px;
      &.active {
        color: #2483ff;
      }
    }
    .content-right {
      width: 300px;
      background: #fff;
    }
  }
</style>
