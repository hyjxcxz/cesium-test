
import gwmap from '../index'
declare const WindEarth: any
const astrictLayer:any = {}

let astrictLayerFeature:any = [] // 存三维feature，解决内存不够的问题,不存item
astrictLayer.load = function (data:any) {
  astrictLayer.remove(data)
  const obj:any = {}
  const ids = Math.floor((Math.random() * 10000) + 1)
  obj.kmlLayer = new WindEarth.KmlLayer(gwmap.viewer)
  obj.id = ids
  data.id = ids
  astrictLayerFeature.push(obj)

  astrictLayer.addlayer(data)
}
astrictLayer.addlayer = function (data:any) {
  if (data.url && data.checked) {
    const modelFeature = astrictLayerFeature.filter((item:any, index:number) => {
      return item.id === data.id
    })
    // console.log(modelFeature)
    if (modelFeature.length > 0) {
      modelFeature[0].kmlLayer.loadData({
        url: data.url,
        clampToGround: true
      })
      modelFeature[0].kmlLayer.addToViewer()
      modelFeature[0].kmlLayer.layerLocation()
    }
  }
  // console.log(astrictLayerFeature)
}

astrictLayer.remove = function (data:any, type = false) {
  let removeFeature:any = null
  let removeIndex = null
  astrictLayerFeature.forEach((item:any, index:number) => {
    if (item.id === data.id) {
      removeFeature = item
      removeIndex = index
    }
  })
  if (removeFeature) {
    removeFeature.kmlLayer.removeFromViewer()
    data.id = null
    astrictLayerFeature.splice(removeIndex, 1)
  }
  // console.log(astrictLayerFeature)
}

astrictLayer.removeAll = () => {
  astrictLayerFeature.forEach((item:any, index:number) => {
    item.kmlLayer.removeFromViewer()
  })
  astrictLayerFeature = []
}
export default astrictLayer
