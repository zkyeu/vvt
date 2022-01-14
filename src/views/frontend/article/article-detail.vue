<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-01-14 11:43:21
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
          <div>
            <icon :data="shoucang"></icon>
            <spa v-if="true">收藏</spa>
          </div>
          <div>
            <icon :data="pinglun"></icon>
            <span v-if="true">{{ 1 }}</span>
            <span v-else>评论</span>
          </div>
          <div>
            <icon :data="zan"></icon>
            <span v-if="true">{{ 9 }}</span>
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
      <CommentComp ref="getNew"></CommentComp>
    </div>
    <div class="content-right">
      <Types />
    </div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Content from './content.vue';
  import Comment from '../../../components/front/comment.vue';
  import CommentComp from './comment-list.vue';
  import Types from '@com/front/types.vue';
  import shoucang from 'assets/svg/origin/shoucang.svg';
  import pinglun from 'assets/svg/origin/pinglun.svg';
  import zan from 'assets/svg/origin/zan.svg';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types, Comment, CommentComp },
    setup: () => {
      const route = useRoute();
      const showEmojiLayer = ref(false);
      const aid = ref();
      const getNew = ref();

      const fetchCommentInfo = () => {
        // console.log('获取评论信息');
        // CommentComp.value.fetchComment;
        getNew.value.fetchComment();
        console.log(getNew.value.commentLength);
      };

      onMounted(() => {
        aid.value = route.query.id;
      });
      return {
        shoucang,
        pinglun,
        zan,
        aid,
        fetchCommentInfo,
        getNew,
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
    }
    .content-right {
      width: 300px;
      background: #fff;
    }
  }
</style>
