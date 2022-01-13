<!--
 * @Author: your name
 * @Date: 2022-01-05 17:41:11
 * @LastEditTime: 2022-01-13 19:05:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/components/front/comment.vue
-->
<template>
  <div class="comment">
    <div class="author">
      <div class="photo">
        <icon :data="user"></icon>
      </div>
      <div class="name">
        <div>姓名</div>
        <!-- <div class="reg">MBA21081班</div> -->
      </div>
    </div>
    <div class="content">
      <el-input
        v-model="commentBody"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        :placeholder="pl"
        maxlength="300"
      >
      </el-input>
    </div>
    <div class="submit">
      <div class="biaoqing">
        <span @click="toggleEmoji"> <icon :data="biaoqing"></icon>表情</span>
        <Picker
          :data="emojiIndex"
          set="apple"
          @select="showEmoji"
          class="emoji"
          v-show="showEmojiLayer"
        />
      </div>
      <div><el-button type="primary" size="mini" @click="submitComment" round>发布</el-button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
import { useGlobalConfig, getScrollTop, getScrollHeight } from '../../utils/util';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import user from 'assets/svg/origin/user.svg';
import biaoqing from 'assets/svg/origin/biaoqing.svg';
import data from 'emoji-mart-vue-fast/data/all.json';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src/index';
import 'emoji-mart-vue-fast/css/emoji-mart.css';
let emojiIndex = new EmojiIndex(data);
export default defineComponent({
  name: 'Comment',
  components: { Picker },
  props: {
    aid: {
      type: Number,
      default: () => {},
    },
    pid: {
      type: Number,
      default: () => {},
    },
    pl: {
      type: String,
      default: () => {
        return '回复';
      },
    },
    type: {
      type: String,
      default: () => {
        return 'newcomment';
      },
    },
  },
  setup: (props, ctx) => {
    const commentBody = ref('');
    const { $http, $confirm, $message } = useGlobalConfig();
    const route = useRoute();
    const showEmojiLayer = ref(false);

    // 添加内容
    const submitComment = () => {
      let obj: any = {
        userId: 1,
        content: commentBody.value,
        aid: props.aid,
      };
      if (props.type === 'recomment') {
        obj['sid'] = props.pid;
      }

      $http
        .addcomment(obj)
        .then((res: any) => {
          if (res.errNo === 0) {
            ElMessage.success({
              message: res.message,
              type: 'success',
            });
            commentBody.value = '';

            // 请求新列表
            ctx.emit('getList');
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
      (document.querySelector('.emoji-mart-bar-preview') as any).style.display = 'none';
    });
    return {
      commentBody,
      submitComment,
      user,
      biaoqing,
      emojiIndex,
      showEmoji,
      showEmojiLayer,
      toggleEmoji,
    };
  },
});
</script>

<style lang="less" scoped>
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
}
.emoji {
  position: relative;
  left: 65px;
  top: -37px;
}
.emoji-mart-bar-preview {
  display: none;
}
</style>
