<!-- 公共组建文档 -->
# info-popup 风场详情弹窗及工厂详情弹传封装
  { // 数据结构要求
    title: '风场基本信息', // 表头展示内容
    class: 'default', // default 风场 factory 工厂 背景色改变
    data: [ // 渲染内容 高度自适应，样式不用调整
      {
        key: '风场名称：',
        value: '河北张家口风电场河北张家口风电场'
      }, {
        key: '位置：',
        value: '39.916527'
      }, {
        key: '行政区划：',
        value: '河北省张家口市'
      }, {
        key: '业主名称：',
        value: '张家口红松风场'
      }, {
        key: '状态：',
        value: '已建',
        status: true // 加上status 为true value字体颜色高量
      }, {
        key: '并网时间：',
        value: '20180324'
      }
    ]
  }
# el-dialog 样式
由于内容不确定性，只写了全局的大致样式，内容样式需要自己写