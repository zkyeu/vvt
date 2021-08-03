<!--
 * @Author: your name
 * @Date: 2021-08-02 20:10:38
 * @LastEditTime: 2021-08-03 17:37:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/components/baseLayer/left-nav.vue
-->
<template>
  <section class="left-navs">
    <el-menu
      :uniqueOpened="true"
      default-active="/"
      router
      class="left-nav-menu"
      background-color="#3e4660"
      text-color="rgb(202, 207, 222)"
      active-text-color="#00a8f3"
    >
      <template v-for="item in leftNavData">
        <el-menu-item :index="item.router" :key="item.router" v-if="!item.child">
          <i class="el-icon-setting"></i>
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

<script lang="ts">
  import { ref, defineComponent, computed, onMounted, getCurrentInstance } from 'vue';
  import { useStore } from 'vuex';
  import router from '../../router';
  import { key } from '../../store';

  export default defineComponent({
    name: 'LeftNav',
    setup: () => {
      const store = useStore(key);
      const leftNavData = computed(() => store.state.leftNav);

      onMounted(() => {
        // console.log(leftNavData.value);
        // const { proxy }: any = getCurrentInstance();
        // console.log(proxy.$router.currentRoute.value);
        // console.log(router.currentRoute.value);
        // console.log(Proxy);
      });

      return {
        leftNavData,
      };
    },
  });
</script>

<style lang="less" scoped>
  .left-navs {
    display: flex;
    width: 200px;
    min-height: calc(100vh - 50px);

    :deep(.left-nav-menu) {
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
        background: #343c53 !important;
      }
    }
  }
</style>
