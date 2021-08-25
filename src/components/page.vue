<!--
 * @Author: your name
 * @Date: 2021-08-25 17:34:09
 * @LastEditTime: 2021-08-25 21:27:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/page.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-08-25 17:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/default.vue
-->
<template>
  <section class="pages">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 100, 200, 300, 400]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, onMounted } from 'vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Pages',
    props: {
      count: Number,
    },
    setup: (props, context) => {
      console.log(props.count);
      //分页开始
      const currentPage = ref(1);
      const pageSize = ref(10);
      const handleSizeChange = (val: any) => {
        pageSize.value = val;
        context.emit('pageSize', {
          pageSize: pageSize.value,
          currentPage: 1,
        });
      };
      const handleCurrentChange = (val: any) => {
        currentPage.value = val;
        context.emit('pages', {
          currentPage: currentPage.value,
        });
      };

      onMounted(() => {});

      return {
        handleSizeChange,
        handleCurrentChange,
        currentPage,
        pageSize,
      };
    },
  });
</script>

<style lang="less" scoped>
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    // background: #eee;
  }
</style>
