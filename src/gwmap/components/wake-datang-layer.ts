// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const wakeDatangLayer:any = {}

let streamLineModule:any = null

wakeDatangLayer.load = function (data:any) {
  wakeDatangLayer.remove()
  if (!data) {
    return
  }
  if (!streamLineModule) {
    streamLineModule = new WindEarth.StreamLineModule(gwmap.viewer)
    streamLineModule.defaultViewHeight = 100000
  }
  streamLineModule && streamLineModule.createStreamLine(data)
}

wakeDatangLayer.remove = function () {
  streamLineModule && streamLineModule.removeStreamLine()
}
export default wakeDatangLayer
