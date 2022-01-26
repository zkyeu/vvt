<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2022-01-26 16:02:23
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
  import Quill from 'quill';
  import { useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import Router from '../../../router';
  import axios from 'axios';
  let toolbarOptions = [
    // {
    //   handlers: {
    //     image: (v) => {
    //       if (v) {
    //         //上传成功回调
    //       } else {
    //         // 取消
    //       }
    //     },
    //   },
    // },
    { header: [1, 2, 3, 4, 5, 6, false] },
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'image',
    'clean',
    { align: [] },
    // { font: [] },
    { color: [] },
    { background: [] },
    'blockquote',
    'code-block',
    { list: 'ordered' },
    { list: 'bullet' },
    { script: 'sub' },
    { script: 'super' },
    { indent: '-1' },
    { indent: '+1' },
    { direction: 'rtl' },
  ];

  // 代码逻辑开始========
  export default defineComponent({
    name: 'AddItem',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const forms: any = ref({
        title: '',
        body: '',
        author: 'MBA21081班',
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
      const qEditor = ref();

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
        // 先创建内容表获取内容id后，创建标题信息表
        $http
          .createarticle({ ...params })
          .then((res: any) => {
            ElMessage.success({
              message: res.message,
              type: 'success',
            });
            if (res.errNo === 0) {
              Router.replace('/admin/article');
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

      // 按钮处理
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
          // params['create_time'] = formatDateTime(new Date());
          params['tags'] = JSON.stringify(params['tags']);
          validate(params);
          if (validate(params)) {
            addArticle(params);
          }
        }
      };

      // 编辑器
      const editorTool = () => {
        if (!document.querySelector('#editor')) {
          return false;
        }
        qEditor.value = new Quill('#editor', {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions,
          },
        });
        // var html = qEditor.value.container.firstChild.innerHTML;
        // var content: any = document.querySelector("textarea[name='content']");
        // console.log('-->', content);
        // content.innerHTML = html;

        // qEditor.value.on('text-change', function (delta, oldDelta, source) {
        //   content.innerHTML = qEditor.value.container.firstChild.innerHTML;
        // });
        var toolbar = qEditor.value.getModule('toolbar');
        // console.log('==>', toolbar);
        // toolbar.addHandler('image');
        toolbar.addHandler('image', function () {
          var fileInput = qEditor.value.container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute(
              'accept',
              'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
            );
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', function () {
              if (fileInput.files != null && fileInput.files[0] != null) {
                var formData = new FormData();
                formData.append('file', fileInput.files[0]);
                axios({
                  url: '/apiv1/uploadfile',
                  method: 'POST',
                  data: formData,
                  headers: { 'content-type': 'multipart/form-data' },
                }).then(function (res: any) {
                  //你的图片上传成功后的返回值...所以格式由你来定!
                  console.log(res);
                  var range = qEditor.value.getSelection(true);
                  qEditor.value.insertEmbed(range.index, 'image', res.url);
                  qEditor.value.setSelection(range.index + 1);
                });
              }
            });
            qEditor.value.container.appendChild(fileInput);
          }
          fileInput.click();
        });
      };

      onMounted(() => {
        editorTool();
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
        validate,
        editorTool,
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
