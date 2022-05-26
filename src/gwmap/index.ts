declare const WindEarth: any
const gwmap:any = {}
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

  const globeView = new WindEarth.Viewer('mapContainer', {
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
    //  globeView.zoomTo(globeView.entities);
  }
  readData()
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
  return map
}

export default gwmap
