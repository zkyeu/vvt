/*
 * @Author: your name
 * @Date: 2021-12-31 20:36:14
 * @LastEditTime: 2022-01-13 18:54:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vvt/src/utils/formatdate
 */
const formatDate = (v: any) => {
  let date = new Date(v);
  if (!date || !(date instanceof Date)) return '';
  const y = date.getFullYear();
  let m: any = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d: any = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h: any = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute: any = date.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  let second: any = date.getSeconds();
  second = second < 10 ? `0${second}` : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
}
export default formatDate;