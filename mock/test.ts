import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/getMenuListBySubsystem',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            name: '基础设置',
            id: 100,
            url: 'setting',
            icon: 'setting'
          },
          {
            name: '测试页面',
            id: 101,
            url: 'test',
            icon: '',
            children: [
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              },
              {
                name: '测试页面-1',
                id: 101-1,
                url: '/test-1',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: '/test-2',
                icon: ''
              }
            ]
          }
        ],
        message: '操作成功'
      }
    }
  }
] as MockMethod[]
