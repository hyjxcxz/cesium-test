const drawFeature = {}
let drawFeatureEntityHelper = null
let drawFeatureLayer = null
let InterpolationFunc = null

drawFeature.drawPolygonEntity = (call) => {
  if (!drawFeatureEntityHelper) {
    drawFeatureEntityHelper = new WindEarth.DrawFeatureEntityHelper(gwmap.viewer)
    drawFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
  }
  drawFeatureEntityHelper.drawPolygonFeature({
    styleOptions: {
      // color: '#92ff4b',
      outline: true,
      outlineColor: WindEarth.Color.BLACK.withAlpha(0.5),
      material: WindEarth.Color.AQUA.withAlpha(0.5)
      // lineStyle:{
      //   color: '#ff5329',
      //   width: 2.0
      // }
    }
  }, function(billborad) {
    // console.log(billborad)
    call(billborad)
    // drawFeatureLayer.addFeatureEntity(billborad)
    // gwmap.viewer.flyTo(billborad)
  })
}

drawFeature.checkPointInPolygon = (point, polygon) => {
  if (!point) return false
  InterpolationFunc = WindEarth.InterpolationFunc
  return InterpolationFunc.pointIsInPolygon(point, polygon)
}

export default drawFeature
