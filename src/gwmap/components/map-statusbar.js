import { service } from '@/api/request'
import util from '@/utils'
import store from '../../store/index'

// 地图状态栏组件
const mapStatusBar = {}
mapStatusBar.element = document.createElement('div')
mapStatusBar.element.id = 'map-status-bar'
mapStatusBar.element.classList.add('map-status-bar')

let cesiumWidgetsFunc = null
let getElevationTimer = null
/**
 * 组件入口
 */
mapStatusBar.init = function(viewer) {
  if (!viewer) return
  // 三维地图
  if (!cesiumWidgetsFunc) {
    cesiumWidgetsFunc = new WindEarth.WidgetsFunc(viewer)
    cesiumWidgetsFunc.bindStatusInfoFunc(infos => {
      if (infos) {
        updateStatus(infos.longitude, infos.latitude, infos.cameraHeight)
      } else {
        updateStatus()
      }
    })
  }
}

/**
 * 更新地图状态栏信息
 * @param {*} lon
 * @param {*} lat
 * @param {*} cameraHeight
 */
const updateStatus = function(lon, lat, cameraHeight) {
  if (getElevationTimer) {
    clearTimeout(getElevationTimer)
  }
  if (!lon && !lat && !cameraHeight) {
    mapStatusBar.element.innerHTML = ''
    return
  }
  if (store.state.app.language == 'en') {
    mapStatusBar.element.innerHTML = `Longitude：${util.formater.formatNumber(lon)}° &nbsp;&nbsp;Latitude：${util.formater.formatNumber(lat)}° &nbsp;&nbsp;${cameraHeight ? `Viewpoint height：${cameraHeight}m` : ''}`
  } else {
    mapStatusBar.element.innerHTML = `经度：${util.formater.formatNumber(lon)}° &nbsp;&nbsp;纬度：${util.formater.formatNumber(lat)}° &nbsp;&nbsp;${cameraHeight ? `视角高度：${cameraHeight}m` : ''}`
  }

  getElevationTimer = setTimeout(() => {
    service.getElevation(lon, lat, (res) => {
      const height = res && res.data && res.data.elevation
      if (!height || height < 0) {
        return
      }
      // console.log(` 海拔：${height}m`)
      if (store.state.app.language == 'en') {
        mapStatusBar.element.innerHTML = `Longitude：${util.formater.formatNumber(lon)}° &nbsp;&nbsp;Latitude：${util.formater.formatNumber(lat)}° &nbsp;&nbsp;${cameraHeight ? `Viewpoint height：${cameraHeight}m  elevation:：${height}m` : ''}`
      } else {
        mapStatusBar.element.innerHTML = `经度：${util.formater.formatNumber(lon)}° &nbsp;&nbsp;纬度：${util.formater.formatNumber(lat)}° &nbsp;&nbsp;${cameraHeight ? `视角高度：${cameraHeight}m  海拔：${height}m` : ''}`
      }
    })
  }, 200)
}

export default mapStatusBar
