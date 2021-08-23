<!--
 * @Author: your name
 * @Date: 2021-08-18 08:54:25
 * @LastEditTime: 2021-08-21 19:19:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/diy/type.vue
-->
<template>
  <section class="content">
    <ul>
      <li v-for="item in types" :key="item.id">
        <div class="type">{{ item.typename }}</div>
        <div>{{ item.show === '1' ? '显示' : '隐藏' }}</div>
        <div>
          <div class="operate-item">
            <span v-for="o in item.operate" :key="o.type" @click="handleOperate(o.type, item)">{{
              o.name
            }}</span>
          </div>

          <el-input v-model="item.typesort" size="mini"></el-input>
        </div>
      </li>
    </ul>
    <div class="operate">
      <span @click="handleOperate('add', {})">添加分类</span>
      <span @click="handleOperate('sort', {})">更新排序</span>
    </div>
    <el-dialog :title="previewData.title" v-model="layerShow" width="400px">
      <div>
        <template v-if="curType === 'add' || curType === 'edit'">
          <el-form ref="form" :model="curItem.value" label-width="100px">
            <el-form-item label="分类名称：">
              <el-input
                v-model="curItem['typename']"
                placeholder="请输入分类名称"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类别名：">
              <el-input
                v-model="curItem['aliasname']"
                placeholder="请输入别名(限英文)"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示：">
              <el-radio v-model="curItem['show']" label="1">是</el-radio>
              <el-radio v-model="curItem['show']" label="2">否</el-radio>
            </el-form-item>
            <el-form-item label="分类顺序：">
              <el-input
                v-model="curItem['typesort']"
                placeholder="请输入分类序号"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="curType === 'delete'">
          确定要删除分类：【{{ curItem['typename'] }} 】吗？</template
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleOperate('concel', 0)">取消</el-button>
          <el-button type="primary" @click="handleOperate('confirm', 0)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { log } from 'console';
  import { ref, defineComponent, computed, reactive, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../../../store';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Type',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const sort = ref(1);
      const layerShow = ref(false);
      const previewData: any = ref({});
      const types: any = ref([]);
      const curType = ref('');
      const curItem: any = ref({});

      const handleOperate = (v: string, item: any) => {
        if (v !== 'confirm') {
          curType.value = v;
          curItem.value = JSON.parse(JSON.stringify(item));
        }
        condition(v);
      };
      // operate condition
      const condition = (v: any) => {
        switch (v) {
          case 'view':
            break;
          case 'edit':
            layerShow.value = true;
            previewData.value = {
              title: '编辑分类',
            };
            break;
          case 'delete':
            layerShow.value = true;
            previewData.value = {
              title: '删除确认',
            };
            break;
          case 'add':
            layerShow.value = true;
            previewData.value = {
              title: '添加分类',
            };
            break;
          case 'sort':
            $message.warning('暂不支持该功能');
            break;
          case 'concel':
            consel();
            break;
          case 'confirm':
            let type = curType.value;
            if (type === 'add') {
              const { typename, show } = curItem.value;
              if (typename && show) {
                addType();
              }
            } else if (type === 'delete') {
              deleteType(curItem.value.id);
            } else if (type === 'edit') {
              editType();
            }

            break;
          default:
        }
      };

      // concel
      const consel = () => {
        layerShow.value = false;
        previewData.value = {};
        curType.value = '';
      };

      // view
      const viewType = (id: any) => {
        console.log(id);
      };

      // view
      const editType = () => {
        let params = curItem.value;
        $http
          .updatetype({
            id: params.id,
            typename: params.typename,
            show: params.show,
            typesort: params.typesort,
            aliasname: params.aliasname,
          })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              consel();
              getTypes();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // view
      const deleteType = (id: any) => {
        $http
          .deletetype({ id: id })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              consel();
              getTypes();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // view
      const addType = () => {
        let params = curItem.value;
        $http
          .addtypes({
            typename: params.typename,
            typesort: types.value.length + 1,
            show: params.show,
            aliasname: params.aliasname,
          })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              consel();
              getTypes();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // view
      const sortType = (id: any) => {
        console.log(id);
      };

      // 获取分类
      const getTypes = () => {
        $http
          .gettypes()
          .then((res: any) => {
            if (res.errNo === 0) {
              types.value = res.data;
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      onMounted(() => {
        getTypes();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        sort,
        previewData,
        layerShow,
        handleOperate,
        types,
        curType,
        curItem,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: block;
    padding: 15px;
    .router-link-active {
      background: #3587f3;
      color: #fff !important;
    }

    .type {
      width: 150px;
      // background: #ddd;
    }

    li {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      padding: 0 10px;
      background: #f8f8f8;
      height: 30px;
      & > div {
        display: flex;
        align-items: center;
      }
    }
    .operate-item {
      min-width: 150px;
      display: flex;
      span {
        display: block;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: rgb(46, 2, 244);
        }
      }
    }
    .operate {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
      span {
        width: 80px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 2px;
        background: #f1f1f1;
        margin-right: 10px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
        &:hover {
          cursor: pointer;
          background: #3587f3;
          color: #fff;
        }
      }
    }
    :deep(.el-input--mini) {
      width: 55px;
      .el-input__inner {
        height: 20px;
        line-height: 20px;
      }
    }
  }
</style>
