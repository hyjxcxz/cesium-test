// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const terrainGridLayer:any = {}

let terrianGridVtkModule:any = null
let _filePosition:any = null
terrainGridLayer.load = function (vtkFileUrl:any, position:any, callback:any) {
  terrainGridLayer.remove()
  if (!vtkFileUrl || !position) return
  if (!terrianGridVtkModule) {
    terrianGridVtkModule = new WindEarth.TerrianGridModule(gwmap.viewer, { brightless: 1.5, opacity: 0.1 })
  }
  // TODO:地形颜色配置与图例
  const promise = terrianGridVtkModule.loadVtkGridByFile(vtkFileUrl, position, {
    color: [
      [0, 28, 255, 1.0],
      [0, 169, 255, 1.0],
      [0, 255, 198, 1.0],
      [0, 255, 56, 1.0],
      [84, 255, 0, 1.0],
      [226, 255, 0, 1.0],
      [255, 141, 0, 1.0]]
  }, false)
  promise.then((data:any) => {
    _filePosition = position
    gwmap.viewer.flyToLocation(position)
    // eslint-disable-next-line n/no-callback-literal
    callback(true)
  }, (error:any) => {
    console.log(error)
  })
}
terrainGridLayer.isload = function () {
  return _filePosition !== null
}
terrainGridLayer.zoomToLayer = function () {
  _filePosition && gwmap.viewer.flyToLocation(_filePosition, {
    duration: 0
    // offset: { heading: 0.0, tilt: t || -30, range: r || 5000 }
  })
}
terrainGridLayer.setVisible = function (isVisible:any) {
  terrianGridVtkModule && terrianGridVtkModule.setVisible(isVisible)
}
terrainGridLayer.remove = function () {
  _filePosition = null
  terrianGridVtkModule && terrianGridVtkModule.removeAll()
}

export default terrainGridLayer
