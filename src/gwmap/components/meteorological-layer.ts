// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any
const meteorologicalLayer:any = {}
let featureEntityLayer:any = null
meteorologicalLayer.addList = function (dataList:any) {
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
  dataList.forEach((item: any, index: any) => {
    const featureEntity = new WindEarth.BillBoardFeatureEntity({
      id: item.cma_station_id,
      positions: [item.cma_station_longitude, item.cma_station_latitude, 0],
      styleOptions: {
        url: '/images/icon_station.png',
        heightReference: 0,
        // scale: 1,
        width: 28,
        height: 36,
        verticalOrigin: WindEarth.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: 1000000000000,
        distanceDisplayCondition: {
          near: 100000, // 最近显示距离
          far: 20000000
        }
      }
    })
    featureEntityLayer.addFeatureEntity(featureEntity)
  })
  featureEntityLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res:any) => {
    // store.commit('stationsIdChange', res.feature.id)
  })
}
meteorologicalLayer.removeAll = function () {
  if (!featureEntityLayer) {
    return
  }
  // featureEntityLayer.undindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  featureEntityLayer.removeAll()
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
}
export default meteorologicalLayer
