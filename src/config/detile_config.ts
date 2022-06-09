// 场区详情弹框数据
export const windFarmInfo = {
  title: '风场基本信息',
  class: 'default', // default 风场 factory 工厂
  data: [
    {
      key: '风场名称：',
      value: ''
    }, {
      key: '经度：',
      value: ''
    }, {
      key: '纬度：',
      value: ''
    }
    // {
    //   key: '行政区划：',
    //   value: '河北省张家口市'
    // }, {
    //   key: '业主名称：',
    //   value: '张家口红松风场'
    // }, {
    //   key: '状态：',
    //   value: '已建',
    //   status: true
    // }, {
    //   key: '并网时间：',
    //   value: '20180324'
    // }
  ],
  datas: [], // 聚合点位后的多个数据
  x: 0, // 弹窗定位位置
  y: 0,
  num: 216,
  maxnum: 240,
  id: 0
}
// 工厂信息
export const makerInfo = {
  title: '工厂信息',
  class: 'factory', // factory 工厂
  data: [
    {
      key: '工厂名称：',
      value: ''
    }, {
      key: '行政区划：',
      value: ''
    }, {
      key: '供货类型：',
      value: ''
    },
    {
      key: '产能信息：',
      value: '河北省张家口市'
    }, {
      key: '库存信息：',
      value: '张家口红松风场'
    }, {
      key: '发货部件数：',
      value: '已建',
      status: true
    }
  ],
  datas: [], // 聚合点位后的多个数据
  x: 0, // 弹窗定位位置
  y: 0,
  num: 300,
  maxnum: 324,
  id: 1
}
// 高压电站
export const electricStationInfo = {
  title: '高压电站信息',
  class: 'electricStation', // factory 工厂
  data: [
    {
      key: '高压电站：',
      value: ''
    }
  ],
  datas: [], // 聚合点位后的多个数据
  x: 0, // 弹窗定位位置
  y: 0,
  num: 180,
  maxnum: 180,
  id: 2
}
