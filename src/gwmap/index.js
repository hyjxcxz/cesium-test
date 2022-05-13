/* eslint-disable no-undef */
const gwmap = {}
gwmap.init = function (elementId, options = {}) {
  if (!elementId) {
    return
  }

  // eslint-disable-next-line no-new
  new WindEarth.Viewer('mapContainer', {
    imageryProvider: new WindEarth.Provider.GaodeImageryProvider({
      layer: 'vec',
      invertColor: true, // 反向颜色 color.r = 1.0 - color.r
      filterColor: '#4e70a6', // 滤镜颜色  color.r = color.r * filterColor.r
      brightness: 0.6,
      contrast: 1.8,
      gamma: 0.3,
      hue: 1,
      saturation: 0
    }),
    skyAtmosphere: false,
    requestRenderMode: true,
    maximumRenderTimeChange: 100,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true
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

export default gwmap
