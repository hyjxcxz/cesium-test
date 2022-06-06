import { CesiumConfig } from '../config/map-config' // 三维地图基础配置(地形、影像服务)
import MapManager from './cesium/map-manager' // 定位
// import mapStatusBar from './components/map-statusbar' // 地图状态栏信息
// import ImageLayerGroup from '@/core/cesium/image-layer-group'
// import {
//   loadLayerByConfig
// } from '@/core/cesium/layer-config-util'
import dataManager from './cesium/data-manager' // 定位
import MapControlManager from './cesium/map-control-manager' // 测距、测面等
import drawFeature from './cesium/draw-feature'
import fanLayer from './components/fan-layer' // 风电场
import scoutingLayer from './components/scouting-layer' // 踏勘
import fieldLayer from './components/field-layer' // 风场范围
import astrictLayer from './components/astrict-layer' // 自定义限制因素
import mastLayer from './components/mast-layer' // 测风塔
import mastDatangLayer from './components/mast-datang-layer' // 风功率预测塔
import wtLayer from './components/wt-layer' // 方案风机
import wtLayerRealtime from './components/wt-realTime-layer' // 实时-方案风机
import windMap from './components/wind-map-layer' // 综合风图谱
import stationLayer from './components/station-layer' // 升压站
import roadLayerEdit from './components/road-layer-edit' // 道路
import towerLineLayer from './components/tower-line-layer' // 集电线路
import towerLineNewLayer from './components/tower-line-new-layer' // 道亨集电线路
import towerLineDatangLayer from './components/tower-line-datang-layer' // 大唐
import noiseLayer from './components/noise-layer' // 噪音图谱
import creditLayer from './components/credit-layer' // 置信度图谱
import comparisonLayer from './components/scheme-comparison' // 方案比选
import terrainGridLayer from './components/terrain-grid-layer' // 地形前后对比
import wakeLayer from './components/wake-layer' // 尾流
import wakeDatangLayer from './components/wake-datang-layer' // 尾流
import meteorologicalLayer from './components/meteorological-layer' // 气象站
declare const WindEarth: any

const gwmap:any = {}
gwmap.viewer = null
gwmap.dataManager = dataManager
gwmap.mapControlManager = null
gwmap.fanLayer = fanLayer
gwmap.scoutingLayer = scoutingLayer
gwmap.fieldLayer = fieldLayer
gwmap.astrictLayer = astrictLayer
gwmap.mastLayer = mastLayer
gwmap.mastDatangLayer = mastDatangLayer
gwmap.wtLayer = wtLayer
gwmap.windMap = windMap
gwmap.stationLayer = stationLayer
gwmap.roadLayerEdit = roadLayerEdit
gwmap.towerLineLayer = towerLineLayer
gwmap.towerLineNewLayer = towerLineNewLayer
gwmap.noiseLayer = noiseLayer
gwmap.creditLayer = creditLayer
gwmap.comparisonLayer = comparisonLayer
gwmap.drawFeature = drawFeature
gwmap.terrainGridLayer = terrainGridLayer
gwmap.wakeLayer = wakeLayer
gwmap.wakeDatangLayer = wakeDatangLayer
gwmap.towerLineDatangLayer = towerLineDatangLayer
gwmap.wtLayerRealtime = wtLayerRealtime
gwmap.meteorologicalLayer = meteorologicalLayer

// 首页地图初始化
gwmap.init = function (elementId:any, options = {}) {
  if (!elementId) {
    return
  }
  const configMap = {
    scene: {
      showSkyBox: false, // 是否显示天空盒
      showSkyAtmosphere: false, // 大气层
      fog: false,
      fxaa: true, // 抗锯齿
      skyAtmosphere: false, // 大气圈
      requestRenderMode: true,
      highDynamicRange: false, // 是否开启高动态渲染
      backgroundColor: '#000000', // 默认背景色，天空盒不显示时候起作用
      globe: {
        depthTestAgainstTerrain: false,
        baseColor: '#546a53', // 地球背景色，无底图时可查看效果
        showGroundAtmosphere: false, // 近地大气层
        enableLighting: false // 是否开启太阳光照
      }
    }
  }

  const globeView = new WindEarth.Viewer(elementId, {
    imageryProvider: new WindEarth.Provider.GaodeImageryProvider({
      layer: 'vec', // #4e70a6
      invertColor: true, // 反向颜色 color.r = 1.0 - color.r
      filterColor: '#1f2f47', // 滤镜颜色  color.r = color.r * filterColor.r#4e70a6
      brightness: 0.6,
      contrast: 1.8,
      gamma: 0.3,
      hue: 1,
      saturation: 0
    }),
    skyAtmosphere: false,
    maximumRenderTimeChange: 100,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    }
  })
  const map = new WindEarth.Map(globeView, configMap)
  gwmap.viewer = map

  // 展示国界线
  const url = '/vendors/border_001_v2.geojson' // 纹理数据
  function readData () {
    WindEarth.Resource.fetchJson({ url }).then((data:any) => {
      addWallGraphic(data)
    })
  }
  function addWallGraphic (dataJson:any) {
    const arr = WindEarth.Util.geoJsonToGraphics(dataJson, { type: 'polyline' }) // 解析geoJSon
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const len = item.positions.length
      const max = new Array(len).fill(100000)
      const min = new Array(len).fill(0)
      const pos = WindEarth.Util.mergeArray(item.positions)
      globeView.entities.add({
        wall: {
          positions: WindEarth.Cartesian3.fromDegreesArray(pos),
          maximumHeights: max,
          minimumHeights: min,
          material: new WindEarth.LineFlowMaterialProperty({
            image: '/vendors/fence1.png', // 3049FE 纹理图片
            color: WindEarth.Color.fromCssColorString('#3049FE').withAlpha(1.0),
            repeat: new WindEarth.Cartesian2(5, 1),
            axisY: true, // 方向，true时上下，false左右
            speed: 0// 速度，建议取值范围1-100
          })
          // material: new WindEarth.WallFlowMaterialProperty(WindEarth.Color.fromCssColorString('#3049FE').withAlpha(1.0),3000,false,'../files/img/fence1.png')
        }
      })
    }
    // globeView.zoomTo(globeView.entities)
  }
  readData()
  map.viewer.extend(WindEarth.NavigationMixin, {}) // 传控对象 默认展示指南针/方法缩小等

  gwmap.mapControlManager = new MapControlManager(map.viewer, {
    activeChange: () => { }
  })
}

// 项目页面地图初始化
gwmap.initProjectMap = function (elementId:any, options = {}) {
  if (!elementId) {
    return
  }

  gwmap.mapManager = new MapManager(elementId, CesiumConfig)
  gwmap.viewer = gwmap.mapManager.viewer
}

export default gwmap
