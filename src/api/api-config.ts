export const apiPathConfigs = {
  // 获取全部风场基础数据
  getbaseInfos: {
    url: '/windfarm/baseInfos?projectName={0}&projectNo={1}',
    method: 'get'
  },
  // 获取全部风场基础数据
  getWindfarmDetail: {
    url: '/windfarm/detail?id={0}',
    method: 'get'
  }
}
