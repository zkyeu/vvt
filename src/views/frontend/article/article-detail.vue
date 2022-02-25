<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-02-24 11:48:37
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
            <icon
              :data="basicInfo.shoucang ? shoucanged : shoucang"
              :class="{ active: basicInfo.shoucang }"
            ></icon>
            <!-- <icon :data="shoucang"></icon> -->
            <span v-if="true">收藏</span>
          </div>
          <div @click="handleClick('pinglun', basicInfo.pinglun)">
            <icon
              :data="basicInfo.pinglun ? pingluned : pinglun"
              :class="{ active: basicInfo.pinglun }"
            ></icon>
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
  import shoucang from 'assets/svg/origin/shoucang-o.svg';
  import shoucanged from 'assets/svg/origin/shoucang.svg';
  import pinglun from 'assets/svg/origin/pinglun-o.svg';
  import pingluned from 'assets/svg/origin/pinglun.svg';
  import zaned from 'assets/svg/origin/praise.svg';
  import zan from 'assets/svg/origin/praise-o.svg';
  import { testDevice } from '../../../utils/util';
  import { log } from 'console';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types, Comment, CommentComp },
    setup: () => {
      const route = useRoute();
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

      const handleClick = (v: string, i: any) => {
        /**
         * 思路：首先获取是否有本地，有则设置，否则执行逻辑。点击判断数据在处理
         */
        let LS = window.localStorage;
        let localBasicInfo: any = LS.getItem('basicInfo');
        let aid = route.query.id;
        if (aid) {
          let obj: any = {};
          const key = v;
          obj[key] = i === 0 ? 1 : 0;
          (basicInfo as any)[v] = obj[key];
          LS.setItem('basicInfo', JSON.stringify({ ...JSON.parse(localBasicInfo), ...obj }));
        }
      };

      onMounted(() => {
        aid.value = route.query.id;
        if (testDevice()) {
          displayDom();
        }
        let LS: any = window.localStorage;
        let obj = JSON.parse(LS.getItem('basicInfo'));
        if (obj) {
          for (let i in obj) {
            (basicInfo as any)[i] = obj[i];
          }
        }
      });

      return {
        shoucang,
        shoucanged,
        pinglun,
        pingluned,
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
          color: #666;

          div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            span {
              font-size: 12px !important;
            }
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
