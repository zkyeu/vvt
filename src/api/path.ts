/*
 * @Author: your name
 * @Date: 2021-08-03 17:45:46
 * @LastEditTime: 2021-08-20 17:01:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/api/path.ts
 */
const apiList = {
  get: {
    getuserinfo: '/commander/user/getuserinfo', // 用户信息
    gettasklist: '/commander/util/gettasklist', // 任务列表
    getUser: '/get/user',
    getarticle: '/get/article',
    getarticlelist: '/get/articlelist',
    gettypes: '/get/gettypes',
    getdiytypes: '/get/getdiytypes',
    getinfo: '/get/getinfo',
  },
  post: {
    submitmarkdata: '/commander/util/submitmarkdata', // 标注提交
    deletetask: '/commander/util/deletetask', // 删除任务
    createarticle: '/get/createarticle',
    deletearticle: '/get/deletearticle',
    updatearticle: '/get/updatearticle',
    addtypes: '/get/addtypes',
    deletetype: '/get/deletetype',
    updatetype: '/get/updatetype',
    updateinfo: '/get/updateinfo'
  },
  file: {
    uploadfile: '/commander/api/uploadfile'
    // ...
  }
};
export default apiList;
