import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/getMenuListBySubsystem',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            name: 'Table',
            id: 100,
            url: 'setting',
            icon: 'el-setting',
          },
          {
            name: '表单',
            id: 101,
            url: 'test',
            icon: 'icon-yuan',
            children: [
              {
                name: '表单-1',
                id: 101 - 1,
                url: 'from',
                keepAlive: 1,
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101 - 2,
                url: 'test-2',
                icon: '',
              },
            ],
          },
        ],
        message: '操作成功',
      };
    },
  },
  {
    url: '/getList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            date: '1111',
            name: 1111,
            address: '测试测试测试测试',
          },
          {
            date: '2222',
            name: 2222,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
          {
            date: '3333',
            name: 3333,
            address: '测试测试测试测试',
          },
        ],
        message: '操作成功',
      };
    },
  },
] as MockMethod[];
