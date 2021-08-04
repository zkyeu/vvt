/*
 * @Author: your name
 * @Date: 2021-08-03 17:47:17
 * @LastEditTime: 2021-08-03 17:51:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vvt/src/api/index.ts
 */
/* eslint-disable */
import axios from './interceptor';
import apiList from './path';
import _ from 'lodash';
export const apis = _.mapValues(
    apiList,
    _.bind(_.mapValues, null, _, (v: any) => v)
);

// 查找请求类型及地址
const factory = (obj: {
    [key: string]: any;
}): { [key: string]: (...argv: object[]) => Promise<any> } => {
    const output: { [key: string]: any } = {};
    Object.entries(obj).forEach(([methodKey, apiMap]) => {
        Object.entries(apiMap).forEach(([apiKey, apiPath]) => {
            output[apiKey] = (data: object, args: object) => {
                switch (methodKey) {
                    case 'get':
                        return axios.get(`${apiPath}`, { params: data });
                    case 'post':
                        return axios.post(`${apiPath}`, data, args);
                    case 'file':
                        return axios.post(`${apiPath}`, data, {
                            headers: { 'content-type': 'multipart/form-data', ...args }
                        });
                    default:
                        return null;
                }
            };
        });
    });
    return output;
};

export default factory(apis);
