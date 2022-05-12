import {
  CesiumConfig
} from '@/config/map-config'
// import ImageLayerGroup from '@/core/cesium/image-layer-group'
// import {
//   loadLayerByConfig
// } from '@/core/cesium/layer-config-util'
import MapManager from './cesium/map-manager' // 定位等方法
// import mapStatusBar from './components/map-statusbar'
// import dataManager from './cesium/data-manager'
// import MapControlManager from './cesium/map-control-manager'
// import drawFeature from './cesium/draw-feature'
// import store from '../store/index'
// import fanLayer from './components/fan-layer' // 地球项目风机
// import scoutingLayer from './components/scouting-layer' // 踏勘
// import fieldLayer from './components/field-layer' // 风场范围
// import astrictLayer from './components/astrict-layer' // 自定义限制因素
// import mastLayer from './components/mast-layer' // 测风塔
// import wtLayer from './components/wt-layer' // 方案风机
// import windMap from './components/wind-map-layer' // 综合风图谱
// import stationLayer from './components/station-layer' // 升压站
// import roadLayerEdit from './components/road-layer-edit' // 道路
// import towerLineLayer from './components/tower-line-layer' // 集电线路
// import towerLineNewLayer from './components/tower-line-new-layer' // 道亨集电线路
// import noiseLayer from './components/noise-layer' // 噪音图谱
// import creditLayer from './components/credit-layer' // 置信度图谱
// import comparisonLayer from './components/scheme-comparison' // 方案比选
// import essentialFactor from './components/essentialFactor' // 要素
// import { promised } from 'q';
// import { Message } from 'element-plus';

const gwmap = {}
// gwmap.dataManager = dataManager
// gwmap.mapControlManager = null
// gwmap.fanLayer = fanLayer
// gwmap.scoutingLayer = scoutingLayer
// gwmap.fieldLayer = fieldLayer
// gwmap.astrictLayer = astrictLayer
// gwmap.mastLayer = mastLayer
// gwmap.wtLayer = wtLayer
// gwmap.windMap = windMap
// gwmap.stationLayer = stationLayer
// gwmap.roadLayerEdit = roadLayerEdit
// gwmap.towerLineLayer = towerLineLayer
// gwmap.towerLineNewLayer = towerLineNewLayer
// gwmap.noiseLayer = noiseLayer
// gwmap.creditLayer = creditLayer
// gwmap.comparisonLayer = comparisonLayer
// gwmap.drawFeature = drawFeature
// gwmap.essentialFactor = essentialFactor

let serviceLayerGroup = null
let terrianProvider = null
let terrianSampleTool = null
let arrGisMapFeature = [] // 存三维feature，解决内存不够的问题,不存item
let uvaImageFeature = null
const layerDist = {}
gwmap.init = function(elementId, options = {}) {
  if (!elementId) {
    return
  }
  let globeView = new WindEarth.Viewer('mapContainer',{
    imageryProvider: new WindEarth.Provider.GaodeImageryProvider({
        layer: "vec",
        invertColor: true, //反向颜色 color.r = 1.0 - color.r
        filterColor: "#4e70a6", //滤镜颜色  color.r = color.r * filterColor.r
        brightness: 0.6,
        contrast: 1.8,
        gamma: 0.3,
        hue: 1,
        saturation: 0,
    }),
    skyAtmosphere:false,
    requestRenderMode: true,
    maximumRenderTimeChange: 100,
    orderIndependentTranslucency: false,
    contextOptions: {
       webgl: {
           alpha: true,
       }
    }
})
  // gwmap.mapManager = new MapManager(elementId, CesiumConfig)
  // gwmap.viewer = gwmap.mapManager.viewer

  // // 加载地图状态栏
  // document.getElementById(elementId).appendChild(mapStatusBar.element)
  // mapStatusBar.init(gwmap.mapManager.viewer)

  // gwmap.mapControlManager = new MapControlManager(gwmap.mapManager.viewer, {
  //   activeChange: () => { },
  //   measureProfileCallback: (positions) => {
  //     store.commit('profilePoints', positions)
  //   }
  // })

  // 指南针
  // setTimeout(() => {
  //   gwmap.viewer && gwmap.viewer.rotateCameraChanged.addEventListener(function(options) {
  //     store.commit('deg', options.angle)
  //   })
  // }, 1000);
}


async function load (url) {
  let promise = WindEarth.Resource.fetchJson({ url: url + '/layer.json' })
  await promise.then(() => {
    terrianProvider = new WindEarth.CesiumTerrainProvider({
      url: url
    })
    gwmap.viewer.scene.globe.terrainProvider = terrianProvider
  }, (error) => {
    console.log(error, 'error')
    if (error.statusCode == 404) {
      Message.error('获取地形服务失败，用SRTM数据服务替代')
      terrianProvider = new new WindEarth.CesiumTerrainProvider({
        url: '/terrainPath'
      })
      gwmap.viewer.scene.globe.terrainProvider = terrianProvider
    }
    if (error.statusCode == 500) {
      Message.error('地形服务器出错')
      terrianProvider = new new WindEarth.CesiumTerrainProvider({
        url: url
      })
      gwmap.viewer.scene.globe.terrainProvider = terrianProvider
    }
  })
}
// 地形服务
gwmap.init3dMap = function(url) {
  if (!url) return
  gwmap.removeUVAImage()
  // console.log(terrianProvider)
  load(url)
  // terrianProvider = new WindEarth.CesiumTerrainProvider({
  //   url: url
  // })
  // gwmap.viewer.scene.globe.terrainProvider = terrianProvider
}
// 加载无人机影像 dom
gwmap.loadUVAImage = function(demSever) {
  const imageryProvider = new WindEarth.WebMapServiceImageryProvider({
    url: demSever.dom,
    subdomains: demSever.subdomains,
    layers: demSever.dom_layers,
    parameters: {
      transparent: true,
      format: 'image/png'
    },
    show: true
  })
  uvaImageFeature = gwmap.viewer.scene.imageryLayers.addImageryProvider(imageryProvider)
}
// 移除无人机影像
gwmap.removeUVAImage = function() {
  uvaImageFeature && gwmap.viewer.scene.imageryLayers.remove(uvaImageFeature)
}
// 获取海拔高度
gwmap.getLonLatHeight = function(positions, callback) {
  if (!terrianProvider) {
    callback(null)
    return
  }
  terrianSampleTool = new WindEarth.TerrainSampleTool(gwmap.viewer.scene.globe.terrainProvider).getMostDetailHeights(positions)
  // console.log(terrianSampleTool)
  terrianSampleTool.then((res) => {
    callback(res)
  })
}

// 加载 房屋 等
gwmap.loadGisMap = function(item, layers, subdomains = ['gs2', 'gs3', 'gs4', 'gs5']) {
  if (arrGisMapFeature.length && arrGisMapFeature.map(v => { return v.name }).includes(layers)) {
    gwmap.removeGisMap(item, layers)
  }
  if (!item.url) return
  const layerProvider = new WindEarth.WebMapServiceImageryProvider({
    url: item.url,
    subdomains: subdomains,
    parameters: {
      transparent: true,
      format: 'image/png'
    },
    layers: layers
  })
  if (layerProvider) {
    let obj = {}
    obj.feature = gwmap.viewer.scene.imageryLayers.addImageryProvider(layerProvider)
    obj.name = layers
    arrGisMapFeature.push(obj)
  }
}
// 移出
gwmap.removeGisMap = function(item, name) {
  let removeFeature = null
  let removeIndex = null
  arrGisMapFeature.forEach((obj, index) => {
    if (obj.name == name) {
      removeFeature = obj
      removeIndex = index
    }
  })
  removeFeature && gwmap.viewer.scene.imageryLayers.remove(removeFeature.feature)
  if (removeIndex || removeIndex === 0) arrGisMapFeature.splice(removeIndex, 1)
}
// 等高线
gwmap.loadGisHeightLine = function(item) {
  const layerProvider = new WindEarth.WebMapServiceImageryProvider({
    url: item.url,
    subdomains: item.subdomains,
    parameters: {
      transparent: true,
      format: 'image/png'
    },
    layers: item.name
  })
  if (layerProvider) {
    item.feature = gwmap.viewer.scene.imageryLayers.addImageryProvider(layerProvider)
  }
}
// 移出
gwmap.removeGisHeightLine = function(item) {
  if (!item.feature) return
  gwmap.viewer.scene.imageryLayers.remove(item.feature)
  item.feature = null
}


gwmap.loadServiceLayer = function(layerData) {
  // if (!layerData || layerDist.hasOwnProperty(layerData.layerId)) return
  // if (!serviceLayerGroup) {
  //   serviceLayerGroup = new ImageLayerGroup(gwmap.mapManager.viewer)
  //   serviceLayerGroup.bringToBack()
  // }

  // const layer = loadLayerByConfig(layerData)
  // if (!layer) {
  //   return
  // }
  // serviceLayerGroup.addLayer(layer)
  // layerDist[layerData.layerId] = layer
}
gwmap.removeServiceLayer = function(layerData) {
  if (!layerData || !layerDist.hasOwnProperty(layerData.layerId)) return

  serviceLayerGroup.removeLayer(layerDist[layerData.layerId])
  delete layerDist[layerData.layerId]
}

export default gwmap
