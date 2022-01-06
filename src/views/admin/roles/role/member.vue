<!--
 * @Author: your name
 * @Date: 2021-08-22 13:55:07
 * @LastEditTime: 2021-12-31 00:41:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/views/admin/diy/role/member.vue
-->
<template>
  <section class="member">
    <template v-if="!true">
      <div class="no-member">
        <p>头像</p>
        <p>没有成员</p>
        <p>选择角色成员</p>
      </div>
    </template>
    <template v-else>
      <h1 class="btn-operate" v-if="roles.indexOf('roles') < 0">
        <div>文字性信息</div>
        <div class="operate">
          <el-input v-model="openid" placeholder="请输入查询id" @blur="fetchUser" clearable />
          <el-button size="mini">调整小组</el-button>
          <el-button size="mini" type="primary" @click="handleOperate('add', 0)"
            >添加成员</el-button
          >
        </div>
      </h1>
      <el-table
        ref="multipleTable"
        :data="userData"
        tooltip-effect="dark"
        style="width: 100%"
        class="list"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <template v-for="item in listTitle" :key="item.date">
          <el-table-column
            v-if="item.value !== 'operate' && item.value !== 'avatarUrl'"
            :label="item.label"
          >
            <template #default="scope">
              <span
                v-if="item.value === 'nickName'"
                @click="handleOperate('view', scope.row.id)"
                class="hover"
              >
                {{ scope.row[item.value] }}
              </span>
              <span v-else>
                {{ scope.row[item.value] }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.value === 'avatarUrl'"
            :prop="item.value"
            :label="item.label"
            width="80"
          >
            <template #default="scope">
              <img class="photo" :src="scope.row[item.value]" />
            </template>
          </el-table-column>
          <el-table-column v-else :prop="item.value" :label="item.label" width="180">
            <template #default="scope">
              <span
                v-for="o in scope.row.operate"
                :key="o.type"
                @click="handleOperate(o.type, scope.row.id)"
                class="hover operate"
              >
                {{ o.name }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>
    <el-dialog :title="previewData.title" v-model="layerShow" width="400px">
      <div class="layer-style">
        <template v-if="previewData.curType === 'add' || previewData.curType === 'edit'">
          <el-form ref="form" :model="previewData.curItem" label-width="100px">
            <el-form-item label="用户名：">
              <el-input
                v-model="previewData.curItem['userid']"
                placeholder="请输入用户ID"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input
                v-model="previewData.curItem['realname']"
                placeholder="请输入姓名"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input
                v-model="previewData.curItem['phone']"
                placeholder="请输入手机号"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="电子邮件：">
              <el-input
                v-model="previewData.curItem['email']"
                placeholder="请输入电子邮件："
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-if="previewData.curType === 'view'">
          <li>
            <label>用户名：</label>
            <span>{{ previewData.info.userid }}</span>
          </li>
          <li>
            <label>姓名：</label>
            <span>{{ previewData.info.realname }}</span>
          </li>
          <li>
            <label>电话：</label>
            <span>{{ previewData.info.phone }}</span>
          </li>
          <li>
            <label>email：</label>
            <span>{{ previewData.info.email }}</span>
          </li>
        </template>
        <template v-if="previewData.curType === 'delete'">
          确定要删除：【{{ previewData.info['realname'] }} 】吗？</template
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleOperate('concel', 0)">取消</el-button>
          <el-button type="primary" @click="handleOperate('confirm', 0)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
  // 组件引用部分========
  import { ref, defineComponent, computed, onMounted, getCurrentInstance } from 'vue';
  import { useStore } from 'vuex';
  import { useGlobalConfig, formatDateTime } from '../../../../utils/util';
  import { ElMessage } from 'element-plus';
  import { log } from 'console';

  // 代码逻辑开始========
  export default defineComponent({
    name: 'Member',
    setup: () => {
      const { $http, $confirm, $message } = useGlobalConfig();
      const layerShow = ref(false);
      const roles = ref('');
      // const router = computed({})
      const previewData: any = ref({
        title: '',
        curType: '',
        curItem: {},
        info: {},
      });
      const listTitle = [
        {
          value: 'id',
          label: 'ID',
        },
        {
          value: 'nickName',
          label: '昵称',
        },
        {
          value: 'avatarUrl',
          label: '头像',
        },
        {
          value: 'openid',
          label: 'openId',
        },
        {
          value: 'gender',
          label: '性别',
        },
        {
          value: 'create_time',
          label: '注册时间',
        },
        {
          value: 'phone',
          label: '手机',
        },
        {
          value: 'operate',
          label: '操作',
        },
      ];
      const userData = ref([]);
      const openid = ref('');
      const curUser = (id: any) => {
        return JSON.parse(
          JSON.stringify(
            userData.value.filter((item: any) => {
              if (item.id == id) {
                return true;
              }
            })[0]
          )
        );
      };

      const handleOperate = (v: any, id: any) => {
        if (v !== 'confirm') {
          previewData.value.curType = v;
          layerShow.value = true;
        }
        switch (v) {
          case 'view':
            previewData.value.title = '查看用户';
            previewData.value.info = curUser(id);
            break;
          case 'edit':
            previewData.value.title = '编辑用户';
            previewData.value.curItem = curUser(id);
            break;
          case 'add':
            previewData.value.title = '添加用户';
            break;
          case 'delete':
            previewData.value.title = '删除用户';
            previewData.value.info = curUser(id);
            break;
          case 'add':
            previewData.value.title = '信息预览';
            break;
          case 'concel':
            concel();
            break;
          case 'confirm':
            const { curType, info } = previewData.value;
            if (curType === 'add') {
              addItem();
            } else if (curType === 'edit') {
              editItem(info.id);
            } else if (curType === 'delete') {
              deleteItem(info.id);
            }
            break;
          case 'change':
            break;
          default:
        }
      };

      const concel = () => {
        layerShow.value = false;
        previewData.value = {
          title: '',
          curType: '',
          curItem: {},
          info: {},
        };
      };

      // edit
      const editItem = (id: any) => {
        let params = previewData.value.curItem;
        delete params.operate;
        $http
          .updatewechatuser({
            id: id,
            ...params,
          })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              concel();
              getItem();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // delete
      const deleteItem = (id: any) => {
        $http
          .deleteuser({ id: id })
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              concel();
              getItem();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // add
      const addItem = () => {
        let { curItem } = previewData.value;
        $http
          .addadminuser(curItem)
          .then((res: any) => {
            if (res.errNo === 0) {
              $message.success(res.message);
              concel();
              getItem();
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // 获取
      const getItem = () => {
        $http
          .getwechatuser()
          .then((res: any) => {
            if (res.errNo === 0) {
              userData.value = res.data;
            }
          })
          .catch((err: any) => {
            $message.error(err);
          });
      };

      // 获取筛选用户
      const fetchUser = () => {
        $http
          .filteruser({ openid: openid.value })
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
        getItem();
        const { proxy }: any = getCurrentInstance();
        roles.value = proxy.$router.currentRoute.value.path;
      });

      return {
        layerShow,
        listTitle,
        userData,
        handleOperate,
        previewData,
        roles,
        openid,
        fetchUser,
      };
    },
  });
</script>

<style lang="less" scoped>
  .member {
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
      flex-direction: column;
      .photo {
        width: 38px;
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
    }
    .btn-operate {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      background: #eee;
      font-weight: 400;
      .operate {
        display: flex;
        width: 400px;
      }
    }
    .layer-style {
    }
  }
</style>
