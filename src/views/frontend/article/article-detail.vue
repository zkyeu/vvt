<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-01-05 20:26:30
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
            <span v-if="true">{{ 4 }}</span>
            <span v-else>评论</span>
          </div>
          <div>
            <icon :data="zan"></icon>
            <span v-if="true">{{ 9 }}</span>
            <span v-else>点赞</span>
          </div>
        </div>
        <Comment :aid="Number(aid)" @getList="fetchComment" />
      </div>
      <div class="comment-list">
        <template v-if="commentList.data.length">
          <div>
            <div class="count-comment">全部{{ commentList.data.length }}条评论</div>
            <div class="list-detail" v-for="i in commentList.data">
              <div class="author mt">
                <div class="photo list">
                  <icon :data="user"></icon>
                </div>
                <div class="name list">
                  <div>姓名</div>
                  <div class="reg">MBA21081班</div>
                </div>
              </div>
              <div class="comment-content">{{ i.content }}</div>
              <div class="props">
                <div>{{ i.create_time }}</div>
                <div class="right">
                  <div>
                    <icon :data="pinglun"></icon>
                    <span v-if="true">{{ 4 }}</span>
                    <span v-else>评论</span>
                  </div>
                  <div>
                    <icon :data="zan"></icon>
                    <span v-if="true">{{ 23 }}</span>
                    <span v-else>点赞</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div>暂无评论</div>
        </template>
      </div>
    </div>
    <div class="content-right">
      <Types />
    </div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
  import { useGlobalConfig, getScrollTop, getScrollHeight } from '../../../utils/util';
  import { useRoute } from 'vue-router';
  import Content from './content.vue';
  import Comment from '../../../components/front/comment.vue';
  import Types from '@com/front/types.vue';
  import { ElMessage } from 'element-plus';
  import { log } from 'console';
  import shoucang from 'assets/svg/origin/shoucang.svg';
  import vip from 'assets/svg/origin/vip.svg';
  import pinglun from 'assets/svg/origin/pinglun.svg';
  import zan from 'assets/svg/origin/zan.svg';
  import user from 'assets/svg/origin/user.svg';
  import biaoqing from 'assets/svg/origin/biaoqing.svg';
  import data from 'emoji-mart-vue-fast/data/all.json';

  // Note: component needs to be imported from /src subfolder:
  import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src/index.js';
  import 'emoji-mart-vue-fast/css/emoji-mart.css';
  let emojiIndex = new EmojiIndex(data);
  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types, Picker, Comment },
    setup: () => {
      const commentBody = ref('');
      const { $http, $confirm, $message } = useGlobalConfig();
      const route = useRoute();
      const commentList: any = reactive({ data: {} });
      const showEmojiLayer = ref(false);
      const aid = ref();

      // 添加内容
      const submitComment = () => {
        let obj = {
          aid: route.query.id,
          userId: 1,
          content: commentBody.value,
        };
        $http
          .addcomment(obj)
          .then((res: any) => {
            if (res.errNo === 0) {
              ElMessage.success({
                message: res.message,
                type: 'success',
              });
              commentBody.value = '';
              fetchComment();
              // 请求新列表
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 获取评论
      const fetchComment = () => {
        $http
          .getcomment({
            aid: route.query.id,
            pn: 1,
            rn: 20,
          })
          .then((res: any) => {
            if (res.errNo === 0) {
              // 请求新列表
              // console.log(res.data);
              commentList.data = res.data;
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 添加表情
      const showEmoji = (emoji: any) => {
        commentBody.value += emoji.native;
        toggleEmoji();
      };

      const toggleEmoji = () => {
        showEmojiLayer.value = !showEmojiLayer.value;
      };

      onMounted(() => {
        fetchComment();
        aid.value = route.query.id;
      });
      return {
        commentBody,
        commentList,
        submitComment,
        fetchComment,
        shoucang,
        vip,
        pinglun,
        zan,
        user,
        biaoqing,
        emojiIndex,
        showEmoji,
        showEmojiLayer,
        toggleEmoji,
        aid,
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
          padding: 0 20px;
          div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
          }
        }

        .comment {
          .content {
            position: relative;
            &::before {
              content: '';
              position: absolute;
              left: 7px;
              top: -14px;
              z-index: 2;
              border-width: 8px;
              border-style: solid;
              border-color: transparent transparent rgb(255, 255, 255);
              display: block;
            }
            &::after {
              content: '';
              position: absolute;
              left: 8px;
              top: -14px;
              border-width: 7px;
              border-style: solid;
              border-color: transparent transparent #ccc;
              display: block;
            }
          }

          .submit {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            color: #777;
            svg {
              width: 28px;
              height: 28px;
              cursor: pointer;
            }
            .biaoqing {
              span {
                cursor: pointer;
                padding: 5px;
              }
            }
          }
        }
      }

      .comment-list {
        padding: 1.2rem 1.6rem;
        background: #fff;
        position: relative;
        margin: 10px 0;

        .count-comment {
          font-size: 18px;
          color: #333;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .list-detail {
          border-bottom: solid 1px #eee;
          .comment-content {
            line-height: 25px;
            padding: 0 0 5px 47px;
          }
          &:last-child {
            border: none;
          }
        }
        .props {
          display: flex;
          justify-content: space-between;
          padding: 0 0 8px 47px;
          color: #999;
          & > div {
            display: flex;
          }
          .right {
            display: flex;
            justify-content: space-between;
            width: 150px;
            color: #333;
            div {
              cursor: pointer;
              width: 50px;
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
    }
    .author {
      margin-top: 16px;
      display: flex;
      margin-bottom: 12px;
      .photo {
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 15px;
        overflow: hidden;
        svg {
          width: 30px;
          height: 30px;
          color: #ccc;
        }

        &.list {
          width: 36px;
          height: 36px;
          border: solid 1px #ccc;
          background: #f8f8f8;
          border-radius: 18px;
          svg {
            width: 36px;
            height: 36px;
            color: #ccc;
          }
        }
      }
      .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        color: #555;
        font-size: 14px;
        font-weight: 500;
        .reg {
          font-size: 10px;
          font-weight: 400;
          color: #999;
        }
      }
      .list {
        div {
          height: 16px;
          line-height: 20px;
        }
        img {
          width: 36px;
          height: 36px;
        }
      }
      &.mt {
        margin-bottom: 4px;
      }
    }
    .content-right {
      width: 300px;
      background: #fff;
    }
  }
  .emoji {
    position: relative;
    left: 60px;
    top: -30px;
  }
</style>
