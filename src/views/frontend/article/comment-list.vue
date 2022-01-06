<!--
 * @Author: your name
 * @Date: 2022-01-06 07:49:51
 * @LastEditTime: 2022-01-06 08:52:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/views/frontend/article/comment-list.vue
-->
<template>
  <section>
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
                <div :class="{ active: commentObj.data.id === i.id }">
                  <div v-if="commentObj.data.id === i.id" @click="handleBtn('nocomment', '')">
                    <icon :data="pinglun" :class="{ active: commentObj.data.id === i.id }"></icon>
                    <span>取消评论</span>
                  </div>

                  <div v-else @click="handleBtn('comment', { id: i.id, userId: i.userId })">
                    <icon :data="pinglun"></icon>
                    <span v-if="!true">
                      {{ 8 }}
                    </span>
                    <span v-else> 评论 </span>
                  </div>
                </div>
                <div>
                  <icon :data="zan"></icon>
                  <span v-if="true">{{ 23 }}</span>
                  <span v-else>点赞</span>
                </div>
              </div>
            </div>
            <div class="re-comment" v-if="commentObj.data.id === i.id">
              <Comment
                type="recomment"
                :aid="Number(aid)"
                :pid="commentObj.data.id"
                @getList="fetchComment"
                pl="回复:"
              />
            </div>
            <div class="comment-son" v-for="i in commentList.data">
              <div class="content">
                <span class="name">【姓名】：</span>
                <span>{{ i.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div>暂无评论</div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, reactive, defineExpose, onMounted } from 'vue';
  import { useGlobalConfig, getScrollTop, getScrollHeight } from '../../../utils/util';
  import { useRoute } from 'vue-router';
  import Comment from '../../../components/front/comment.vue';
  import pinglun from 'assets/svg/origin/pinglun.svg';
  import zan from 'assets/svg/origin/zan.svg';
  import user from 'assets/svg/origin/user.svg';

  export default defineComponent({
    name: 'CommentComponet',
    components: { Comment },
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const route = useRoute();
      const commentList: any = reactive({ data: {} });
      const aid = ref();
      const commentObj: any = reactive({ data: {} });
      const commentLength = ref();

      // 添加内容

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
              commentList.data = res.data;
              commentObj.data = {};
              commentLength.value = res.data.length;
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 评论
      const handleBtn = (v: string, obj: any) => {
        switch (v) {
          case 'comment':
            commentObj.data = {
              id: obj.id,
              userId: obj.userId,
            };
            break;
          case 'nocomment':
            commentObj.data = {};
            break;
          default:
        }
      };

      onMounted(() => {
        aid.value = route.query.id;
        fetchComment();
        defineExpose({ fetchComment, commentLength });
      });
      return {
        commentList,
        fetchComment,
        pinglun,
        zan,
        user,
        aid,
        handleBtn,
        commentObj,
        commentLength,
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
          margin-bottom: 16px;
          .comment-content {
            line-height: 25px;
            padding: 0 0 5px 47px;
          }
          &:last-child {
            border: none;
          }
          .comment-son {
            margin: 0 0 10px 47px;
            border-bottom: dotted 1px #ddd;
            .content {
              display: inherit;
              color: #666;
              .name {
                color: #2483ff;
              }
            }
            &:last-child {
              border: none;
            }
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
            width: 200px;
            color: #333;
            div {
              cursor: pointer;
              width: 90px;
            }
          }
        }

        .re-comment {
          padding: 0 0 16px 47px;
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
      // margin-top: 16px;
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
    .active {
      color: #2483ff;
    }
  }
</style>
