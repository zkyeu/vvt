<!--
 * @Author: your name
 * @Date: 2021-08-02 19:39:43
 * @LastEditTime: 2021-08-24 11:49:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/a.vue
-->
<template>
  <section class="members">
    <template v-if="!true">
      <div class="no-member">
        <p>头像</p>
        <p>没有成员</p>
        <p>选择角色成员</p>
      </div>
    </template>
    <template v-else>
      <Member />
    </template>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';
  import { ElMessage } from 'element-plus';
  import { log } from 'console';
  import Router from '../../../router';
  import Member from './role/member.vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Persons',
    components: { Member },
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const layerShow = ref(false);
      const userData = ref([]);

      const listTitle = [
        {
          value: 'id',
          label: 'ID',
        },
        {
          value: 'title',
          label: '姓名',
        },
        {
          value: 'createtime',
          label: '手机/邮箱',
        },
        {
          value: 'operate',
          label: '操作',
        },
      ];

      const handleOperate = (v: any, id: any) => {
        console.log(v, id);
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
          .getuser()
          .then((res: any) => {
            if (res.errNo === 0) {
              userData.value = res.data;
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      onMounted(() => {
        // getTypes();
      });

      return {
        listTitle,
        userData,
        handleOperate,
      };
    },
  });
</script>

<style lang="less" scoped>
  .members {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    & > div {
      display: flex;
      flex-direction: column;
      height: calc(~'100vh - 193px');
    }

    .no-member {
      justify-content: center;
      align-items: center;
    }
    .list {
      // justify-content: space-between;
      flex-direction: column;
      // li {
      //   display: flex;
      //   justify-content: space-between;
      //   height: 50px;
      //   line-height: 50px;
      //   border-bottom: #ddd solid 1px;
      // }
    }
    .btn-operate {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      background: #eee;
      font-weight: 400;
    }
  }
</style>
