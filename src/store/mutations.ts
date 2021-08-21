/*
 * @Author: your name
 * @Date: 2021-08-21 04:35:50
 * @LastEditTime: 2021-08-21 04:40:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/store/mutations.js
 */
export default mutations({
  addcount(state) {
    state.count++;
  },
  changename(state) {
    state.userName = 'liliang';
  }
});