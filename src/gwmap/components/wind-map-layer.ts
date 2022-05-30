// import { Message } from 'element-ui'
// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const windMap:any = {}

let windMapVtkModule:any = null
let promise = null

windMap.loadWindMap = function (opacity = 0.6) {
  windMap.remove()
  windMapVtkModule = new WindEarth.WindMapVtkModule(gwmap.viewer, { brightless: 1.5, opacity })
}

windMap.addWindMap = function (data:any) {
  if (!data.url) {
    return
  }
  if (!windMapVtkModule) {
    return
  }
  promise = windMapVtkModule.loadWindMapByLodWithHeight(data.mapUrl, [data.center_x, data.center_y, 0], 0)
  // promise = windMapVtkModule.loadWindMapByFile('/file/WAKE_80m_new_tri.vtk', [data.center_x, data.center_y, 0], 0, false)
  // gwmap.viewer.flyToLocation([data.center_x, data.center_y])
  promise.then((res: any) => {
    console.log(res)
    // store.commit('windMapMinMax', res)
  })
  windMapVtkModule.leftClickChanged.addEventListener((event: { position: number[] }) => {
    if (event.position[1] === 0 && event.position[0] === 0) {
      // store.commit('windMapClick', null)
      // if (store.state.app.cursor) {
      //   Message.error('超出查询范围！')
      // }
      return
    }
    gwmap.viewer.entities.removeAll()
    addPoint(event.position, data.height)
    // store.commit('windMapClick', JSON.stringify({
    //   x: event.winPos.x,
    //   y: event.winPos.y,
    //   lon: event.position[1],
    //   lat: event.position[0]
    // }))
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
function addPoint (pos:any, height:any) {
  gwmap.viewer.entities.add({
    position: WindEarth.Cartesian3.fromDegrees(pos[1], pos[0], height ? Number(height) : 0),
    point: {
      pixelSize: 11,
      color: WindEarth.Color.RED,
      heightReference: 1, // WindEarth.HeightReference.RELATIVE_TO_GROUND
      outlineWidth: 6
    }
  })
}
windMap.remove = function () {
  if (windMapVtkModule) {
    windMapVtkModule.removeAll(true)
    gwmap.viewer.entities.removeAll()
    windMapVtkModule = null
  }
}

export default windMap
