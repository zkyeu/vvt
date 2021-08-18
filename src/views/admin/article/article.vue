<!--
 * @Author: your name
 * @Date: 2021-08-03 17:32:56
 * @LastEditTime: 2021-08-18 16:30:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/default.vue
-->
<template>
  <section class="content">
    <div class="hanlde">
      <div>文章列表</div>
      <div>
        <router-link
          :to="'/admin/article/' + item.router"
          v-for="item in itemButton"
          :key="item.router"
          >{{ item.label }}</router-link
        >
      </div>
    </div>
    <div>
      <router-view />
    </div>
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
    name: 'Article',
    setup: () => {
      const store = useStore(key);
      const itemButton = computed(() => store.state.articleConfig);
      const { $http, $confirm, $message } = useGlobalConfig();
      const articleData = ref([]);

      const content = ref('');
      const listTitle = [
        {
          value: 'id',
          label: 'ID',
        },
        {
          value: 'title',
          label: '文章标题',
        },
        {
          value: 'author',
          label: '作者',
        },
        {
          value: 'createtime',
          label: '发布时间',
        },
        {
          value: 'typename',
          label: '分类',
        },
        {
          value: 'operate',
          label: '操作',
        },
      ];
      const articleList = ref([]);
      const multipleSelection = ref([]);

      const getArticleList = () => {
        $http
          .getarticlelist()
          .then((res: any) => {
            articleList.value = res;
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const createarticle = () => {
        $http
          .createarticle({
            title: '我是标题信息',
            content: '我内容信息',
            author: 'zhu',
            type: 2,
            typename: '221231322',
          })
          .then((res: any) => {
            articleData.value = res;
            console.log(res);
          })
          .catch((err: any) => {
            console.log(err);
          });
      };

      const handleSelectionChange = (val: any) => {
        // multipleSelection.value = val;
        val.map((item: any) => {
          console.log(item.name);
          // multipleSelection.value.push(item.name);
        });
      };

      const handleOperate = (v: string, id: any) => {
        console.log(v, id);
      };
      onMounted(() => {});

      // 返回当前页面所有使用的数据跟逻辑========
      return {
        itemButton,
      };
    },
  });
</script>

<style lang="less" scoped>
  .content {
    display: block;
    .hanlde {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f3f3f3;
      border-bottom: #ddd solid 1px;
      div:nth-child(1) {
        padding-left: 10px;
        font-weight: 700;
      }
      div:nth-child(2) {
        display: flex;
      }
      a {
        padding: 10px 15px;
        border-right: #ddd solid 1px;
        cursor: pointer;
        text-decoration: none;
        color: #555;
        &:hover {
          background: #3587f3;
          color: #fff;
        }
        &:last-child {
          border: none;
        }
      }
    }
    .hover {
      cursor: pointer;
      &:hover {
        color: rgb(46, 2, 244);
      }
    }
    .operate {
      padding-right: 15px;
    }
    .router-link-active {
      background: #3587f3;
      color: #fff !important;
    }
  }
</style>
