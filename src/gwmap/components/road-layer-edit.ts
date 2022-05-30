// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const roadLayerEdit:any = {}
let roadLineModule:any = null
let featureEntityLayer:any = null
let featureEntityCircle:any = null
let editFeatureEntityHelperCircle:any = null
// let roadKmlLayer:any = null

roadLayerEdit.load = function (data:any) {
  roadLayerEdit.remove()
  if (!data) return
  if (!roadLineModule) {
    roadLineModule = new WindEarth.RoadLineModule(gwmap.viewer)
    // 道路颜色
    roadLineModule.defaultStyle.lineStyle.material = WindEarth.Color.fromCssColorString('#fff')
    roadLineModule && roadLineModule.parseJsonData(data)
  }
}

roadLayerEdit.roadColor = function (color = { color: '#fff' }) {
  roadLineModule && roadLineModule.changeRoadProperty(color)
  if (roadLineModule) {
    roadLineModule.defaultStyle.lineStyle.material = WindEarth.Color.fromCssColorString(color.color)
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

roadLayerEdit.zoomToLayer = function (t:any, r:any, pitRoadMin:any, pitRoadMax:any) {
  let num = null
  if (pitRoadMin && pitRoadMax) {
    const distance:any = getVarXY(pitRoadMin[0], pitRoadMin[1], pitRoadMax[0], pitRoadMax[1])
    num = Number((distance[0] + 8000))
  }
  roadLineModule && roadLineModule.layerLocation({
    duration: 0,
    offset: new WindEarth.HeadingPitchRange(0, t || -0.4, r || num || 0)
  })
  // roadLineModule && roadLineModule.layerLocation()
}
roadLayerEdit.showHide = function (visible:any) {
  roadLineModule && roadLineModule.setLineVisible(visible)
}

roadLayerEdit.remove = function () {
  roadLineModule && roadLineModule.removeAll(false)
  if (roadLineModule) roadLineModule = null
}
// 开启编辑模式
roadLayerEdit.startEdit = function () {
  roadLineModule && roadLineModule.startEdit()
}
// 新增加点
roadLayerEdit.addNode = function () {
  // store.commit('active', true)  // 没有编辑功能
  roadLineModule && roadLineModule.createNewLine()
  roadLineModule && roadLineModule.addNewEndEvent.addEventListener((res:any) => {
    // store.commit('active', false)
  })
}

// 节点编辑
roadLayerEdit.nodeEdit = function () {
  roadLineModule && roadLineModule.setEditMode(1)
}
// 打断节点
roadLayerEdit.breakEdit = function () {
  roadLineModule && roadLineModule.setEditMode(5)
}
// 合并节点
roadLayerEdit.combineNode = function () {
  roadLineModule && roadLineModule.setEditMode(6)
  // roadLineModule && roadLineModule.setEditMode(new WindEarth.EditMode.COMBINE)
}
// 删除节点
roadLayerEdit.delEdit = function () {
  let id:any = null
  if (roadLineModule) {
    roadLineModule.setEditMode(2)
    // roadLineModule.setEditMode(new WindEarth.EditMode.DELETE)
    const deleteEvent = function (event:any) {
      if (id !== event.feature.id) {
        id = event.feature.id
        const res = confirm('您确定要删除该段道路?')
        return res
      } else {
        id = null
        return false
      }
    }
    roadLineModule.removeListener('onDeleted')
    roadLineModule.addListener('onDeleted', deleteEvent)
  }
}

// 回滚
roadLayerEdit.rollBack = function (data = {}) {
  roadLineModule && roadLineModule.rollBack(data)
}
// 查询是否存在编辑
roadLayerEdit.getStatus = function () {
  if (roadLineModule) {
    return roadLineModule.getChangedStatus()
  }
}
// 停止编辑
roadLayerEdit.stopEdit = function () {
  roadLineModule && roadLineModule.stopEdit()
}

// 保存
roadLayerEdit.saveEdit = function () {
  if (roadLineModule) {
    return roadLineModule.submitChange()
  }
}
// 保存好更新三维
roadLayerEdit.updateEdit = function (newDataJson:any) {
  if (!newDataJson) return
  roadLineModule.updateScene(newDataJson)
}

// 定位起始点（包含移动和实时回传点位坐标）
roadLayerEdit.locationStartPoint = function (data:any) {
  if (!data || (!data.lon && data.lon !== 0) || (!data.lat && data.lat !== 0)) {
    return
  }
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
    id: 'roadStartPointLayer'
  })

  const TerrainSampleTool:any = new WindEarth.TerrainSampleTool(gwmap.viewer.scene.globe.terrainProvider)
  TerrainSampleTool.getMostDetailHeights([[data.lon, data.lat, 0]]).then((res: any[][]) => {
    featureEntityCircle = new WindEarth.BillBoardFeatureEntity({
      id: 'roadStartPointCircle',
      positions: [data.lon, data.lat, res[0][2]],
      // point: {
      //   color: WindEarth.Color.YELLOW.withAlpha(0.8),
      //   pixelSize: 10,
      //   outlineColor: WindEarth.Color.RED.withAlpha(0.8),
      //   outlineWidth: 2,
      //   heightReference: 1
      // }
      styleOptions: {
        url: '/images/pinpoint.png',
        heightReference: 0,
        scale: 1,
        color: '#8883FF',
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    })
    featureEntityLayer.addFeatureEntity(featureEntityCircle)

    gwmap.viewer.flyToLocation([data.lon, data.lat], {
      duration: 0,
      offset: new WindEarth.HeadingPitchRange(0, -1, 1000)
    })
    roadLayerEdit.startCircle = () => {
      if (!editFeatureEntityHelperCircle) {
        editFeatureEntityHelperCircle = new WindEarth.EditFeatureEntityHelper(gwmap.viewer)
        // console.log(editFeatureEntityHelperCircle)
        editFeatureEntityHelperCircle.setFeatureEntityEditMode(featureEntityLayer.getFeatureEntityById('roadStartPointCircle'), true)
        setTimeout(() => {
          roadLayerEdit.moveCircle()
        }, 200)
      }
    }
    gwmap.roadLayerEdit.startCircle()
  })
}

// 编辑圆点
roadLayerEdit.moveCircle = function () {
  editFeatureEntityHelperCircle && editFeatureEntityHelperCircle.setEditMode(1)
  editFeatureEntityHelperCircle && editFeatureEntityHelperCircle.moveEndEvent.addEventListener(function (event:any) {
    if (!event) return
    console.log(event.entity.coord)
    // store.commit('roadStartPoint', {
    //   lat: event.entity.coord[1],
    //   lon: event.entity.coord[0]
    // })
  })
}

// 移除圆点
roadLayerEdit.removeCircle = function () {
  editFeatureEntityHelperCircle && editFeatureEntityHelperCircle.setEditMode(1)
  if (!featureEntityLayer) {
    return
  }
  featureEntityLayer.removeAll()
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
  editFeatureEntityHelperCircle = null
  featureEntityCircle = null
}

export default roadLayerEdit
