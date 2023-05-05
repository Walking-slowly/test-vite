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
            name: 'Table',
            id: 100,
            url: 'setting',
            icon: 'setting'
          },
          {
            name: '表单',
            id: 101,
            url: 'test',
            icon: 'menu',
            children: [
              {
                name: '表单-1',
                id: 101-1,
                url: 'from',
                icon: '',
              },
              {
                name: '测试页面-2',
                id: 101-2,
                url: 'test-2',
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
