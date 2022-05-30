import gwmap from '../index'
declare const WindEarth: any

const drawFeature:any = {}
let drawFeatureEntityHelper:any = null
let drawFeatureLayer:any = null
let InterpolationFunc:any = null

drawFeature.drawPolygonEntity = (call:any) => {
  if (!drawFeatureEntityHelper) {
    drawFeatureEntityHelper = new WindEarth.DrawFeatureEntityHelper(gwmap.viewer)
    drawFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
  }
  drawFeatureEntityHelper.drawPolygonFeature({
    styleOptions: {
      color: '#92ff4b',
      outline: false,
      // outlineColor: WindEarth.Color.BLACK.withAlpha(0.5),
      // material: WindEarth.Color.AQUA.withAlpha(0.5)
      lineStyle: {
        color: '#ff5329',
        width: 2.0
      }
    }
  }, function (billborad:any) {
    const position = billborad.polygon.hierarchy.getValue().positions
    const newbillborad = position.map((item: any) => {
      return cartesian2lonlat(item, false)
    })
    call(newbillborad)
    drawFeatureLayer.addFeatureEntity(billborad)
    // gwmap.viewer.flyTo(billborad)
  })
}

/**
 * Cesium笛卡尔空间坐标 转 经纬度坐标
 * 常用于转换geojson
 *
 * @param {Cartesian3} cartesian Cesium笛卡尔空间xyz坐标
 * @param {Boolean} noAlt 是否包含高度值
 * @return {Number[]} 经纬度坐标,示例：[123.123456,32.654321,198.7]
 */
function cartesian2lonlat (cartesian:any, noAlt:any) {
  const carto = WindEarth.Cartographic.fromCartesian(cartesian)
  if (carto == null) {
    return null
  }

  const x = formatNum(WindEarth.Math.toDegrees(carto.longitude), 6)
  const y = formatNum(WindEarth.Math.toDegrees(carto.latitude), 6)

  if (noAlt) {
    return [x, y]
  } else {
    const z = formatNum(carto.height, 1)
    return [x, y, z]
  }
}
// 格式化 数字 小数位数
function formatNum (num:any, digits:any) {
  return Number(num.toFixed(digits || 0))
}

drawFeature.checkPointInPolygon = (point:any, polygon:any) => {
  if (!point) return false
  InterpolationFunc = WindEarth.InterpolationFunc
  return InterpolationFunc.pointIsInPolygon(point, polygon)
}
drawFeature.remove = function () {
  if (!drawFeatureLayer) return
  drawFeatureLayer.removeFromViewer()
  drawFeatureLayer = null
  drawFeatureEntityHelper.stopDrawFeatureEntity()
  drawFeatureEntityHelper = null
}

export default drawFeature
