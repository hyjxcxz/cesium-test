import { store } from '@/store/index'
import gwmap from '../index'
declare const WindEarth: any

const pointLayer:any = {}

const layers: any = {}
let layerType:string = ''

pointLayer.load = function (opt:any, callback:any) {
  layerType = opt.type
  pointLayer.mewLayer(layerType)
  if (opt.cluster) {
    pointLayer.cluster()
  }
  pointLayer.mapClick(layerType, (data: any) => {
    callback(data)
  })
  pointLayer.addLayer(opt.data)
}

pointLayer.mewLayer = function (type:string) {
  if (!layers[type] && gwmap.viewer) {
    const featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: type
    })
    layers[type] = featureEntityLayer
  }
}
// 聚合功能
pointLayer.cluster = function () {
  const layer = layers[layerType]
  const pixelRange = 6
  const minimumClusterSize = 2 // 聚合的个数
  const pinBuilder = new WindEarth.PinBuilder()
  layer.clustering.enabled = true
  layer.clustering.pixelRange = pixelRange
  layer.clustering.minimumClusterSize = minimumClusterSize
  layer.clustering.clusterEvent.addEventListener(function (clusteredEntities:any, cluster:any) {
    cluster.label.show = false
    cluster.billboard.show = true
    cluster.billboard.id = cluster.label.id
    cluster.billboard.disableDepthTestDistance = 1000000000000
    cluster.billboard.verticalOrigin = WindEarth.VerticalOrigin.BOTTOM
    cluster.billboard.image = pinBuilder.fromText('' + (clusteredEntities.length), WindEarth.Color.fromCssColorString('rgba(141,166,176,0.8)'), 36).toDataURL()
  })
}
// 点击地图要素
pointLayer.mapClick = function (type:string, callback:any) {
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
pointLayer.addLayer = function (pointData:any) {
  pointData.forEach((item:Object) => {
    pointLayer.add(item)
  })
}
// 增加单个要素
pointLayer.add = function (data:any) {
  if (!data) {
    return
  }
  const layer = layers[layerType]
  data.type = layerType
  const featureEntity = new WindEarth.BillboardFeatureEntity({
    name: '' + data.id,
    id: data.id,
    positions: [data.longitude, data.latitude, 0],
    styleOptions: {
      url: '/images/' + layerType + 'fan.svg',
      heightReference: 1,
      scale: 1,
      // width: 52,
      // height: 62,
      width: 44,
      height: 68,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1, 4000000, 0.65),
      distanceDisplayCondition: {
        near: 3500, // 最近显示距离
        far: 20000000 // 最远显示距离
      },
      data
    }
  })
  layer && layer.addFeatureEntity(featureEntity)
}
// 清除图层
pointLayer.remove = function (type: string, callback:any) {
  const layer = layers[type]
  if (layers[type]) {
    layer.removeFromViewer()
    layers[type] = null
    const obj: any = {}
    callback(obj)
  }
}
export default pointLayer
