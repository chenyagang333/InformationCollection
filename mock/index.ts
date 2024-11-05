// mock/index.ts
import type { MockMethod } from "vite-plugin-mock";  // ！！！看这里，这个MockMethod 是个类型，不是方法，导入的时候要type。要么就直接不导入，直接在文件中到处一个数组即可
import { Form } from '../src/types/Form';


const forms = (): Form[] => {
  return [
    {
      id: 1,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-danger)',
        label: '考试'
      },
    },
    {
      id: 2,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: false,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-warning)',
        label: '投票'
      },
    },
    {
      id: 3,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-primary)',
        label: '调查'
      },
    },
    {
      id: 4,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-danger)',
        label: '考试'
      },
    },
    {
      id: 5,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-warning)',
        label: '投票'
      },
    },
    {
      id: 6,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-primary)',
        label: '调查'
      },
    },
    {
      id: 7,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-danger)',
        label: '考试'
      },
    },
    {
      id: 8,
      userId: 1,
      title: 'JinnCollection',
      subTitle: '信息收集',
      publish: true,
      createTime: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      count: 20,
      type: {
        color: 'var(--el-color-warning)',
        label: '投票'
      },
    },
  ]
}

const applicationScenario = [
  {
    iconComponent: 'List',
    iconColor: 'var(--el-color-primary)',
    title: '调查',
    subTitle: '问卷调查',
    description: '问卷调查',
  },
  {
    iconComponent: 'Tickets',
    iconColor: 'var(--el-color-danger)',
    title: '考试',
    subTitle: '可抽题·防作弊·自动阅卷',
    description: '可抽题·防作弊·自动阅卷',
  },
  {
    iconComponent: 'TakeawayBox',
    iconColor: 'var(--el-color-warning)',
    title: '投票',
    subTitle: '图文视频·排行榜·投票墙 🗳',
    description: '图文视频·排行榜·投票墙 🗳',
  },
]

const createFormTemplate = [
  {
    title: '全部',
    list: [
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 3,
      },
    ]
  },
  {
    title: '大学生',
    list: [
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
      {
        title: '大学生消费情况调查问卷',
        count: 2,
      },
    ]
  },
]


export default [
  {
    url: "/getFormTemplate",
    method: "get",
    response: () => {
      return createFormTemplate;
    },
  },
  {
    url: "/getApplicationScenario",
    method: "get",
    response: () => {
      return applicationScenario;
    },
  },
  {
    url: "/forms",
    method: "get",
    response: () => {
      return forms()
    },
  },
] as MockMethod[];
