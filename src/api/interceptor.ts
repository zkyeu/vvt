/*
 * @Author: your name
 * @Date: 2021-08-03 17:51:25
 * @LastEditTime: 2021-08-20 16:32:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/api/interceptor.ts
 */
/* eslint-disable */
import axios from 'axios';
import qs from 'qs'

axios.defaults.withCredentials = true;

// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(
  config => {
    if (
      config.method === 'post' &&
      config.headers['content-type'] !== 'multipart/form-data'
      // config.headers['content-type'] === 'multipart/form-data'
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(
  res => {
    const resData: any = res.data;
    const errCode: number | undefined = Number(resData.errNo);
    if (errCode === 0) {
      return Promise.resolve(resData);
    } else {
      return Promise.reject(resData);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

export default axios;
