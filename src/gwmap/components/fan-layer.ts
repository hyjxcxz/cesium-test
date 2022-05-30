
// import store from '@/store'
// import envConfig from '@/config/env-config'
import gwmap from '../index'
declare const WindEarth: any
const fanLayer:any = {}

let featureEntityLayer:any = null
let featureEntity = null
let arr:any = []

fanLayer.load = function () {
  fanLayer.remove()
  if (!featureEntityLayer) {
    featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'fan'
    })

    // const pixelRange = 6
    // const minimumClusterSize = 1
    // const pinBuilder = new WindEarth.PinBuilder()
    // featureEntityLayer.clustering.enabled = true
    // featureEntityLayer.clustering.pixelRange = pixelRange
    // featureEntityLayer.clustering.minimumClusterSize = minimumClusterSize
    // featureEntityLayer.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
    //   cluster.label.show = false
    //   cluster.billboard.show = true
    //   cluster.billboard.id = cluster.label.id
    //   cluster.billboard.disableDepthTestDistance = 1000000000000
    //   cluster.billboard.verticalOrigin = WindEarth.VerticalOrigin.BOTTOM
    //   cluster.billboard.image = pinBuilder.fromText('' + (clusteredEntities.length), WindEarth.Color.fromCssColorString('rgba(141,166,176,0.8)'), 36).toDataURL()
    // })

    featureEntityLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, function (e:any) {
      // console.log(e.feature)
      // console.log(e)
      if (!e.feature || !e.position) {
        // store.commit('clickEarthFan', null)
      } else {
        // const obj = {}
        // obj.x = e.position.x
        // obj.y = e.position.y
        // obj.id = e.feature._id
        // store.commit('clickEarthFan', obj)
        // console.log(arr)
      }

      featureEntityLayer.bindRotateEventFunc(function (res:any) {
        // if (!store.state.earthFan.clickEarthFan) return
        // if (store.state.earthFan.clickEarthFan.id == res.feature._id) {
        //   const obj = {}
        //   obj.x = res.position.x
        //   obj.y = res.position.y
        //   obj.id = res.feature._id
        //   store.commit('clickEarthFan', obj)
        // }
      })
    })
  }
}

fanLayer.add = function (data:any) {
  if (!data) {
    return
  }
  featureEntity = new WindEarth.BillBoardFeatureEntity({
    name: '',
    id: data.project_id,
    positions: [data.longitude, data.latitude, 0],
    styleOptions: {
      url: '/images/fans.svg',
      heightReference: 1,
      scale: 1,
      // width: 52,
      // height: 62,
      width: 32,
      height: 32,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1, 4000000, 0.65),
      distanceDisplayCondition: {
        near: 3500, // 最近显示距离
        far: 20000000 // 最远显示距离
      }
    }
  })
  featureEntityLayer.addFeatureEntity(featureEntity)
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
