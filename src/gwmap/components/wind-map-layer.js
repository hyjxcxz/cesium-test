import { Message } from 'element-plus'

import store from '../../store/index'
const windMap = {}

let windMapVtkModule = null
let promise = null

windMap.loadWindMap = function(opacity = 0.6) {
  windMap.remove()
  windMapVtkModule = new WindEarth.WindMapVtkModule(gwmap.viewer, { brightless: 1.5, opacity: opacity })
}

windMap.addWindMap = function(data) {
  if (!data.url) {
    return
  }
  if (!windMapVtkModule) {
    return
  }
  promise = windMapVtkModule.loadWindMapByLodWithHeight(data.mapUrl, [data.center_x, data.center_y, 0], 0)
  // gwmap.viewer.flyToLocation([data.center_x, data.center_y])
  promise.then(res => {
    console.log(res)
    store.commit('windMapMinMax', res)
  })
  windMapVtkModule.leftClickChanged.addEventListener(event => {
    if (event.position[1] === 0 && event.position[0] === 0) {
      store.commit('windMapClick', null)
      if (store.state.app.cursor) {
        Message.error('超出查询范围！')
      }
      return
    }
    store.commit('windMapClick', JSON.stringify({
      x: event.winPos.x,
      y: event.winPos.y,
      lon: event.position[1],
      lat: event.position[0]
    }))
  })
  // // 地图点击获取经纬度
  // var handler = new WindEarth.ScreenSpaceEventHandler(gwmap.viewer.scene.canvas)
  // handler.setInputAction(function (event) {
  //   var earthPosition = gwmap.viewer.camera.pickEllipsoid(event.position, gwmap.viewer.scene.globe.ellipsoid)
  //   var cartographic = WindEarth.Cartographic.fromCartesian(earthPosition, gwmap.viewer.scene.globe.ellipsoid, new WindEarth.Cartographic())
  //   store.commit('windMapClick', JSON.stringify({
  //     x: event.position.x,
  //     y: event.position.y,
  //     lon: WindEarth.Math.toDegrees(cartographic.longitude),
  //     lat: WindEarth.Math.toDegrees(cartographic.latitude),
  //     height: cartographic.height
  //   }))
  //   // console.log("[Lng=>" + lng + ",Lat=>" + lat + ",H=>" + height + "]")
  // }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
}

windMap.remove = function() {
  if (windMapVtkModule) {
    windMapVtkModule.removeAll(true)
    windMapVtkModule = null
  }
}

export default windMap
