import store from '@/store'
const dataManager = {}
// 按经纬度定位
dataManager.flyToLocation = function(lon, lat) {
  if (store.state.app.scheme_id) return
  if (!lon || !lat) return
  gwmap.viewer.flyToLocation([lon, lat], {
    // offset: new WindEarth.HeadingPitchRange(0, -0.6, 10000)
  })
}
// 按矩形定位  -噪音图谱也用了
dataManager.fltToRectangle = function(four_point, scheme_id = null) {
  if (scheme_id) {
    gwmap.wtLayer.layerLocation()
    return
  }
  if (!four_point || !four_point.xmin) return
  // console.log(four_point, scheme_id, "1111")
  gwmap.viewer.flyToRectangle(Number(four_point.xmin), Number(four_point.ymin), Number(four_point.xmax), Number(four_point.ymax))
}
// 按矩形定位--置信度图谱专用
dataManager.fltToRectangle2 = function(data) {
  if (!data) return
  // console.log(data, "222")
  gwmap.viewer.flyToRectangle(Number(data.xmin), Number(data.ymin), Number(data.xmax), Number(data.ymax))
}
// 定位到初始地球
dataManager.fltToHome = function() {
  gwmap.viewer.flyToLocation([104, 28], {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, 0, 5000000)
  })
}

// 旋转角度
dataManager.rotateToHome = function(value) {
  WindEarth.CameraOpraHelper.rotate(gwmap.viewer, value)
}

let cameraOparHelper = null
// 任意视角存储 -- ppt用
dataManager.storageAtWill = function(callback) {
  cameraOparHelper = new WindEarth.CameraOpraHelper(gwmap.viewer)
  let cameraPos = cameraOparHelper.getCameraPar()
  // console.log(cameraPos)
  callback(cameraPos)
}

// 定位到指定的任意视角 -- ppt用
dataManager.flyToStorageAtWill = function(data) {
  if (!cameraOparHelper) {
    cameraOparHelper = new WindEarth.CameraOpraHelper(gwmap.viewer)
  }
  cameraOparHelper.setCameraPar(data)
}

export default dataManager