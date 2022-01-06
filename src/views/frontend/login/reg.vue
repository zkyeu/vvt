<!--
 * @Author: your name
 * @Date: 2022-01-06 14:19:28
 * @LastEditTime: 2022-01-06 21:13:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/views/frontend/login/login.vue
-->
<template>
  <section class="login">
    <div class="header">
      <div class="between">
        <div class="logo">
          <img src="../../../assets/logo.svg" alt="" width="80" height="80" />
        </div>
        <div class="nav">
          <span @click="handleBtn('index')">首页</span>
          <span @click="handleBtn('contact')">联系我</span>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <h1 class="ys">注册</h1>
        <div class="regist">
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="75px"
            size="mini"
          >
            <el-form-item label="用户名" prop="userId">
              <el-input v-model="ruleForm.userId" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input
                v-model="ruleForm.pwd"
                type="password"
                placeholder="密码8-16位长度"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码确认" prop="pwd1">
              <el-input
                v-model="ruleForm.pwd1"
                type="password"
                placeholder="请输入确认密码"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="policy"
          >登录/注册即表示你同意<span @click="handleBtn('index')">《隐私政策》</span></div
        >
        <div class="policy reg">已有账号，去<span @click="handleBtn('login')">登录</span></div>
      </div>
    </div>
    <div class="foot"></div>
  </section>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useGlobalConfig } from '../../../utils/util';
  import type { ElForm } from 'element-plus';
  const formSize = ref('');

  const ruleFormRef = ref<InstanceType<typeof ElForm>>();
  const ruleForm = reactive({
    userId: '',
    pwd: '',
    pwd1: '',
  });
  const rules = reactive({
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
      },
    ],
    region: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change',
      },
    ],
    date1: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
    date2: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a time',
        trigger: 'change',
      },
    ],
    type: [
      {
        type: 'array',
        required: true,
        message: 'Please select at least one activity type',
        trigger: 'change',
      },
    ],
    resource: [
      {
        required: true,
        message: 'Please select activity resource',
        trigger: 'change',
      },
    ],
    desc: [
      {
        required: true,
        message: 'Please input activity form',
        trigger: 'blur',
      },
    ],
  });
  const { $http, $message } = useGlobalConfig();
  const show = ref('index');
  const qrCode = ref('');
  const code = ref();
  // 切换导航
  // TODO 目前没做
  const handleBtn = (v: string) => {
    show.value = v;
  };

  const getCode = () => {
    $http
      .getcode()
      .then((res: any) => {
        if (res.errNo === 0) {
          console.log(res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // 获取二维码
  const fetchCode = () => {
    $http
      .login()
      .then((res: any) => {
        if (res.errNo === 0) {
          console.log(res);
          qrCode.value = res.data;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  onMounted(() => {
    // fetchCode();
    // getCode();
  });
</script>

<style lang="less" scoped>
  .login {
    .header {
      display: flex;
      justify-content: center;
      background-color: #fff;
      height: 100px;
      .between {
        display: flex;
        align-items: center;
        width: 1000px;

        .nav {
          margin-left: 200px;
          span {
            font-size: 20px;
            font-weight: 300;
            padding: 20px 30px;
            cursor: pointer;
            margin-right: 20px;
            &:hover {
              background-color: rgb(236, 245, 255);
              font-weight: 700;
            }
          }
        }
      }
    }

    .body {
      display: flex;
      justify-content: center;
      height: calc(100vh - 100px);
      .content {
        margin-top: 100px;
        width: 400px;
        height: 440px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 80px #ccc;
        h1 {
          text-align: center;
          height: 100px;
          line-height: 100px;
        }
        .regist {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          // width: 200px;
          height: 200px;
          // border: solid 1px #eee;
          margin: 0 auto;
        }

        .policy {
          margin-top: 50px;
          text-align: center;
          color: #999;
          span {
            color: #2483ff;
            cursor: pointer;
            &:hover {
              color: #016efc;
            }
          }
          &.reg {
            margin-top: 20px;
            span {
              font-weight: 700;
            }
          }
        }
      }
    }
    .ys {
      font-weight: 500;
      font-size: 22px;
      color: #8c888b;
      background: -webkit-linear-gradient(45deg, #4845e9, #f58f60, #f0d343, #189718, #225eb3);
      color: transparent;
      -webkit-background-clip: text;
      animation: ran 30s linear infinite;
    }

    @keyframes ran {
      from {
        backgroud-position: 0 0;
      }
      to {
        background-position: 2000px 0;
      }
    }
  }
</style>
