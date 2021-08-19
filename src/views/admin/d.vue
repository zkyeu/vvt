<!--
 * @Author: your name
 * @Date: 2021-08-02 19:39:43
 * @LastEditTime: 2021-08-19 18:45:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/a.vue
-->
<template>
  <section>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="basicForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账户" prop="username">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.number="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script lang="ts">
  import { reactive, ref } from 'vue';

  export default {
    name: 'login',
    setup() {
      //定义·表单输入框信息
      const ruleForm = reactive({
        username: '',
        password: '',
      });

      //定义校验规则 表单代码中必须以 :rules 接收

      const rules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      };

      // vue3 ref 获取方式
      const basicForm: any = ref(null);

      //确定按钮的格式
      const submitForm = () => {
        basicForm.value.validate((valid: any) => {
          console.log(valid);
          if (valid) {
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      };

      return {
        ruleForm,
        basicForm,
        rules,
        submitForm,
      };
    },
  };
</script>
