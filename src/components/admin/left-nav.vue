<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:38
 * @LastEditTime: 2022-03-12 10:04:49
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
      <!-- <template v-for="item in leftNavData"> -->
      <template v-for="item in leftNav.data">
        <el-menu-item
          :index="item.router"
          :key="item.router"
          v-if="!item.child"
          class="first-class"
        >
          <el-icon><location /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>

        <el-sub-menu :index="String(item.id + 1000)" :key="String(item.id)" v-else>
          <template #title>
            <el-icon><location /></el-icon>
            <span class="first-class">{{ item.title }}222</span>
          </template>
          <el-menu-item-group>
            <template #title>
              <el-icon><location /></el-icon>
              <span>一级菜单</span>
            </template>
            <el-menu-item v-for="sub in item.child" :key="sub.router" :index="sub.router">{{
              sub.title
            }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </el-menu>

    <!-- <el-menu
      :uniqueOpened="true"
      default-active="/"
      class="left-nav-menu"
      router
      active-text-color="#2483ff"
      @select="sele"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>一级菜单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">菜单信息1-1</el-menu-item>
          <el-menu-item index="1-2">菜单信息1-2</el-menu-item>
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu> -->
  </section>
</template>

<script lang="ts" setup>
  import { ref, defineComponent, computed, onMounted, getCurrentInstance, reactive } from 'vue';
  import { useStore } from 'vuex';
  import router from '../../router/index';
  import { key } from '../../store';
  import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue';

  const store = useStore(key);
  const leftNavData = computed(() => store.state.leftNav);
  const leftNav = reactive({
    data: [
      {
        id: 5,
        title: '文章管理',
        router: '/admin/article',
        icon: 'el-icon-menu',
      },
      {
        id: 6,
        title: '基础配置',
        router: '',
        icon: 'el-icon-setting',
        child: [
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '后台首页',
            router: '/admin/diy',
            icon: 'el-icon-setting',
          },
          {
            id: 712,
            title: '站点配置',
            router: '/admin/diy/basic',
            icon: 'el-icon-setting',
          },
          {
            id: 713,
            title: '分类管理',
            router: '/admin/diy/type',
            icon: 'el-icon-setting',
          },
          {
            id: 714,
            title: '标签管理',
            router: '/admin/diy/tag',
            icon: 'el-icon-setting',
          },
        ],
      },
      {
        id: 7,
        title: '权限管理',
        router: '/admin/powers',
        icon: 'el-icon-setting',
        child: [
          {
            id: 71,
            title: '角色管理',
            router: '/admin/powers/roles',
            icon: 'el-icon-setting',
          },
          {
            id: 71,
            title: '人员管理',
            router: '/admin/powers/persons',
            icon: 'el-icon-setting',
          },
        ],
      },
    ],
  });
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
    height: calc(100vh - 52px);
    padding-top: 10px;
    overflow-y: auto;
    border-right: solid 1px #e6e6e6;

    &:deep(.left-nav-menu) {
      width: 200px;
      border: none;

      .el-sub-menu__title,
      .el-menu-item {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        padding: 0;
        &.is-active {
          background: #e6f7ff !important;
          border-right: #2483ff solid 1px;
        }
      }
      .el-sub-menu [class^='el-icon-'],
      .el-menu-item [class^='el-icon-'] {
        margin-top: -1px;
      }

      .el-menu-item-group__title {
        display: none;
      }
      .el-menu-item-group .el-menu-item {
        padding-left: 50px !important;
      }
      .first-class {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
</style>
