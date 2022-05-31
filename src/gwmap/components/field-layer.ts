import gwmap from '../index'
declare const WindEarth: any
const fieldLayer:any = {}

let kmlLayer:any = null
fieldLayer.load = function (url:any) {
  fieldLayer.remove()
  if (!url) {
    return
  }
  if (!kmlLayer) {
    kmlLayer = new WindEarth.KmlLayer(gwmap.viewer)
  }
  kmlLayer.loadData({
    url, // KML文件路径
    clampToGround: true // 是否贴地
  })
  kmlLayer.addToViewer()
}

fieldLayer.zoomToLayer = function () {
  kmlLayer && kmlLayer.layerLocation()
}

fieldLayer.remove = function () {
  kmlLayer && kmlLayer.removeFromViewer()
  kmlLayer = null
}
export default fieldLayer
