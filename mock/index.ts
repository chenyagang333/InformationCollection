// mock/index.ts
import type { MockMethod } from "vite-plugin-mock";  // ！！！看这里，这个MockMethod 是个类型，不是方法，导入的时候要type。要么就直接不导入，直接在文件中到处一个数组即可
import { Form } from '../src/types/Form';

const forms: Form[] = [
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20

  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: false,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
  {
    id: 0,
    userId: 1,
    title: 'JinnCollection',
    subTitle: '信息收集',
    publish: true,
    createTime: new Date().toDateString(),
    count: 20
  },
]
export default [
  // {
  //   url: "/api/getList",
  //   method: "post",
  //   response: () => {
  //     return logList;
  //   },
  // },
  {
    url: "/forms",
    method: "get",
    response: () => {
      return forms
    },
  },
] as MockMethod[];
