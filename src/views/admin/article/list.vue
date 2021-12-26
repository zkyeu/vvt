<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-12-26 00:36:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/default.vue
-->
<template>
  <section class="content">
    <el-table
      ref="multipleTable"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <template v-for="item in listTitle" :key="item.date">
        <el-table-column v-if="item.value !== 'operate'" :label="item.label">
          <template #default="scope">
            <span
              v-if="item.value === 'title'"
              @click="handleOperate('view', scope.row.id)"
              class="hover"
            >
              {{ scope.row[item.value] }}
            </span>
            <span v-else>
              {{ scope.row[item.value] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-else :prop="item.value" :label="item.label" width="180">
          <template #default="scope">
            <span
              v-for="o in scope.row.operate"
              :key="o.type"
              @click="handleOperate(o.type, scope.row.id)"
              class="hover operate"
            >
              {{ o.name }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <Page
      :total="total"
      :pageSizes="[2, 3, 4, 100]"
      :page-size="pageParams.rn"
      :current-page="pageParams.pn"
      @currentChange="pages"
      @sizeChange="sizes"
    />

    <!-- 文章详情 -->
    <el-dialog :title="previewData.title" v-model="layerShow" width="800px">
      <span v-html="previewData.body"></span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleOperate('edit', previewData.id)">编辑</el-button>
          <el-button type="primary" @click="handleOperate('confirm', previewData.id)"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, watch, reactive, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';
  import { ElMessage } from 'element-plus';
  import { log } from 'console';
  import Router from '../../../router';
  import Page from '../../../components/page.vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'ArticleList',
    components: { Page },
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const layerShow = ref(false);
      const loading = ref(true);
      const listTitle = [
        {
          value: 'id',
          label: 'ID',
        },
        {
          value: 'title',
          label: '文章标题',
        },
        {
          value: 'author',
          label: '作者',
        },
        {
          value: 'create_time',
          label: '发布时间',
        },
        {
          value: 'type',
          label: '分类',
        },
        {
          value: 'operate',
          label: '操作',
        },
      ];
      const articleList = ref([]);
      const dataList = computed(() => {
        return (articleList.value as any).map((item: any) => {
          const { createtime } = item;
          for (let i in item) {
            if (i === 'createtime') {
              item.createtime = formatDateTime(new Date(createtime));
            }
          }
          return item;
        });
      });
      const multipleSelection = ref([]);
      const previewData: any = ref({});
      const pageParams = reactive({
        pn: 1, // 当前页面
        rn: 20, // 单页显示数量
      });
      const total = ref(0);

      //分页开始
      const pages = (val: any) => {
        pageParams.pn = val.pn;
        console.log(val.pn, 'list');
      };
      const sizes = (val: any) => {
        console.log(val, 'list');

        pageParams.pn = val.pn;
        pageParams.rn = val.rn;
      };
      //分页结束

      // 获取列表
      const getArticleList = () => {
        let { pn, rn } = pageParams;
        loading.value = true;
        $http
          .getarticlelist({
            pn: pn,
            rn: rn,
          })
          .then((res: any) => {
            articleList.value = res.data;
            total.value = res.count;
            loading.value = false;
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 获取文章
      const getArticle = (id: any) => {
        $http
          .getarticle({ id: id })
          .then((res: any) => {
            previewData.value = res.data;
            // previewData.value.tags = JSON.parse(previewData.value.tags);
            layerShow.value = true;
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 删除item
      const deleteItem = (id: string) => {
        $http
          .deletearticle({
            id: id,
          })
          .then((res: any) => {
            console.log(res);
            ElMessage.success({
              message: res.message,
              type: 'success',
            });
            getArticleList();
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      // 编辑
      const toEdit = (id: any) => {
        Router.push({
          path: '/admin/article/add',
          query: {
            isEdit: 1,
            id: id,
          },
        });
      };

      const handleSelectionChange = (val: any) => {
        // multipleSelection.value = val;
        val.map((item: any) => {
          console.log(item.name);
          // multipleSelection.value.push(item.name);
        });
      };

      // 按钮处理

      const handleOperate = (v: string, id: any) => {
        console.log(v, id);
        switch (v) {
          case 'view':
            getArticle(id);
            break;
          case 'edit':
            layerShow.value = false;
            toEdit(id);
            break;
          case 'delete':
            deleteItem(id);
            break;
          case 'confirm':
            layerShow.value = false;
            break;
          default:
        }
      };

      onMounted(() => {
        //获取文章
        getArticleList();
      });

      watch(pageParams, (v) => {
        getArticleList(); // 获取文章
      });

      return {
        listTitle,
        handleSelectionChange,
        handleOperate,
        dataList,
        layerShow,
        previewData,
        pages,
        total,
        sizes,
        pageParams,
        loading,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: block;

    .hover {
      cursor: pointer;
      &:hover {
        color: rgb(46, 2, 244);
      }
    }
    .operate {
      padding-right: 15px;
    }
  }
</style>
