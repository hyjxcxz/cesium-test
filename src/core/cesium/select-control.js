export default class SelectControl {
  /**
     * 选择工具
     * @param {CesiumViewer} cesiumViewer
     * @param {Function} selectLinstener 选择对象后回调函数
     * @param {Object} options 配置信息
     */
  constructor(cesiumViewer, selectLinstener, options = null) {
    this._cesiumViewer = cesiumViewer
    this._selectLinstener = selectLinstener
    this._options = options || {}
    this._toolTipEntity = null
    this._tooltipOption = this._options.tooltipOption || getToolTipEntityOptions()
    this._handler = new WindEarth.ScreenSpaceEventHandler(cesiumViewer.scene.canvas)

    const that = this
    this._moveHandler = function(movement) {
      const windowPosition = that._cesiumViewer.camera.getPickRay(movement.endPosition)
      const cartesian = that._cesiumViewer.scene.globe.pick(windowPosition, that._cesiumViewer.scene)
      if (cartesian) {
        that._toolTipEntity.position = cartesian
        that._toolTipEntity.label.show = true
        that._toolTipEntity.label.text = '单击选择'
      } else {
        that._toolTipEntity.label.show = false
      }
    }
  }

  /**
     * 开启选择
     */
  startSelect () {
    this.endSelect()
    this._toolTipEntity = this._cesiumViewer.entities.add(this._tooltipOption)
    const that = this
    // 鼠标移动时，展示提示框
    this._handler.setInputAction(this._moveHandler, WindEarth.ScreenSpaceEventType.MOUSE_MOVE)
    // 单击时进行单选
    this._handler.setInputAction(function(movement) {
      const pickedObject = that._cesiumViewer.scene.pick(movement.position)
      if (WindEarth.defined(pickedObject)) {
        if (that._selectLinstener) {
          that._selectLinstener(pickedObject.id)
        }
      }
    }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }

  /**
     * 结束删除
     */
  endSelect () {
    if (this._toolTipEntity) {
      this._cesiumViewer.entities.remove(this._toolTipEntity)
      this._toolTipEntity = null
    }
    this._handler.removeInputAction(WindEarth.ScreenSpaceEventType.MOUSE_MOVE)
    this._handler.removeInputAction(WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }
}

/**
 * 提示框Entity的Options
 */
function getToolTipEntityOptions () {
  return {
    label: {
      show: false,
      showBackground: true,
      font: '14px monospace',
      horizontalOrigin: WindEarth.HorizontalOrigin.LEFT,
      verticalOrigin: WindEarth.VerticalOrigin.TOP,
      pixelOffset: new WindEarth.Cartesian2(15, 0),
      disableDepthTestDistance: 1000000000000
    }
  }
}
