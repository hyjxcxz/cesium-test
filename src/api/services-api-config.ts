// 后台管理接口
export const servicesApiPathConfigs = {
  // 服务管理
  getServerList: { // 列表
    url: '/serverInfo/getServerList',
    method: 'post'
  },
  registServer: { // 服务注册
    url: '/serverInfo/registServer',
    method: 'post'
  },
  updateServerInfo: { // 修改服务
    url: '/serverInfo/updateServerInfo',
    method: 'put'
  },
  getServerDetails: { // 获取单个服务详情
    url: '/serverInfo/getServerDetails?id={0}',
    method: 'get'
  },
  deleteServerInfo: { // 删除服务
    url: '/serverInfo/deleteServerInfo?id={0}',
    method: 'delete'
  },
  getServerSimpleList: { // 获取简版本服务列表
    url: '/serverInfo/getServerSimpleList',
    method: 'get'
  },
  // 应用管理
  getProjectInfoList: { // 列表
    url: '/apiKey/getProjectInfoList',
    method: 'post'
  },
  applyKey: { // 申请服务key
    url: '/apiKey/apply',
    method: 'post'
  },
  updateProjectInfo: { // 更新应用
    url: '/apiKey/updateProjectInfo',
    method: 'put'
  },
  getProjectDetail: { // 获取项目详情
    url: '/apiKey/getProjectDetail?projectId={0}',
    method: 'get'
  },
  deleteProjectInfo: { // 删除项目应用
    url: '/apiKey/deleteProjectInfo?id={0}',
    method: 'delete'
  },
  // 登录
  login: {
    url: '/user/login',
    method: 'post'
  },
  addUser: { // 注册
    url: '/user/addUser',
    method: 'post'
  },
  userLogout: { // 注销 逻辑有问题暂时不接
    url: '/user/logout',
    method: 'get'
  }
}
