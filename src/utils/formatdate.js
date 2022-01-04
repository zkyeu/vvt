/*
 * @Author: your name
 * @Date: 2021-12-31 20:36:14
 * @LastEditTime: 2021-12-31 20:44:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/utils/formatdate.js
 */
const formatDate = (v) => {
  let date = new Date(v);
  if (!date || !(date instanceof Date)) return '';
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d= date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h= date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute= date.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  let second= date.getSeconds();
  second = second < 10 ? `0${second}` : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
}
 export default formatDate;