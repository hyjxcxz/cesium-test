const earthRadius = 6371008.8

function degreesToRadians (degrees) {
  const radians = degrees % 360
  return radians * Math.PI / 180
}

/**
 * 计算点位距离
 * @param {Array} coordinates1 [lng,lat]
 * @param {Array} coordinates2 [lng,lat]
 */
export function distanceTo (coordinates1, coordinates2) {
  const dLon = degreesToRadians((coordinates2[0] - coordinates1[0]))
  const dLat = degreesToRadians((coordinates2[1] - coordinates1[1]))
  const lat1 = degreesToRadians(coordinates1[1])
  const lat2 = degreesToRadians(coordinates2[1])
  const a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2)
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * earthRadius
}
/**
 * 计算路径距离
 * @param {*} coordinatess 坐标数组
 * @param {*} fixed 结果保留位数
 */
export function getDistance (coordinatess, fixed = 2) {
  let distance = 0
  if (!coordinatess || coordinatess.length === 0) return distance
  for (let i = 0; i < coordinatess.length - 1; i++) {
    distance += distanceTo(coordinatess[i], coordinatess[i + 1])
  }
  return Number(distance.toFixed(fixed))
}

/**
 * 计算多边形面积，返回单位为平方米
 * @param {Array} latLngs [[lng,lat],[lng,lat]]
 */
export function getArea (latLngs, fixed = 2) {
  const pointsCount = latLngs.length
  let area = 0.0
  const d2r = Math.PI / 180
  let p1
  let p2

  if (pointsCount > 2) {
    for (let i = 0; i < pointsCount; i++) {
      p1 = latLngs[i]
      p2 = latLngs[(i + 1) % pointsCount]
      area += ((p2[0] - p1[0]) * d2r) * (2 + Math.sin(p1[1] * d2r) + Math.sin(p2[1] * d2r))
    }
    area = area * 6378137.0 * 6378137.0 / 2.0
  }

  return Number(Math.abs(area).toFixed(fixed))
}

/**
 * 返回用于显示的面积
 * @param {Number} area 面积，单位为平方米
 * @param {Number} fixed 保留小数位数
 */
export function getReadableArea (area, fixed = 2, cn = true) {
  if (isNaN(area) || area < 0) return area

  if (area < 10000) {
    return area.toFixed(fixed) + (cn ? '平方米' : 'm²')
  } else if (area < 1000000) {
    return (area / 10000).toFixed(fixed) + (cn ? '公顷' : 'ha')
  } else if (area < 10000000000) {
    return (area / 1000000).toFixed(fixed) + (cn ? '平方公里' : 'km²')
  } else {
    return (area / 10000000000).toFixed(fixed) + (cn ? '万平方公里' : '万km²')
  }
}

/**
 * 返回用于显示的长度
 * @param {Number} distance 面积，单位为平方米
 * @param {Number} fixed 保留小数位数
 */
export function getReadableDistance (distance, fixed = 2, cn = true) {
  if (isNaN(distance) || distance < 0) return distance

  if (distance < 1000) {
    return distance.toFixed(fixed) + (cn ? '米' : 'm')
  } else if (distance < 10000000) {
    return (distance / 1000).toFixed(fixed) + (cn ? '公里' : 'km')
  } else {
    return (distance / 10000000).toFixed(fixed) + (cn ? '万公里' : '万km')
  }
}
