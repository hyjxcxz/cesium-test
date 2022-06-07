// import store from '@/store'
import gwmap from '../index'
declare const WindEarth: any
const dataManager:any = {}
// 按经纬度定位
dataManager.flyToLocation = function (lon: any, lat: any) {
  gwmap.viewer.flyToLocation([lon, lat], {
    // offset: new WindEarth.HeadingPitchRange(0, -0.6, 10000)
  })
}
// 按矩形定位  -噪音图谱也用了
dataManager.fltToRectangle = function (fourPoint:any, schemeId:any = null) {
  if (schemeId) {
    gwmap.wtLayer.layerLocation()
    return
  }
  if (!fourPoint || !fourPoint.xmin) return
  // console.log(fourPoint, scheme_id, "1111")
  gwmap.viewer.flyToRectangle(Number(fourPoint.xmin), Number(fourPoint.ymin), Number(fourPoint.xmax), Number(fourPoint.ymax))
}
// 按矩形定位--置信度图谱专用
dataManager.fltToRectangle2 = function (data:any) {
  if (!data) return
  // console.log(data, "222")
  gwmap.viewer.flyToRectangle(Number(data.xmin), Number(data.ymin), Number(data.xmax), Number(data.ymax))
}
// 定位到初始地球
dataManager.fltToHome = function () {
  gwmap.viewer.flyToLocation([104, 28], {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, 0, 5000000)
  })
}

// 定位到初始地球 - 项目点位
dataManager.fltToHomeLocation = function (data:Array<number>) {
  gwmap.viewer.flyToLocation(data, {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, 0, 500000)
  })
}

// 旋转角度
dataManager.rotateToHome = function (value: any) {
  WindEarth.CameraOpraHelper.rotate(gwmap.viewer, value)
}

let cameraOparHelper:any = null
// 任意视角存储 -- ppt用
dataManager.storageAtWill = function (callback:any) {
  cameraOparHelper = new WindEarth.CameraOpraHelper(gwmap.viewer)
  const cameraPos: any = cameraOparHelper.getCameraPar()
  // console.log(cameraPos)
  callback(cameraPos)
}

// 定位到指定的任意视角 -- ppt用
dataManager.flyToStorageAtWill = function (data:any) {
  if (!cameraOparHelper) {
    cameraOparHelper = new WindEarth.CameraOpraHelper(gwmap.viewer)
  }
  cameraOparHelper.setCameraPar(data)
}

export default dataManager
