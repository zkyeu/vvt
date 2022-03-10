<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:38
 * @LastEditTime: 2022-03-10 20:06:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/admin/left-nav.vue
-->
<template>
  <!-- background-color=""
      text-color=""
      -->
  <section class="left-navs">
    <el-menu
      :uniqueOpened="true"
      default-active="/"
      class="left-nav-menu"
      router
      active-text-color="#2483ff"
      @select="sele"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in leftNavData">
        <el-menu-item :index="item.router" :key="item.router" v-if="!item.child">
          <el-icon><location /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>

        <el-submenu :index="String(item.id)" :key="String(item.id)" v-else>
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="sub in item.child" :key="sub.router" :index="sub.router">{{
              sub.title
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </section>
</template>

<script lang="ts" setup>
  import { ref, defineComponent, computed, onMounted, getCurrentInstance } from 'vue';
  import { useStore } from 'vuex';
  import router from '../../router/index';
  import { key } from '../../store';
  import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';

  const store = useStore(key);
  const leftNavData = computed(() => store.state.leftNav);
  const therouter = (v: string) => {
    // activeRouter.value = v;
    router.push(v);
    // console.log(router.currentRoute.value.path);
  };
  const handleOpen = (key: any, keyPath: any) => {
    console.log(key, keyPath);
  };

  const handleClose = (key: any, keyPath: any) => {
    console.log(key, keyPath);
  };

  const sele = (key: any, keyPath: any) => {
    // console.log(key, keyPath);
    // router.push(key);
  };
  onMounted(() => {
    // console.log(leftNavData.value);
    const { proxy }: any = getCurrentInstance();
    router.push(proxy.$router.currentRoute.value.path);
    // console.log(router.currentRoute.value);
    // console.log(Proxy);
  });
</script>

<style lang="less" scoped>
  .left-navs {
    display: flex;
    width: 200px;
    min-height: calc(100vh - 50px);

    &:deep(.left-nav-menu) {
      width: 200px;
      .el-submenu__title,
      .el-menu-item {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        padding: 0;
      }
      .el-submenu [class^='el-icon-'],
      .el-menu-item [class^='el-icon-'] {
        margin-top: -1px;
      }
      .is-active {
        background: #e6f7ff !important;
        border-right: #2483ff solid 1px;
      }
    }
  }
</style>
