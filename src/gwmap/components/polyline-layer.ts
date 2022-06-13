import { store } from '@/store/index'
import gwmap from '../index'
declare const WindEarth: any

const polylineLayer:any = {}

const layers: any = {}
let featureEntityLayer: any = null
let layerType:string = ''

polylineLayer.load = function (opt:any) {
  layerType = opt.type
  polylineLayer.mewLayer(layerType)
  // polylineLayer.mapClick(layerType, (data: any) => {
  //   callback(data)
  // })
  polylineLayer.addLineLayer(opt)
}

polylineLayer.mewLayer = function (type:string) {
  if (!featureEntityLayer && gwmap.viewer) {
    featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'type'
    })
  }
}
// 点击地图要素
polylineLayer.mapClick = function (type:string, callback:any) {
  const layer = layers[type]
  layer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, function (e: any) { // MOUSE_MOVE
    if (!e.feature || !e.position) {
      const obj: any = {}
      callback(obj)
    } else {
      const data:any = {
        arr: [], // 数据
        x: e.position.x, // 位置
        y: e.position.y
      }
      if (e.feature.constructor === Array) { // 处理聚合多个数据
        e.feature.forEach((item: any) => {
          if (layer.id === item.styleOptions.data.type) {
            data.arr.push(item.styleOptions.data)
          }
        })
        callback(data)
      } else {
        if (e.feature.styleOptions && e.feature.styleOptions.data) {
          if (layer.id === e.feature.styleOptions.data.type) {
            data.arr.push(e.feature.styleOptions.data)
          }
          callback(data)
        }
      }
    }

    layer.bindRotateEventFunc(function (res: any) {
      const type = res.feature.styleOptions.data.type
      if (layer.id === type) {
        const storeApp:any = store.state.app
        const List = storeApp[type + 'clickFanList']
        if (!List.arr || List.arr.length <= 0) return
        const obj = {
          x: res.position.x,
          y: res.position.y
        }
        callback(Object.assign(List, obj))
      }
    })
  })
}
// 加载图层

polylineLayer.addLineLayer = function (opt: any) {
  const positions = opt.data
    ? opt.data
    : [
        [[115.028495718, 30.200814617, 0],
          [110.795000473, 32.638540762, 0],
          [111.267729446, 30.698151246, 0],
          [112.126643144, 32.058588576, 0],
          [114.885884938, 30.395401912, 0]],
        [[112.190419415, 31.043949588, 0],
          [113.903569642, 30.932054050, 0],
          [112.226648859, 30.367904255, 0],
          [114.861716770, 30.468634833, 0]],
        [[114.317846048, 29.848946148, 0],
          [113.371985426, 31.704988330, 0],
          [109.468884533, 30.289012191, 0],
          [113.414585069, 30.368350431, 0],
          [112.892742589, 30.409306203, 0],
          [113.160853710, 30.667483468, 0],
          [110.670643354, 31.748540780, 0]]
      ]
  if (!layers[opt.type] && gwmap.viewer) {
    positions.forEach((element: any) => {
      opt.positions = element
      polylineLayer.addLine(opt)
    })
  }
}
polylineLayer.addLine = function (opt: any) {
  const positions = opt.positions
    ? opt.positions
    : [[115.028495718, 30.200814617, 0],
        [110.795000473, 32.638540762, 0],
        [111.267729446, 30.698151246, 0],
        [112.126643144, 32.058588576, 0],
        [114.885884938, 30.395401912, 0],
        [112.190419415, 31.043949588, 0],
        [113.903569642, 30.932054050, 0],
        [112.226648859, 30.367904255, 0],
        [114.861716770, 30.468634833, 0],
        [114.317846048, 29.848946148, 0],
        [113.371985426, 31.704988330, 0],
        [109.468884533, 30.289012191, 0],
        [113.414585069, 30.368350431, 0],
        [112.892742589, 30.409306203, 0],
        [113.160853710, 30.667483468, 0],
        [110.670643354, 31.748540780, 0]]
  const polylineLayer = new WindEarth.PolylineFeatureEntity({
    // id: opt.id ? opt.id : '',
    // name: opt.layerName ? opt.layerName : opt.type,
    description: '',
    positions,
    styleOptions: {
      width: opt.width ? opt.width : 3,
      color: opt.color ? opt.color : '#ffffaaff',
      clampToGround: opt.clampToGround ? opt.clampToGround : false
    }
  })
  // layers[opt.type] = polylineLayer
  featureEntityLayer.addFeatureEntity(polylineLayer)
  // gwmap.viewer.flyTo(polylineLayer.entity)
}

// 清除图层
polylineLayer.remove = function (type: string, callback:any) {
  const layer = layers[type]
  if (layers[type]) {
    layer.removeFromViewer()
    layers[type] = null
    const obj: any = {}
    callback(obj)
  }
}
polylineLayer.removeAll = function () {
  featureEntityLayer.removeAll()
}
export default polylineLayer
