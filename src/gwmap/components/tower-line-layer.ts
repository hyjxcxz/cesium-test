// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const towerLineLayer:any = {}
let towerLineModule:any = null
towerLineLayer.load = function (data:any) {
  towerLineLayer.remove()
  if (!data) return
  if (!towerLineModule) {
    towerLineModule = new WindEarth.CollectLineModule(gwmap.viewer, '/models/')
    // towerLineModule.defaultLineColor = 'red'
    towerLineModule && towerLineModule.parseJsonData(data)
    towerLineModule.arcLineStyle = {
      width: 0.1
    }
  }
}

function getVarXY (lon1:any, lat1:any, lon2:any, lat2:any) {
  const varx = getSurfaceDistance(lon1, lat1, lon2, lat1) * (lon2 - lon1 >= 0 ? 1 : -1)
  const vary = getSurfaceDistance(lon1, lat1, lon1, lat2) * (lat2 - lat1 >= 0 ? 1 : -1)
  console.log(`${varx}|${vary}`)
  return [varx, vary]
}

function getSurfaceDistance (lon1:any, lat1:any, lon2:any, lat2:any) {
  const distance = new WindEarth.EllipsoidGeodesic(WindEarth.Cartographic.fromDegrees(lon1, lat1, 0), WindEarth.Cartographic.fromDegrees(lon2, lat2, 0)).surfaceDistance
  if (isNaN(distance)) return 'NaN'
  return distance
}

towerLineLayer.zoomToLayer = function (t:any, r:any, pitRoadMin:any, pitRoadMax:any) {
  let num = null
  if (pitRoadMin && pitRoadMax) {
    const distance = getVarXY(pitRoadMin[0], pitRoadMin[1], pitRoadMax[0], pitRoadMax[1])
    num = Number((distance[0] + 8000))
  }
  towerLineModule && towerLineModule.layerLocation({
    duration: 0,
    offset: new WindEarth.HeadingPitchRange(0, t || -0.4, r || num || 0)
  })
  // towerLineModule && towerLineModule.layerLocation()
}
towerLineLayer.showHide = function (visible:any) {
  towerLineModule && towerLineModule.setLineVisible(visible)
}

towerLineLayer.remove = function () {
  towerLineModule && towerLineModule.removeAll(false)
  if (towerLineModule) towerLineModule = null
}
// 开启编辑模式
towerLineLayer.startEdit = function () {
  towerLineModule && towerLineModule.startEdit()
}
// 新增加点
towerLineLayer.addNode = function () {
  towerLineModule && towerLineModule.removeListener('onDeleted')
  towerLineModule && towerLineModule.createNewLine()
}
// 节点编辑
towerLineLayer.nodeEdit = function () {
  towerLineModule && towerLineModule.removeListener('onDeleted')
  towerLineModule && towerLineModule.setEditMode(1)
}
// 打断节点
towerLineLayer.breakEdit = function () {
  towerLineModule && towerLineModule.removeListener('onDeleted')
  towerLineModule && towerLineModule.setEditMode(5)
}
// 合并节点
towerLineLayer.combineNode = function () {
  towerLineModule && towerLineModule.removeListener('onDeleted')
  towerLineModule && towerLineModule.setEditMode(6)
}
// 删除节点
towerLineLayer.delEdit = function () {
  if (towerLineModule) {
    towerLineModule.setEditMode(2)
    const deleteEvent = function (event:any) {
      const res = confirm('您确定要删除该段道路?')
      return res
    }
    towerLineModule.addListener('onDeleted', deleteEvent)
  }
}

// 回滚
towerLineLayer.rollBack = function (data = {}) {
  towerLineModule && towerLineModule.rollBack(data)
}
// 查询是否存在编辑
towerLineLayer.getStatus = function () {
  if (towerLineModule) {
    return towerLineModule.getChangedStatus()
  }
}
// 停止编辑
towerLineLayer.stopEdit = function () {
  towerLineModule && towerLineModule.removeListener('onDeleted')
  towerLineModule && towerLineModule.stopEdit()
}

// 保存
towerLineLayer.saveEdit = function () {
  if (towerLineModule) {
    return towerLineModule.submitChange()
  }
}
// 保存好更新三维
towerLineLayer.updateEdit = function (newDataJson:any) {
  if (!newDataJson) return
  towerLineModule.updateScene(newDataJson)
}

export default towerLineLayer
