import store from '../../store/index'
import {
  CesiumConfig
} from '@/config/map-config'
import ImageLayerGroup from '@/core/cesium/image-layer-group'
import {
  loadLayerByConfig
} from '@/core/cesium/layer-config-util'
export default class MapManager {
  /**
   * 地图管理对象
   * @param {String} mapcontiner 地图容器div
   * @param {Object} mapconfig 地图配置信息
   * @param {Object} options 配置信息
   */
  constructor(mapcontiner, mapconfig, options = {}) {
    this._viewer = null
    this._baseLayerGroup = null
    this._initMap(mapcontiner, mapconfig)
  }

  get viewer () {
    return this._viewer
  }
  /**
   * 加载底图
   */
  loadBaseLayers (layerConfigs) {
    if (!this._baseLayerGroup) {
      this._baseLayerGroup = new ImageLayerGroup(this._viewer)
    }
    // 移除默认加载的谷歌影像图层
    if (this._viewer.imageryLayers._layers[0].imageryProvider.url === CesiumConfig.imageMapUrl) {
      this._viewer.imageryLayers.remove(this._viewer.imageryLayers._layers[0], true)
    }
    this._baseLayerGroup.clearLayers()

    if (!layerConfigs || layerConfigs.length === 0) return
    for (let i = layerConfigs.length - 1; i >= 0; i--) {
      const layer = loadLayerByConfig(layerConfigs[i])
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
  _initMap (mapcontiner, mapconfig) {
    // console.log(mapconfig.terrainUrl)
    this._viewer = new WindEarth.Viewer(mapcontiner, {
      // imageryProvider: new WindEarth.UrlTemplateImageryProvider({
      //   url: CesiumConfig.imageMapUrl
      // }),
      imageryProvider: new WindEarth.UrlTemplateImageryProvider({
        url: mapconfig.imageMapUrl,
        subdomains: mapconfig.imgeMapSub,
        enablePickFeatures: false,
        maximumLevel: 16,
        // tilingScheme: CesiumConfig.imageMapCrs === '4326' ? new WindEarth.GeographicTilingScheme() : null,
      }),
      terrainProvider: new WindEarth.CesiumTerrainProvider({
        url: mapconfig.terrainUrl,
        requestVertexNormals: true
      })
    })
    this._viewer.scene.globe.depthTestAgainstTerrain = true
    this._viewer.extend(WindEarth.NavigationMixin, {})
    // WindEarth.SetDefaultView(mapconfig.defaultView)
    // 地图点击获取经纬度
    const that = this

    var handler = new WindEarth.ScreenSpaceEventHandler(that._viewer.scene.canvas)
    handler.setInputAction(function(event) {
      var earthPosition = that._viewer.camera.pickEllipsoid(event.position, that._viewer.scene.globe.ellipsoid)
      var cartographic = WindEarth.Cartographic.fromCartesian(earthPosition, that._viewer.scene.globe.ellipsoid, new WindEarth.Cartographic())
      if (store.state.turbineBase.turbineAddMapClick) {
        const lng = WindEarth.Math.toDegrees(cartographic.longitude)
        const lat = WindEarth.Math.toDegrees(cartographic.latitude)
        const height = cartographic.height
        console.log('[Lng=>' + lng + ',Lat=>' + lat + ',H=>' + height + ']')
        store.commit('openTurbineAddMapClick', {
          lon: lng,
          lat: lat,
          height: height
        })
      }
    },
      WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }
}
