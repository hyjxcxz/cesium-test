import { store } from '@/store/index'
import gwmap from '../index'
declare const WindEarth: any

const fanLayer:any = {}

let featureEntityLayer:any = null
let featureEntity = null
let arr:any = []

fanLayer.load = function () {
  fanLayer.remove()
  if (!featureEntityLayer && gwmap.viewer) {
    featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'fan'
    })

    // 聚合功能
    const pixelRange = 6
    const minimumClusterSize = 2 // 聚合的个数
    const pinBuilder = new WindEarth.PinBuilder()
    featureEntityLayer.clustering.enabled = true
    featureEntityLayer.clustering.pixelRange = pixelRange
    featureEntityLayer.clustering.minimumClusterSize = minimumClusterSize
    featureEntityLayer.clustering.clusterEvent.addEventListener(function (clusteredEntities:any, cluster:any) {
      cluster.label.show = false
      cluster.billboard.show = true
      cluster.billboard.id = cluster.label.id
      cluster.billboard.disableDepthTestDistance = 1000000000000
      cluster.billboard.verticalOrigin = WindEarth.VerticalOrigin.BOTTOM
      cluster.billboard.image = pinBuilder.fromText('' + (clusteredEntities.length), WindEarth.Color.fromCssColorString('rgba(141,166,176,0.8)'), 36).toDataURL()
    })

    // 点击图标事件
    featureEntityLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, function (e:any) { // MOUSE_MOVE
      if (!e.feature || !e.position) {
        store.commit('app/changeClickFanList', [])
      } else {
        const data:any = {
          arr: [], // 数据
          x: e.position.x, // 位置
          y: e.position.y
        }
        if (e.feature.constructor === Array) { // 处理聚合多个数据
          e.feature.forEach((item: any) => {
            data.arr.push(item.styleOptions.data)
          })
          store.commit('app/changeClickFanList', data)
        } else {
          data.arr.push(e.feature.styleOptions.data)
          store.commit('app/changeClickFanList', data)
        }
      }

      featureEntityLayer.bindRotateEventFunc(function (res:any) {
        if (!store.state.app.clickFanList.arr || store.state.app.clickFanList.arr.length <= 0) return
        const obj = {
          x: res.position.x,
          y: res.position.y
        }
        store.commit('app/changeClickFanList', Object.assign(store.state.app.clickFanList, obj))
      })
    })
  }
}

fanLayer.add = function (data:any) {
  if (!data) {
    return
  }
  featureEntity = new WindEarth.BillboardFeatureEntity({
    name: '' + data.id,
    id: data.id,
    positions: [data.longitude, data.latitude, 0],
    styleOptions: {
      url: '/images/fan.svg',
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
  featureEntityLayer && featureEntityLayer.addFeatureEntity(featureEntity)
  arr.push(featureEntity)
}

fanLayer.remove = function () {
  if (!featureEntityLayer) {
    return
  }
  for (let i = 0; i <= arr; i++) {
    featureEntityLayer.removeFeatureEntity(arr[i])
  }
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
  featureEntity = null
  arr = []
}
export default fanLayer
