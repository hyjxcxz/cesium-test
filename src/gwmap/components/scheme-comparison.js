import store from '../../store'

const comparisonLayer = {}

let schemeCompareModule = null

comparisonLayer.enter = function(hasTerrain) {
  comparisonLayer.exit()
  if (!schemeCompareModule) {
    schemeCompareModule = new WindEarth.SchemeCompareModule(gwmap.viewer, {
      hasTerrain: true
    })
    schemeCompareModule.enterSchemeCompare()
  }
  schemeCompareModule && schemeCompareModule.mouseMoveEvent.addEventListener((event) => {
    console.log(event)
    // console.log('鼠标悬停重叠风机信息：', event)
    if (event.infos.length > 0) {
      store.commit('mouseMoveList', event)
    } else {
      store.commit('mouseMoveList', {
        infos: [],
        pos: {
          x: 0,
          y: 0
        }
      })
    }
  })
  schemeCompareModule.clickEvent.addEventListener(event => {
    if (event.id && event.isShow) {
      store.commit('comparisonDetalisData', event)
    } else {
      store.commit('comparisonDetalisData', null)
    }
  })
}

comparisonLayer.addScheme = function(checked, item, data) {
  if (checked) {
    schemeCompareModule.createSchemeTurbines(item.scheme_id, {
      imgUrl: item.imgUrl,
      color: item.color
    }, data)
  }
  setTimeout(() => {
    schemeCompareModule && schemeCompareModule.setSchemeTurbineLabelVisible(item.scheme_id, checked)
  }, 500)
}
comparisonLayer.removeScheme = function(scheme_id) {
  schemeCompareModule.removeSchemeTurbines(scheme_id)
}
comparisonLayer.locationLayer = function() {
  if (!schemeCompareModule) return
  schemeCompareModule.locationLayer()
}
// 单个方案的标签开关
comparisonLayer.layerFlag = function(scheme_id, checked) {
  if (!schemeCompareModule) return
  schemeCompareModule.setSchemeTurbineLabelVisible(scheme_id, checked)
}


comparisonLayer.exit = function() {
  if (!schemeCompareModule) return
  schemeCompareModule.exitSchemeCpmpare()
  schemeCompareModule = null
}


export default comparisonLayer