// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const towerLineDatangLayer:any = {}
let towerLineModule:any = null
towerLineDatangLayer.load = function (data:any) {
  towerLineDatangLayer.remove()
  if (!data) return
  if (!towerLineModule) {
    towerLineModule = new WindEarth.KmlTowerLineModule(gwmap.viewer)
    towerLineModule && towerLineModule.loadKmlFiles(data, '/models/35B08-Z1-15.glb')
  }
}

towerLineDatangLayer.showHide = function (visible:any) {
  towerLineModule && towerLineModule.setLineVisible(visible)
}

towerLineDatangLayer.showModule = function (visible:any) {
  towerLineModule && towerLineModule.setModelVisible(visible)
}

towerLineDatangLayer.remove = function () {
  towerLineModule && towerLineModule.removeAll(false)
  if (towerLineModule) towerLineModule = null
}

export default towerLineDatangLayer
