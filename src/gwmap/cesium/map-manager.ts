import {
  CesiumConfig
} from '@/config/map-config'
import ImageLayerGroup from '@/core/cesium/image-layer-group'
import {
  loadLayerByConfig
} from '@/core/cesium/layer-config-util'
declare const WindEarth: any
export default class MapManager {
  _viewer: any
  _baseLayerGroup: any
  /**
   * 地图管理对象
   * @param {String} mapcontiner 地图容器div
   * @param {Object} mapconfig 地图配置信息
   * @param {Object} options 配置信息
   */
  constructor (mapcontiner:any, mapconfig:any, options = {}) {
    this._viewer = null
    this._baseLayerGroup = null
    this._initMap(mapcontiner, mapconfig)
    // this._skyBox()
  }

  get viewer () {
    return this._viewer
  }

  /**
   * 加载底图
   */
  loadBaseLayers (layerConfigs:any) {
    if (!this._baseLayerGroup) {
      this._baseLayerGroup = new ImageLayerGroup(this._viewer, {})
    }
    // 移除默认加载的谷歌影像图层
    if (this._viewer.imageryLayers._layers[0].imageryProvider.url === CesiumConfig.imageMapUrl) {
      this._viewer.imageryLayers.remove(this._viewer.imageryLayers._layers[0], true)
    }
    this._baseLayerGroup.clearLayers()

    if (!layerConfigs || layerConfigs.length === 0) return
    for (let i = layerConfigs.length - 1; i >= 0; i--) {
      const layer = loadLayerByConfig(layerConfigs[i], {})
      if (!layer) {
        return
      }
      this._baseLayerGroup.addLayer(layer)
    }
    this._baseLayerGroup.bringToBack()
  }

  /**
   * 初始化地图
   * @param {String} mapcontiner 地图容器div
   */
  _initMap (mapcontiner: any, mapconfig: { imageMapUrl: any; terrainUrl: any }) {
    // console.log(mapconfig.terrainUrl)
    this._viewer = new WindEarth.Viewer(mapcontiner, {
      // imageryProvider: new WindEarth.UrlTemplateImageryProvider({
      //   url: CesiumConfig.imageMapUrl
      // }),
      imageryProvider: new WindEarth.UrlTemplateImageryProvider({
        url: mapconfig.imageMapUrl,
        subdomains: '01234567',
        enablePickFeatures: false,
        maximumLevel: 16
      }),
      terrainProvider: new WindEarth.CesiumTerrainProvider({
        url: mapconfig.terrainUrl,
        requestVertexNormals: true
      })
    })
    this._viewer.scene.globe.depthTestAgainstTerrain = false
    // this._viewer.scene.backgroundColor = new WindEarth.CesiumTerrainProvider.color(0.0,0.0,0.0,0.0)
    this._viewer.extend(WindEarth.NavigationMixin, {})
    // WindEarth.SetDefaultView(mapconfig.defaultView)
    // 地图点击获取经纬度
    const that = this
    const handler = new WindEarth.ScreenSpaceEventHandler(that._viewer.scene.canvas)
    handler.setInputAction(function (event: { position: any }) {
      // const earthPosition = that._viewer.camera.pickEllipsoid(event.position, that._viewer.scene.globe.ellipsoid)
      // const cartographic = WindEarth.Cartographic.fromCartesian(earthPosition, that._viewer.scene.globe.ellipsoid, new WindEarth.Cartographic())
      // if (store.state.turb
    },
    WindEarth.ScreenSpaceEventType.LEFT_CLICK)
    /* 三维球转动添加监听事件 */
    const cameraHeight = Math.ceil(this._viewer.camera.positionCartographic.height)
    // console.log(cameraHeight)
    // const cameraHeight = this._viewer.camera.positionCartographic.height
    this._viewer.camera.changed.addEventListener(() => {
      // 打印中心点坐标、高度、当前范围坐标
      // console.log(this._viewer.camera.positionCartographic)
      const currentHeight = this._viewer.camera.positionCartographic.height
      this.showPratice(cameraHeight, currentHeight)
    })
  }

  showPratice (cameraHeight: number, currentHeight: number) {
    const praticeDom = document.getElementById('particle_div')
    if (praticeDom) {
      // console.log(cameraHeight - currentHeight)
      if (currentHeight >= cameraHeight) {
        // praticeDom.style.display = 'block'
        praticeDom.style.height = '30vh'
      } else {
        // praticeDom.style.display = 'none'
        praticeDom.style.height = '0'
      }
    }
  }

  _skyBox () {
    const globeView = this._viewer
    const globe = globeView.scene.globe
    const skyAtmosphere = globeView.scene.skyAtmosphere
    globe.showGroundAtmosphere = true
    // positiveX: '/images/posx.jpg',
    // negativeX: '/images/negx.jpg',
    // positiveY: '/images/posy.jpg',
    // negativeY: '/images/negy.jpg',
    // positiveZ: '/images/posz.jpg',
    // negativeZ: '/images/negz.jpg'
    const skyBox = new WindEarth.SkyBox({
      sources: {
        positiveX: '/images/skybox/posx.jpg',
        negativeX: '/images/skybox/negx.jpg',
        positiveY: '/images/skybox/posy.jpg',
        negativeY: '/images/skybox/negy.jpg',
        positiveZ: '/images/skybox/posz.jpg',
        negativeZ: '/images/skybox/negz.jpg'
      }
    })
    globeView.scene.skyBox = skyBox
    const isScene = true
    // const isGlobe = true
    if (isScene) {
      skyAtmosphere.hueShift = 0
      skyAtmosphere.saturationShift = 0
      skyAtmosphere.brightnessShift = 0
    }
    // if (isGlobe) { ineBase.turbineAddMapClick ) {
    //     const lng = WindEarth.Math.toDegrees(cartographic.longitude)
    //     const lat = WindEarth.Math.toDegrees(cartographic.latitude)
    //     const height = cartographic.height
    //     console.log('[Lng=>' + lng + ',Lat=>' + lat + ',H=>' + height + ']')
    //     store.commit('openTurbineAddMapClick', {
    //       lon: lng,
    //       lat: lat,
    //       height: height
    //     })
    //   }
    //   globe.atmosphereHueShift = 0.06
    //   globe.atmosphereSaturationShift = 0.4
    //   globe.atmosphereBrightnessShift = 0.09
    // }
    const widgetsFunc = new WindEarth.WidgetsFunc(globeView)
    widgetsFunc.adjustSkyAtmosphere({
      hue: 0.06,
      saturation: 0.35,
      brightness: 0.03,
      isGlobeFollow: true
    })
  }
}
