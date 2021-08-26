<!--
 * @Author: your name
 * @Date: 2021-08-25 17:34:09
 * @LastEditTime: 2021-08-26 20:28:53
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
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Pages',
    emits: ['sizeChange', 'currentChange'],
    props: {
      total: {
        // 总数
        type: Number,
        default: 0,
      },
      currentPage: {
        //当前页
        type: Number,
        default: 0,
      },
      pageSize: {
        type: Number,
        default: 0,
      },
      pageSizes: {
        // 单页数量
        type: Array,
        default: () => [],
      },
    },
    setup: (props, context) => {
      const handleSizeChange = (val: any) => {
        console.log(val, 'page');

        context.emit('sizeChange', {
          rn: val,
          pn: 1,
        });
      };
      const handleCurrentChange = (val: any) => {
        console.log(val, 'page');
        context.emit('currentChange', {
          pn: val,
        });
      };

      return {
        handleSizeChange,
        handleCurrentChange,
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
