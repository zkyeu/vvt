<!--
 * @Author: your name
 * @Date: 2021-08-18 08:54:25
 * @LastEditTime: 2021-08-23 09:45:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/diy/roles.vue
-->

<template>
  <section class="role-content">
    <div class="left">
      <div class="create-item">
        <p>新增角色</p>
        <p>新建分组</p>
      </div>
      <el-tree
        class="item-list"
        :data="data"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
      </el-tree>
      <!--  -->
    </div>
    <div class="right">
      <div class="right-header">
        <h1>产品经理</h1>
        <span>这里是描述信息内容文字</span>
      </div>
      <Member />
    </div>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { log } from 'console';
  import { ref, defineComponent, computed, reactive, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../../../store';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';
  import Member from './role/member.vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Type',
    components: { Member },
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const data: Array<any> = [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
            },
            {
              id: 9,
              label: '三级 1-1-1',
            },
            {
              id: 10,
              label: '三级 1-1-2',
            },
          ],
        },

        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ];

      const handleDragStart = (node: any, ev: any) => {
        console.log('drag start', node);
      };
      const handleDragEnter = (draggingNode: any, dropNode: { label: any }, ev: any) => {
        console.log('tree drag enter: ', dropNode.label);
      };
      const handleDragLeave = (draggingNode: any, dropNode: { label: any }, ev: any) => {
        console.log('tree drag leave: ', dropNode.label);
      };
      const handleDragOver = (draggingNode: any, dropNode: { label: any }, ev: any) => {
        console.log('tree drag over: ', dropNode.label);
      };
      const handleDragEnd = (
        draggingNode: any,
        dropNode: { label: any },
        dropType: any,
        ev: any
      ) => {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      };
      const handleDrop = (draggingNode: any, dropNode: { label: any }, dropType: any, ev: any) => {
        console.log('tree drop: ', dropNode.label, dropType);
      };
      const allowDrop = (
        draggingNode: any,
        dropNode: { data: { label: string } },
        type: string
      ) => {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      };
      const allowDrag = (draggingNode: { data: { label: string | string[] } }) => {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      };

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
        // getTypes();
      });

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        data,
        handleDragStart,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDragEnd,
        handleDrop,
        allowDrop,
        allowDrag,
      };
    },
  });
</script>

<style lang="less" scoped>
  .role-content {
    display: flex;
    height: calc(~'100vh - 107px');
    // background: #e1f3d8;
    .left {
      padding: 6px 16px 0;
      width: 260px;
      overflow-y: auto;
      border-right: #ddd 1px solid;
      .create-item {
        display: flex;
        p {
          display: flex;
          align-items: center;
          background: #f8f8f8;
          height: 40px;
          cursor: pointer;
        }
      }
      .item-list {
        height: calc(~'100vh - 160px');
        // background: #f8f8f8;
        overflow-y: auto;
        :deep(.el-tree-node__content) {
          height: 40px;
          margin: 2px 0;
          &:hover {
            // background: #e7f9f6;
            background: #d9dfe8;
          }
        }
      }
    }

    .right {
      flex: 1;
      padding: 16px;
      background: #f8f8f8;
      .right-header {
        display: flex;
        align-items: center;
        height: 30px;
        background: #ddd;
        h1 {
          font-size: 16px;
        }
        span {
          font-size: 12px;
          color: #aaa;
          margin-left: 10px;
        }
      }
    }
    // .router-link-active {
    //   background: #3587f3;
    //   color: #fff !important;
    // }
  }
</style>
