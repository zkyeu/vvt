<!--
 * @Author: your name
 * @Date: 2021-08-02 19:39:43
 * @LastEditTime: 2021-08-19 19:44:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/a.vue
-->
<template>
  <section>
    <el-form
      :model="basicInfo"
      :rules="rules"
      ref="basicForm"
      label-width="120px"
      class="basic-form"
      size="mini"
    >
      <el-form-item label="站点名称：" prop="title">
        <el-input v-model="basicInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="关键词：" prop="keywords">
        <el-input type="textarea" v-model="basicInfo.keywords"></el-input>
      </el-form-item>
      <el-form-item label="网站描述：" prop="desc">
        <el-input type="textarea" v-model="basicInfo.desc"></el-input>
      </el-form-item>
      <el-form-item label="网站备案号：" prop="icp">
        <el-input v-model="basicInfo.icp"></el-input>
      </el-form-item>
      <el-form-item label="版权信息：" prop="copyright">
        <el-input v-model="basicInfo.copyright"></el-input>
      </el-form-item>
      <el-form-item label="开启验证码：" prop="code">
        <el-radio-group v-model="basicInfo.code">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('basicForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('basicForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { log } from 'console';
  import { ref, defineComponent, reactive, onMounted, getCurrentInstance } from 'vue';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Basic',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const basicInfo: any = ref({
        title: '123',
        keywords: '111',
        desc: '123',
        icp: '123',
        copyright: '123',
        code: false,
      });
      const rules: any = {
        title: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' },
        ],
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
          { min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请输入网站描述', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' },
        ],
      };
      const basicForm: any = ref(null);

      const submitForm = (formName: any) => {
        basicForm.value.validate((valid: any) => {
          if (valid) {
            updateBasicInfo();
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      };
      const resetForm = (formName: any) => {
        basicForm.value.resetFields();
      };
      // 获取分类
      const getBasicInfo = () => {
        $http
          .getinfo()
          .then((res: any) => {
            if (res.errNo === 0) {
              basicInfo.value = res.data;
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };
      const updateBasicInfo = () => {
        delete basicInfo.value.updatetime;
        $http
          .updateinfo({ id: '1', ...basicInfo.value })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      onMounted(() => {
        getBasicInfo();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        basicInfo,
        resetForm,
        submitForm,
        basicForm,
        rules,
      };
    },
  });
</script>

<style lang="less" scoped>
  .basic-form {
    margin: 0 auto;
    padding: 30px;
    width: 500px;
  }
</style>
