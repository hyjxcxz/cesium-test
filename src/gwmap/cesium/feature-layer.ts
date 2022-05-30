import {
  newUUID
} from '@/core/utils/core-util'
declare const WindEarth: any

export default class FeatureLayer {
  _mapManager: any
  _dataKeyMap: any
  _dataLayer: any
  constructor (mapManager:any, options:any) {
    this._mapManager = mapManager
    this._dataKeyMap = {}
    this._dataLayer = new WindEarth.FeatureLayer(mapManager.viewer, `${newUUID()}-layer`)
    this._dataLayer.addLayerToViewer()
  }

  addFeature (feature:any, flyTo = false) {
    if (!feature) return
    this._dataKeyMap[feature.id] = null
    this._dataLayer.addFeature(feature)
    if (flyTo) {
      this._mapManager.viewer.flyTo(feature.entity)
    }
  }

  removeFeature (feature:any) {
    // || !this._dataKeyMap.hasOwnProperty(feature.id)
    if (!feature) {
      return
    }
    this._dataLayer.removeFeatureByID(feature.id)
    delete this._dataKeyMap[feature.id]
  }
}
