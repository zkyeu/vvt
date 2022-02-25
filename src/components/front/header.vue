<!--
 * @Author: your name
 * @Date: 2021-08-02 20:47:46
 * @LastEditTime: 2022-02-25 18:47:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/header.vue
-->
<template>
  <div class="layer-header">
    <div class="content-body">
      <div class="logo" @click="home"><img src="../../assets/logo.png" /></div>
      <Nav />
      <div class="right-block">
        <div class="search">
          <el-input
            v-model="searchKey"
            placeholder="请输入搜索信息"
            :prefix-icon="Search"
            clearable
            size="middle"
            @change="search"
          />
        </div>
        <div class="user-center">user center2</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Nav from '@/components/front/nav.vue';
  import router from '../../router';
  import { Search } from '@element-plus/icons-vue';

  export default defineComponent({
    name: 'headers',
    components: { Nav },
    setup: (props, context) => {
      const home = () => {
        router.push('/');
      };
      const searchKey = ref('');
      const search = () => {
        console.log(searchKey.value);
        context.emit('toSearch', searchKey.value);
      };

      return {
        home,
        Nav,
        search,
        searchKey,
        Search,
      };
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 40px;
    }
  }
  .layer-header {
    padding: 0 20px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 1px 5px #eee;
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .right-block {
    display: flex;
    align-items: center;
    .search {
      display: flex;
      width: 190px;
      height: 28px;
      padding: 0 3px;
      line-height: 28px;
      border-radius: 15px;
      margin-right: 20px;
      /deep/ .el-input__inner {
        font-size: 12px;
      }
    }
    .user-center {
      width: 34px;
      height: 34px;
      border-radius: 20px;
      border: #ddd solid 1px;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .content-body {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (min-width: 1201px) {
    .content-body {
      width: 1200px;
    }
  }
  @media screen and (max-width: 1200px) {
    .content-body {
      width: 800px;
    }
  }
  /* 设置了涉猎器宽度不大于1200px时 abc 显示900px宽度 */

  @media screen and (max-width: 800px) {
    .content-body {
      width: 700px;
    }
  }
</style>
