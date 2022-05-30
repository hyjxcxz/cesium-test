export default class ImageLayerGroup {
  viewer: any
  options: any
  private _layerArray: never[]
  constructor (viewer:any, options:any) {
    this.viewer = viewer
    this.options = options
    this._layerArray = []
  }

  hasLayer (this: any, imageLayer: any) {
    // return this.viewer.imageryLayers.contains(imageLayer)
    return this._layerArray.indexOf(imageLayer) >= 0
  }

  addLayer (this: any, imageLayer: any) {
    if (!imageLayer) return
    this.viewer.imageryLayers.add(imageLayer)
    this._layerArray.push(imageLayer)
  }

  removeLayer (this: any, imageLayer: any) {
    if (!imageLayer || !this.hasLayer(imageLayer)) return
    this.viewer.imageryLayers.remove(imageLayer, true)
    this._layerArray.splice(this._layerArray.indexOf(imageLayer), 1)
  }

  clearLayers (this: any) {
    this._layerArray.forEach((imageLayer: any) => {
      this.viewer.imageryLayers.remove(imageLayer, true)
    })
    this._layerArray = []
  }

  bringToBack (this: any) {
    // 将图层组所有图层保持上下顺序依次调整到最底层
    for (let i = this._layerArray.length - 1; i >= 0; i--) {
      this.viewer.imageryLayers.lowerToBottom(this._layerArray[i])
    }
  }

  /**
     * 将图层组中的指定的图层 移到 图层组中所有图层的最顶层
     * @param {*} imageLayer
     */
  bringLayerToFront (this: any, imageLayer: any) {
    if (!this.hasLayer(imageLayer)) return
    let layerIndex = this.viewer.imageryLayers.indexOf(imageLayer)
    let maxIndex = -1
    this._layerArray.forEach((item: any) => {
      maxIndex = this.viewer.imageryLayers.indexOf(item)
    })
    if (maxIndex <= layerIndex) return
    while (maxIndex !== layerIndex) {
      this.viewer.imageryLayers.raise(imageLayer)
      layerIndex++
    }
    this._layerArray.splice(this._layerArray.indexOf(imageLayer), 1)
    this._layerArray.push(imageLayer)
  }
}
