<!--
 * @Author: your name
 * @Date: 2021-08-02 20:47:46
 * @LastEditTime: 2022-03-08 11:27:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/header.vue
-->
<template>
  <div class="layer-header">
    <div class="content-body">
      <div class="logo" @click="home"
        ><img src="../../assets/logo.png" /> <h1 class="ys">MBA21081班</h1></div
      >
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
        <div class="user-center">
          <icon :data="photo"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Nav from '@/components/front/nav.vue';
  import router from '../../router';
  import { Search } from '@element-plus/icons-vue';
  import { useStore } from 'vuex';
  import { key } from '../../store';
  import photo from 'assets/svg/origin/user.svg';

  export default defineComponent({
    name: 'headers',
    components: { Nav },
    setup: (props, context) => {
      const store = useStore(key);
      const home = () => {
        router.push('/');
      };
      const searchKey = ref('');
      const search = () => {
        store.commit('toSearch', searchKey.value);
      };

      return {
        home,
        Nav,
        search,
        searchKey,
        Search,
        photo,
      };
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    img {
      width: 40px;
      margin-right: 10px;
      &:hover {
        position: absolute;
        width: 300px;
        top: 0;
        left: 0;
        background: #fff;
      }
    }
  }
  .layer-header {
    display: flex;
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
      color: #ddd;
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }

  .content-body {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ys {
    font-weight: 600;
    font-size: 26px;
    background: -webkit-linear-gradient(45deg, #1aced8, #e77a47, #e2ce67, #4510e4, #3073cf);
    color: transparent;
    -webkit-background-clip: text;
    animation: ran 20s linear infinite;
  }

  @keyframes ran {
    from {
      backgroud-position: 0 0;
    }
    to {
      background-position: 2000px 0;
    }
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
