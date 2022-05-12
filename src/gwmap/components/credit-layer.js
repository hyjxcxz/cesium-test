import envConfig from '@/config/env-config'

const creditLayer = {}

let featureEntityLayer = null
let featureEntity = null

creditLayer.load = function (data, opacity = 0.6) {
  creditLayer.remove()
  if (!data) {
    return
  }
  
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
    id: 'credit'
  })
  // console.log(data.boundary.xmin)
  featureEntity = new WindEarth.RectangleFeatureEntity({
    positions: {
      west: data.boundary.xmin,
      south: data.boundary.ymin,
      east: data.boundary.xmax,
      north: data.boundary.ymax
    },
    styleOptions: {
      url: envConfig.S3Path + '/' + data.url,
      color: `rgba(255,255,255,${opacity})`
    }
  })
  featureEntityLayer.addFeatureEntity(featureEntity)
  
  // gwmap.dataManager.fltToRectangle2(data.boundary)
}

creditLayer.changeOpacity = function (opacity) {
  if (!featureEntity) {
    return
  }
  if (opacity < 0 || opacity > 1) {
    opacity = 1
  }
  featureEntity.changeFeatureProperty({
    styleOptions: {
      color: `rgba(255,255,255,${opacity})`
    }
  })
}

creditLayer.remove = function () {
  if (!featureEntityLayer) {
    return
  }
  featureEntityLayer.removeFeatureEntity(featureEntity)
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
  featureEntity = null
}
export default creditLayer
