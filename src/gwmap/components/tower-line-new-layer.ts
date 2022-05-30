// import envConfig from '@/config/env-config'
// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const towerLineNewLayer:any = {}
let wireModule:any = null
let wireEditModule:any = null
// 加载线路
towerLineNewLayer.load = function (url:any) {
  towerLineNewLayer.remove()
  // console.log(envConfig.S3Path)
  wireModule = new WindEarth.WireModule(gwmap.viewer, 'envConfig.S3Path' + '/')
  const promise = wireModule.loadFile(url)
  promise.then((data:any) => {
    wireModule.parseData(data, { showModel: true, location: false })
  })

  wireModule.towerClickChanged.addEventListener(function (event:any) {
    console.log(event)
  })
  wireModule.routeClickChanged.addEventListener(function (event:any) {
    console.log(event)
  })

  setTimeout(() => {
    towerLineNewLayer.getLineListInfo()
  }, 2000)
}
// 获取支线列表数据
towerLineNewLayer.getLineListInfo = function () {
  if (!wireModule) return
  const info = wireModule.getLineListInfo()
  console.log(info)
  // console.log(info)
  // store.commit('setLineListInfo', null)
  // store.commit('setLineListInfo', info)
}
// 获取横断面数据
towerLineNewLayer.getLineCrossSection = function (entitiesId:any) {
  if (!wireModule || !entitiesId) return
  console.log(entitiesId) // 其中每一段线路的id
  const info = wireModule.getLineCrossSection(entitiesId)
  console.log(info)
}

// 开启编辑
towerLineNewLayer.startEdit = function () {
  if (!wireEditModule) {
    wireEditModule = new WindEarth.WireEditModule(gwmap.viewer, wireModule)
  }
  wireEditModule.startEditToolMode()
}
// 新增支线
towerLineNewLayer.addStake = function () {
  wireEditModule.startDrawStakeLine()
}
// 节点编辑
towerLineNewLayer.nodeEdit = function () {
  wireEditModule.startEditStakeLine()
}
// 打断节点
towerLineNewLayer.breakEdit = function () {
  wireEditModule.startSplitStakeLine()
}
// 合并桩位
towerLineNewLayer.combineNode = function () {
  wireEditModule.startCombineStakeLine()
}
// 删除节点
towerLineNewLayer.delEdit = function () {
  wireEditModule.startDeleteStakeLine({
    callBack: function (event:any) {
      // if(confirm('确认是否删除？')){
      wireEditModule.deleteStakeLineByEntity(event.entity)
      // }
    }
  })
}
// 退出编辑
towerLineNewLayer.exitEdit = function () {
  wireEditModule && wireEditModule.stopEditToolMode()
  wireEditModule = null
}
// 保存编辑
towerLineNewLayer.saveEdit = function () {
  wireEditModule.stopEditToolMode()
  return wireEditModule.getEditedStakeLine()
}

// 塔位编辑
towerLineNewLayer.towerEdit = function () {
  wireEditModule && wireEditModule.startEditTowerLine()
}

// 塔位保存
towerLineNewLayer.towerSave = function () {
  return wireEditModule && wireEditModule.getEditedTowerLine()
}

// 删除
towerLineNewLayer.remove = function () {
  if (!wireModule) return
  wireModule.removeAll()
}

export default towerLineNewLayer
