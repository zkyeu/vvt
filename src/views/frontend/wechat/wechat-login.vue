<!--
 * @Author: your name
 * @Date: 2021-12-24 23:06:53
 * @LastEditTime: 2022-01-13 19:07:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/views/frontend/wechat/wechat-login.vue
-->
<template>
  <section class="wechat">
    <h1>{{ msg }}</h1>
    <el-form ref="forms" :model="forms" label-width="120px">
      <el-form-item label="openid">
        <el-input v-model="forms.openid"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="forms.nickName"></el-input>
      </el-form-item>
      <el-form-item label="微信头像">
        <el-input v-model="forms.avatarUrl"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="forms.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
        <el-button @click="update">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
// 组件引用部分========
import { ref, defineComponent, reactive, computed, onMounted } from 'vue';
import { useGlobalConfig } from '../../../utils/util';

// 代码逻辑开始========
export default defineComponent({
  name: 'WechatLogin',
  setup: () => {
    const msg: string = '微信登陆';
    const { $http, $confirm, $message } = useGlobalConfig();
    const forms: any = reactive({
      openid: '',
      nickName: '',
      avatarUrl: '',
      phone: '',
      province: '',
      gender: null,
      country: '',
      city: '',
    });

    const onSubmit = () => {
      console.log(forms);
      $http
        .addwechatuser({ ...forms })
        .then(() => {})
        .catch((err: { errMsg: any }) => {
          console.log('errrrrrr');
        });
    };

    const update = () => {
      $http
        .updatewechatuser({ openid: 'openid1122222', ...forms })
        .then(() => {})
        .catch((err: { errMsg: any }) => {
          console.log('errrrrrr');
        });
    };

    onMounted(() => {});

    // 返回当前页面所有使用的数据跟逻辑========
    return {
      msg,
      forms,
      onSubmit,
      update,
    };
  },
});
</script>

<style lang="less" scoped>
.wechat {
  display: block;
}
</style>
