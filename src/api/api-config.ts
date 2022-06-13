export const apiPathConfigs = {
  // 获取全部风场基础数据
  getbaseInfos: {
    url: '/windfarm/baseInfos?projectName={0}&projectNo={1}',
    method: 'get'
  },
  // 获取单个风场基础数据 odoo_id
  getWindfarmDetail: {
    url: '/windfarm/detail?id={0}',
    method: 'get'
  }
}
