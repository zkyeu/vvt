<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-12-23 01:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/article/add.vue
-->
<template>
  <section class="content">
    <el-form ref="addArticle" :model="forms" label-width="100px" size="small">
      <el-form-item label="文章标题：">
        <el-input v-model="forms.title"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input v-model="forms.author" disabled></el-input>
      </el-form-item>
      <el-form-item label="文章类型：">
        <el-select v-model="forms.type" placeholder="请选择">
          <el-option v-for="item in types" :key="item.id" :label="item.typename" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容：" class="editor">
        <div id="editor"></div>
      </el-form-item>

      <el-form-item label="标签：">
        <div class="tags">
          <el-tag :key="tag" v-for="tag in forms.tags" closable @close="handleTagClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput"
            >+ New Tag</el-button
          >
        </div>
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
  import { ref, defineComponent, reactive, onMounted, nextTick } from 'vue';
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
      const forms: any = ref({
        title: '',
        body: '',
        author: '',
        type: '',
        tags: [],
      });
      const inputVisible = ref(false);
      const inputValue: any = ref('');
      const saveTagInput: any = ref(null);
      const route = useRoute();
      const routeObj = reactive(route.query);
      const isEdit = ref(false);
      const types: any = ref([]);

      const handleSave = (v: string) => {
        if (v === 'no') return Router.push('/admin/article');
        let obj = document.querySelector('.ql-editor');
        forms.value.body = (obj as any).innerHTML;

        let params: any = {
          ...forms.value,
        };

        if (isEdit.value) {
          // params['updatetime'] = formatDateTime(new Date());
          params['tags'] = JSON.stringify(params['tags']);
          updateArticle(params);
        } else {
          params['create_time'] = formatDateTime(new Date());
          params['tags'] = JSON.stringify(params['tags']);
          addArticle(params);
        }
      };

      // 关闭tag标签
      const handleTagClose = (tag: any) => {
        forms.value.tags.splice(forms.value.tags.indexOf(tag), 1);
      };

      // 显示标签输入框
      const showInput = async () => {
        inputVisible.value = true;
        // await nextTick();
        // saveTagInput.focus;
        // console.log(saveTagInput);
      };

      // 标签输入框值处理
      const handleInputConfirm = () => {
        let inputValues = inputValue.value;
        if (inputValues) {
          console.log();
          forms.value['tags'].push(inputValues);
        }
        inputVisible.value = false;
        inputValue.value = '';
      };

      // 表单校验
      const validate = (v: any) => {
        if (!v.title) {
          $message.warning('请输入文章标题！');
          return false;
        } else if (!v.type) {
          $message.warning('请选择文章分类！');
          return false;
        } else if (!v.body) {
          $message.warning('请输入文章内容！');
          return false;
        }
        return true;
      };
      // 创建新文章
      const addArticle = (params: object) => {
        console.log(validate(params));

        // 先创建内容表获取内容id后，创建标题信息表
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

      const getTypes = () => {
        $http
          .getdiytypes()
          .then((res: any) => {
            if (res.errNo === 0) {
              types.value = res.data;
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // 提交编辑
      const updateArticle = (params: object) => {
        // console.log(params);

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
            const { title, body, author, type, article_id, tags } = res.data;
            forms.value = {
              title,
              author,
              type,
              article_id,
              tags: JSON.parse(tags),
            };
            let obj = document.querySelector('.ql-editor');
            if (obj) {
              obj.innerHTML = body;
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
        getTypes();
        editType();
      });

      return {
        types,
        forms,
        isEdit,
        handleSave,
        handleTagClose,
        showInput,
        handleInputConfirm,
        inputVisible,
        inputValue,
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
    .tags {
      display: flex;
      span {
        margin-right: 10px;
      }
      .input-new-tag {
        width: 100px;
      }
    }
  }
</style>
