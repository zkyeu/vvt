<!--
 * @Author: your name
 * @Date: 2021-08-16 11:59:19
 * @LastEditTime: 2022-01-01 03:47:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/frontend/article/article-detail.vue
-->

<template>
  <section class="content">
    <div class="content-left">
      <Content />
      <div class="basic-info">
        <div>收藏</div>
        <div>评论</div>
        <div>点赞</div>
      </div>
      <div class="comment">
        <div class="author">作者信息</div>
        <div class="content">
          <el-input
            v-model="comment"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="我来说说..."
          >
          </el-input>
        </div>
        <div class="submit">
          <div>表情</div>
          <div><el-button type="primary" size="mini" @click="submitComment">发布</el-button></div>
        </div>
      </div>
      <div class="comment-list">
        <div v-for="i in commentList.data"> {{ i.content }}-{{ i.create_time }} </div>
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
  import Types from '@com/front/types.vue';
  import { ElMessage } from 'element-plus';
  import { log } from 'console';

  export default defineComponent({
    name: 'Article-detail',
    components: { Content, Types },
    setup: () => {
      const comment = ref('');
      const { $http, $confirm, $message } = useGlobalConfig();
      const route = useRoute();
      const commentList: any = reactive({ data: {} });

      // 添加内容
      const submitComment = () => {
        let obj = {
          aid: route.query.id,
          userId: 1,
          content: comment.value,
        };
        $http
          .addcomment(obj)
          .then((res: any) => {
            if (res.errNo === 0) {
              ElMessage.success({
                message: res.message,
                type: 'success',
              });
              comment.value = '';
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
              console.log(res.data);
              commentList.data = res.data;
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      onMounted(() => {
        fetchComment();
      });
      return {
        comment,
        commentList,
        submitComment,
        fetchComment,
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
      background: #fff;
      word-break: break-all;
      flex: 1;
      font-size: 14px;
      line-height: 26px;
      padding: 1rem 2rem;

      .basic-info {
        display: flex;
        justify-content: space-between;
      }

      .comment {
        .author {
          margin-top: 16px;
        }
        .content {
        }

        .submit {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }
      }

      .comment-list {
        background: #f8f8f8;
      }
    }

    .content-right {
      width: 300px;
      background: #fff;
    }
  }
</style>
