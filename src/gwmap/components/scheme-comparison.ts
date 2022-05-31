// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const comparisonLayer:any = {}

let schemeCompareModule:any = null

comparisonLayer.enter = function (hasTerrain:any) {
  comparisonLayer.exit()
  if (!schemeCompareModule) {
    schemeCompareModule = new WindEarth.SchemeCompareModule(gwmap.viewer, {
      hasTerrain: true
    })
    schemeCompareModule && schemeCompareModule.enterSchemeCompare()
  }
  // schemeCompareModule && schemeCompareModule.mouseMoveEvent.addEventListener((event) => {
  //   console.log(event)
  //   // console.log('鼠标悬停重叠风机信息：', event)
  //   if (event.infos.length > 0) {
  //     store.commit('mouseMoveList', event)
  //   } else {
  //     store.commit('mouseMoveList', {
  //       infos: [],
  //       pos: {
  //         x: 0,
  //         y: 0
  //       }
  //     })
  //   }
  // })
}

comparisonLayer.addScheme = function (checked:any, item:any, data:any) {
  // debugger
  if (checked) {
    schemeCompareModule.createSchemeTurbines(item.schemeId, {
      imgUrl: item.imgUrl,
      color: item.color
    }, data)
  }
  setTimeout(() => {
    schemeCompareModule && schemeCompareModule.setSchemeTurbineLabelVisible(item.schemeId, checked)
  }, 500)
}
comparisonLayer.removeScheme = function (schemeId:any) {
  schemeCompareModule.removeSchemeTurbines(schemeId)
}
comparisonLayer.locationLayer = function () {
  if (!schemeCompareModule) return
  schemeCompareModule.locationLayer()
}
// 单个方案的标签开关
comparisonLayer.layerFlag = function (schemeId:any, checked:any) {
  if (!schemeCompareModule) return
  schemeCompareModule.setSchemeTurbineLabelVisible(schemeId, checked)
}

comparisonLayer.exit = function () {
  if (!schemeCompareModule) return
  schemeCompareModule.exitSchemeCpmpare()
  schemeCompareModule = null
}

export default comparisonLayer
