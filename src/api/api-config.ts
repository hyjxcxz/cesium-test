export const apiPathConfigs = {
  // 基础数据服务
  // 开发指南菜单
  developGuide: {
    url: '/basedata/developGuide',
    method: 'get'
  },
  // 根据ID获取API文档
  apiDocument: {
    url: '/basedata/apiDocument?id={0}',
    method: 'get'
  },
  // 实用工具查询
  utilities: {
    url: '/basedata/utilities?id={0}',
    method: 'get'
  },
  // 分析决策数据服务
  // 开发指南菜单
  analysisdevelopGuide: {
    url: '/analysis/developGuide',
    method: 'get'
  },
  // 根据ID获取API文档
  analysisapiDocument: {
    url: '/analysis/apiDocument?id={0}',
    method: 'get'
  },
  // 实用工具查询
  analysisutilities: {
    url: '/analysis/utilities?id={0}',
    method: 'get'
  },
  // 地图服务
  // 开发指南菜单
  mapdevelopGuide: {
    url: '/map/developGuide',
    method: 'get'
  },
  // 根据ID获取API文档
  mapapiDocument: {
    url: '/map/apiDocument?id={0}',
    method: 'get'
  }
}
