import {
  newUUID
} from '@/core/utils/core-util'

export default class FeatureLayer {
  constructor (mapManager, options) {
    this._mapManager = mapManager
    this._dataKeyMap = {}
    this._dataLayer = new WindEarth.FeatureLayer(mapManager.viewer, `${newUUID()}-layer`)
    this._dataLayer.addLayerToViewer()
  }

  addFeature (feature, flyTo = false) {
    if (!feature) return
    this._dataKeyMap[feature.id] = null
    this._dataLayer.addFeature(feature)
    if (flyTo) {
      this._mapManager.viewer.flyTo(feature.entity)
    }
  }

  removeFeature (feature) {
    if (!feature || !this._dataKeyMap.hasOwnProperty(feature.id)) {
      return
    }
    this._dataLayer.removeFeatureByID(feature.id)
    delete this._dataKeyMap[feature.id]
  }
}
