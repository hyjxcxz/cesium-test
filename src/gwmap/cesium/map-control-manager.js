// import SelectControl from '@/core/cesium/select-control'
import store from '@/store/index'
export default class MapControlManager {
  constructor(viewer, {
    activeChange,
    featureSelected,
    measureProfileCallback
  }) {
    this._viewer = viewer
    this._activeChange = activeChange
    this._measureProfileCallback = measureProfileCallback
    this._measureHelper = new WindEarth.MeasureHelper(viewer)
    this._plottingHelper = new WindEarth.PlottingHelper(viewer)
    // this._selectControl = new SelectControl(viewer, featureSelected)
    this._currentControl = null
    this._measureHelper.addListener('onMeasured', function(event) {
      store.commit('measuredlength', event.positions.length)
    })
  }

  active (control, options) {
    if (!control) return false
    // 如果和之前工具不是同一类的 停用之前地图工具
    // console.log(this._currentControl)
    if (this._currentControl && !this.checkIfSameGroupControl(this._currentControl, control, options)) {
      this.disactive(this._currentControl)
      this._currentControl = null
    }
    // 开启当前地图工具
    this._currentControl = control
    const that = this
    switch (control) {
      // case 'identity': // 识别要素
      // default:
      // this._selectControl.startSelect()
      // break
      case 'measureLength': // 长度测量
        this._measureHelper.measureLength({
          width: 3,
          geodesic: true,
          callback: function(events) {
            that._measureLengtheCallback && that._measureLengtheCallback(events)
          }
        })
        break
      case 'measreHeight': // 高度测量
        this._measureHelper.measreHeightSample({
          isClapOnTerrian: true
        })
        break
      case 'TrangleMeasure': // 三角测量
        this._measureHelper.measureHeightComplex({
          isClapOnTerrian: true
        })
        break
      case 'measureArea': // 面积测量
        this._measureHelper.measureArea({
          isClapOnTerrian: true
        })
        break
      case 'measureProfile': // 剖面分析
        this._measureHelper.measureProfile({
          width: 3,
          geodesic: true,
          callback: function(events) {
            that._measureProfileCallback && that._measureProfileCallback(events.positions)
          }
        })
        break
      case 'drawBillboard': // 绘制点
        this._plottingHelper.drawBillboard(options)
        break
      case 'drawTerrianPolyline': // 绘制线
        this._plottingHelper.drawTerrianPolyline(options)
        break
      case 'drawTerrianPolygon': // 绘制面
        this._plottingHelper.drawTerrianPolygon(options)
        break
      case 'drawTerrianStriaghtArrow': // 绘制箭头
        this._plottingHelper.drawTerrianStriaghtArrow(options)
        break
    }
    if (this._activeChange) {
      this._activeChange(control)
    }
    return true
  }

  /**
   *  取消指定控件的激活状态
   * @param {String} control 需要取消激活状态的地图控件名称
   */
  disactive (control) {
    switch (control) {
      // case 'identity':
      //   this._selectControl.endSelect()
      //   break
      case 'measureLength':
      case 'measreHeight':
      case 'TrangleMeasure':
      case 'measureArea':
      case 'measureProfile':
      case 'measure':
        this._measureHelper.clearMeasure()
        break
      case 'drawBillboard':
      case 'drawTerrianPolyline':
      case 'drawTerrianPolygon':
      case 'drawTerrianStriaghtArrow':
      case 'draw':
        this._plottingHelper.stopPlotting()
        this._plottingHelper.clearPlotting()
        break
    }
  }

  /**
   * 判断控件是否属于同一类
   * @param {*} control1
   * @param {*} control2
   */
  checkIfSameGroupControl (control1, control2, options) {
    if (!options) {
      return MeasureControls.indexOf(control1) >= 0 && MeasureControls.indexOf(control2) >= 0
    } else {
      return DrawControls.indexOf(control1) >= 0 && DrawControls.indexOf(control2) >= 0
    }
  }
}

// 测量控件名称列表
const MeasureControls = ['measureLength', 'measreHeight', 'TrangleMeasure', 'measureArea', 'measureProfile']
const DrawControls = ['drawBillboard', 'drawTerrianPolyline', 'drawTerrianPolygon', 'drawTerrianStriaghtArrow']
