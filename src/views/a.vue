<!--
 * @Author: your name
 * @Date: 2021-08-02 19:39:43
 * @LastEditTime: 2021-08-04 13:47:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/a.vue
-->
<template>
  <section class="aaaaa">
    <h1>{{ msg }}</h1>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted } from 'vue';
  import { useGlobalConfig } from '../utils/util';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Default',
    setup: () => {
      const msg: string = '这里是aaaaaaaa页面内容信息';
      const { $http, $confirm, $message } = useGlobalConfig();

      onMounted(() => {
        // $confirm('执行删除操作可能会导致数据丢失，确定要继续执行该操作吗?', '', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   showClose: false,
        //   type: 'warning',
        // }).then(() => {
        //   console.log($http);
        //   $http
        //     .deletetask({ aa: 1 })
        //     .then(() => {
        //       $message({
        //         type: 'success',
        //         message: '删除成功!',
        //       });
        //     })
        //     .catch((err: { errMsg: any }) => {
        //       console.log('errrrrrr');
        //     });
        // });
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        msg,
      };
    },
  });
</script>

<style scoped></style>
