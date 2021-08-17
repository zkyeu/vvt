/*
 * @Author: your name
 * @Date: 2021-08-04 10:18:00
 * @LastEditTime: 2021-08-17 09:44:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
; * @FilePath: /vvt/src/utils/util.ts
 */
/* eslint-disable import/prefer-default-export */
import { getCurrentInstance, ComponentInternalInstance } from 'vue';

export function useGlobalConfig() {
  const internalInstance: any = getCurrentInstance();
  return internalInstance.appContext.config.globalProperties;
}

export function useGlobalInstance() {
  return getCurrentInstance() as ComponentInternalInstance;
}

export function formatDateTime(date: any) {
  if (!date || !(date instanceof Date)) return '';
  const y = date.getFullYear();
  let m: string | number = date.getMonth() + 1;
  m = m < 10 ? `0${m}` : m;
  let d: string | number = date.getDate();
  d = d < 10 ? `0${d}` : d;
  let h: string | number = date.getHours();
  h = h < 10 ? `0${h}` : h;
  let minute: string | number = date.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  let second: string | number = date.getSeconds();
  second = second < 10 ? `0${second}` : second;
  return `${y}-${m}-${d} ${h}:${minute}:${second}`;
}

/**
 * latex公式渲染
 * @param nextTick  vue的nextTick方法
 * @param dom       渲染latex的dom元素
 */
export function latexRender(nextTick: any, dom: any) {
  nextTick(() => {
    const win: any = window;
    win.MathJax.Hub.Queue(['Typeset', win.MathJax.Hub, dom]);
  });
}
