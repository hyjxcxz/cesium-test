// import envConfig from '@/config/env-config'
// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const noiseLayer:any = {}

let featureEntityLayer:any = null
let featureEntity:any = null

noiseLayer.load = function (data:any, opacity = 0.6) {
  noiseLayer.remove()
  if (!data) {
    return
  }
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
    id: 'noise'
  })

  featureEntity = new WindEarth.RectangleFeatureEntity({
    positions: {
      west: data.boundary.bound[0],
      south: data.boundary.bound[2],
      east: data.boundary.bound[1],
      north: data.boundary.bound[3]
    },
    styleOptions: {
      // url: envConfig.S3Path + '/' + data.url,
      color: `rgba(255,255,255,${opacity})`
    }
  })
  featureEntityLayer.addFeatureEntity(featureEntity)
  // gwmap.dataManager.fltToRectangle({
  //   xmin: data.boundary.bound[0],
  //   ymin: data.boundary.bound[2],
  //   xmax: data.boundary.bound[1],
  //   ymax: data.boundary.bound[3]
  // })
}

noiseLayer.changeOpacity = function (opacity:any) {
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

noiseLayer.remove = function () {
  if (!featureEntityLayer) {
    return
  }
  featureEntityLayer.removeFeatureEntity(featureEntity)
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
  featureEntity = null
}
export default noiseLayer
