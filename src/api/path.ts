/*
 * @Author: your name
 * @Date: 2021-08-03 17:45:46
 * @LastEditTime: 2021-12-31 00:41:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/api/path.ts
 */
const apiList = {
  get: {
    getuserinfo: '/commander/user/getuserinfo', // 用户信息
    gettasklist: '/commander/util/gettasklist', // 任务列表
    getwechatuser: '/apiv1/getwechatuser',
    getarticle: '/apiv1/get/article',
    gettypes: '/apiv1/get/gettypes',
    getdiytypes: '/apiv1/get/getdiytypes',
    getinfo: '/apiv1/get/getinfo',
  },
  post: {
    getarticlelist: '/apiv1/get/articlelist',
    submitmarkdata: '/commander/util/submitmarkdata', // 标注提交
    deletetask: '/commander/util/deletetask', // 删除任务
    createarticle: '/apiv1/get/createarticle',
    deletearticle: '/apiv1/get/deletearticle',
    updatearticle: '/apiv1/get/updatearticle',
    addtypes: '/apiv1/get/addtypes',
    addwechatuser: '/apiv1/addwechatuser',
    addadminuser: '/apiv1/get/addadminuser',
    updatewechatuser: '/apiv1/updatewechatuser',
    deleteuser: '/apiv1/get/deleteuser',
    deletetype: '/apiv1/get/deletetype',
    updatetype: '/apiv1/get/updatetype',
    updateinfo: '/apiv1/get/updateinfo',
    filteruser: '/apiv1/filteruser'
  },
  file: {
    uploadfile: '/commander/api/uploadfile'
    // ...
  }
};
export default apiList;
