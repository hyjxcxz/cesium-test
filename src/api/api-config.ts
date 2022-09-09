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
  // 面查询
  queryDataByPolygon: {
    url: 'basedata/queryDataByPolygon',
    method: 'post'
  },
  // 点查询
  queryDataByPoint: {
    url: '/basedata/queryDataByPoint?code={0}&lon={1}&lat={2}',
    method: 'get'
  },
  // 点查询
  queryAddressByPoint: {
    url: '/basedata/queryAddressByPoint?lon={0}&lat={1}',
    method: 'get'
  },
  // 实用工具查询
  utilities: {
    url: '/basedata/utilities?id={0}',
    method: 'get'
  }
}
