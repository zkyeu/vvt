<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-08-17 21:01:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/default.vue
-->
<template>
  <section class="content">
    <el-form ref="addArticle" :model="forms" label-width="100px">
      <el-form-item label="文章标题：">
        <el-input v-model="forms.title"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input v-model="forms.author" disabled></el-input>
      </el-form-item>
      <el-form-item label="文章类型：">
        <el-select v-model="forms.type" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容：" class="editor">
        <div id="editor"></div>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleSave('no')">取消</el-button>
        <el-button type="primary" @click="handleSave('yes')">{{
          isEdit ? '提交修改' : '立即创建'
        }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, reactive, onMounted } from 'vue';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';
  import Editor from 'quill';
  import { useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import Router from '../../../router';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'AddItem',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const types = [
        {
          value: 1,
          label: 'HTML',
        },
        {
          value: 2,
          label: 'CSS',
        },
        {
          value: 3,
          label: 'JS',
        },
      ];
      const forms = reactive({
        title: '',
        content: '',
        author: '李亮',
        type: '',
      });
      const route = useRoute();
      const routeObj = reactive(route.query);
      const isEdit = ref(false);

      const handleSave = (v: string) => {
        if (v === 'no') return Router.push('/admin/article');
        let obj = document.querySelector('.ql-editor');
        forms.content = (obj as any).innerHTML;

        let params: any = {
          ...forms,
          typename: 'HTML',
        };

        if (!isEdit.value) {
          params['updatetime'] = formatDateTime(new Date());
          createArticle(params);
        } else {
          params['createtime'] = formatDateTime(new Date());
          updateArticle(params);
        }
      };

      // 创建新文章
      const createArticle = (params: object) => {
        $http
          .createarticle({ ...params })
          .then((res: any) => {
            ElMessage.success({
              message: res.message,
              type: 'success',
            });
            if (res.errNo === 0) {
              Router.push('/admin/article');
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 提交编辑
      const updateArticle = (params: object) => {
        $http
          .updatearticle({ id: routeObj.id, ...params })
          .then((res: any) => {
            ElMessage.success({
              message: res.message,
              type: 'success',
            });
            if (res.errNo === 0) {
              Router.push('/admin/article');
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 判断是否是编辑态
      const editType = () => {
        if (routeObj.isEdit === '1') {
          isEdit.value = true;
          getArticle(routeObj.id);
        } else {
          isEdit.value = false;
        }
      };

      // 获取文章
      const getArticle = (id: any) => {
        $http
          .getarticle({ id: id })
          .then((res: any) => {
            const { title, content, author, type } = res.data;
            forms.title = title;
            forms.content = content;
            forms.author = author;
            forms.type = type;
            let obj = document.querySelector('.ql-editor');
            if (obj) {
              obj.innerHTML = content;
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      onMounted(() => {
        new Editor('#editor', {
          theme: 'snow',
        });
        editType();
      });

      return {
        types,
        forms,
        isEdit,
        handleSave,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
  .content {
    display: block;
    padding: 30px 16px;

    .hover {
      cursor: pointer;
      &:hover {
        color: rgb(46, 2, 244);
      }
    }
    .operate {
      padding-right: 15px;
    }
    #editor {
      min-height: 100px;
      max-height: 240px;
    }
    .editor {
      min-height: 290px;
    }
  }
</style>
