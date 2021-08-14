<template>
  <section class="item-detail">
    <div class="title">这里是标题信息内容，一个伟大的开始</div>
      <div class="author-info">
        <span class="name">李亮</span>
        <span>发表于<i class="date">2021-08-20</i></span>
      </div>
      <div>{{ msg }}这个世界很奇妙，撒发发发发顺丰，撒法师大法师的法定身份，阿斯顿发顺丰打算发的。阿斯顿发顺丰打算大法师地方啊顺丰打算发大是大非。阿斯顿发顺丰打算大法师分，啊打算发生大法师地方，阿斯顿发生大法师地方。阿斯顿发送到发疯的。阿斯顿发的法定发。</div>
      <div>123</div>
  </section>
</template>

<script lang="ts">
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig } from '../../../utils/util';

  export default defineComponent({
    name: 'Article-detail',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const articleData = ref([]);

      const getArticle = () => {
        $http
          .getArticle()
          .then((res: any) => {
            articleData.value = res;
            // console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      onMounted(() => {
        getArticle();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        articleData
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
      margin-right: 30px;
      background: #f5f5f5;
      word-break: break-all;
      flex: 1;
      font-size: 14px;
      // font-weight: 400;
      line-height: 26px;
      .title {
        font-size: 18px;
        font-weight: 500;
}
    }

    .content-right {
      width: 300px;
      background: #f00;
    }
  }
</style>
