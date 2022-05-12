
import store from '../../store'
import { isArray } from 'util';
const fanLayer = {}

let featureEntityLayer = null
let featureEntity = null
let arr = []

fanLayer.load = function() {
  fanLayer.remove()
  if (!featureEntityLayer) {
    featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'fan'
    })

    // const pixelRange = 6
    // const minimumClusterSize = 2
    // const pinBuilder = new WindEarth.PinBuilder()
    // featureEntityLayer.clustering.enabled = true
    // featureEntityLayer.clustering.pixelRange = pixelRange
    // featureEntityLayer.clustering.minimumClusterSize = minimumClusterSize
    // featureEntityLayer.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
    //   cluster.label.show = false
    //   cluster.billboard.show = true
    //   cluster.billboard.id = cluster.label.id
    //   cluster.billboard.disableDepthTestDistance = 1000000000000
    //   cluster.billboard.distanceDisplayCondition = {
    //     near: 40000, // 最近显示距离
    //     far: 20000000 // 最远显示距离
    //   }
    //   cluster.billboard.verticalOrigin = WindEarth.VerticalOrigin.BOTTOM
    //   cluster.billboard.image = pinBuilder.fromText('' + (clusteredEntities.length), WindEarth.Color.fromCssColorString('rgba(141,166,176,0.8)'), 36).toDataURL()
    // })

    featureEntityLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, function(e) {
      if (!e.feature || !e.position) {
        store.commit('clickEarthFan', null)
      } else {
        const obj = {}
        obj.x = e.position.x
        obj.y = e.position.y
        obj.id = e.feature._id ? e.feature._id : false
        obj.projectArr = isArray(e.feature) ? e.feature : false
        if (typeof (obj.id) == 'string') {
          store.commit('clickEarthFan', null)
        } else {
          store.commit('clickEarthFan', obj)
        }
        // console.log(arr)
      }
      featureEntityLayer.bindRotateEventFunc(function(res) {
        if (!store.state.earthFan.clickEarthFan) return
        if (store.state.earthFan.clickEarthFan.id == res.feature._id) {
          const obj = {}
          obj.x = res.position.x
          obj.y = res.position.y
          obj.id = e.feature._id ? e.feature._id : false
          obj.projectArr = isArray(e.feature) ? e.feature : false
          if (typeof (obj.id) == 'string') {
            store.commit('clickEarthFan', null)
          } else {
            store.commit('clickEarthFan', obj)
          }
        } else if (store.state.earthFan.clickEarthFan.projectArr) {
          const obj = {}
          obj.x = res.position.x
          obj.y = res.position.y
          obj.id = e.feature._id ? e.feature._id : false
          obj.projectArr = isArray(e.feature) ? e.feature : false
          if (typeof (obj.id) == 'string') {
            store.commit('clickEarthFan', null)
          } else {
            store.commit('clickEarthFan', obj)
          }
          // store.commit('clickEarthFan', Object.assign({
          //   x: res.position.x,
          //   y: res.position.y,
          // }, store.state.earthFan.clickEarthFan))
        }
      })
    })
  }
}

fanLayer.add = function(data) {
  if (!data) {
    return
  }
  featureEntity = new WindEarth.BillBoardFeatureEntity({
    name: '',
    id: data.project_id,
    positions: [data.longitude, data.latitude, 0],
    styleOptions: {
      url: '/images/fan.png',
      heightReference: 1,
      scale: 1,
      width: 52,
      height: 62,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1, 4000000, 0.65),
      distanceDisplayCondition: {
        near: 100000, // 最近显示距离
        far: 20000000 // 最远显示距离
      }
    }
  })
  featureEntityLayer.addFeatureEntity(featureEntity)
  arr.push(featureEntity)
}

fanLayer.remove = function() {
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
