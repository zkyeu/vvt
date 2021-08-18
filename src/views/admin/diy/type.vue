<!--
 * @Author: your name
 * @Date: 2021-08-18 08:54:25
 * @LastEditTime: 2021-08-18 18:12:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/diy/type.vue
-->
<template>
  <section class="content">
    <ul>
      <li v-for="item in 10" :key="item">
        <div>分类1</div>
        <div>
          <div>
            <span>12312</span>
            <span>12312</span>
            <span>12312</span>
            <span>12312</span>
            <span>12312</span>
          </div>
          <el-input v-model="sort" size="mini"></el-input>
        </div>
      </li>
    </ul>
    <div class="operate">
      <span>添加分类</span>
      <span>更新排序</span>
    </div>
    <el-dialog :title="previewData" v-model="layerShow" width="400px">
      <div> </div>
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
  import { ref, defineComponent, computed, reactive, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { key } from '../../../store';
  import { useGlobalConfig, formatDateTime } from '../../../utils/util';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Config',
    setup: () => {
      const store = useStore(key);
      const itemButton = computed(() => store.state.adminConfig);
      const { $http, $confirm, $message } = useGlobalConfig();
      const sort = ref(1);
      const layerShow = ref(false);
      const previewData = ref({});

      const handleOperate = (v: string, id: any) => {
        console.log(v, id);
      };
      onMounted(() => {});

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        itemButton,
        sort,
        previewData,
        layerShow,
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

    li {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      padding: 0 10px;
      background: #f5f5f5;
      height: 30px;
      span {
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: rgb(46, 2, 244);
        }
      }
      & > div {
        display: flex;
        align-items: center;
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
  }
</style>
