// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const wakeLayer:any = {}

let streamLineModule:any = null

wakeLayer.load = function (data:any) {
  wakeLayer.remove()
  if (!data) {
    return
  }
  if (!streamLineModule) {
    streamLineModule = new WindEarth.StreamLineModule(gwmap.viewer)
    streamLineModule.defaultViewHeight = 100000
  }
  streamLineModule && streamLineModule.createStreamLine(data)
}

wakeLayer.remove = function () {
  streamLineModule && streamLineModule.removeStreamLine()
}
export default wakeLayer
