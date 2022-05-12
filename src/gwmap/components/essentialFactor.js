const essentialFactor = {}

let essentialFactorModel = null

let essentialFactorId = []

essentialFactor.load = function(options, data) {
  let flag = essentialFactorId.some(item => item.title == data.file_name)
  if (flag) {
    essentialFactorId.forEach(item => {
      if (item.title == data.file_name) {
        if (item.num[1] == data.buffer_size) return
        if (item.num.length == 2) {
          essentialFactor.remove(item.options1, item.data1, false, 2)
        }
        item.data1 = data
        item.options1 = options
        item.num.splice(1, 1, data.buffer_size)
        randerTwo(item.options1, item.data1)
      }
    })
  } else {
    let obj = {
      title: data.file_name,
      num: [data.buffer_size],
      data: data,
      options: options,
      data1: null,
      options1: null
    }
    essentialFactorId.push(obj)
  }

  // console.log(essentialFactorId)

  if (!essentialFactorModel) {
    essentialFactorModel = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
      id: 'essentialFactor'
    })
  }


  let color = null
  let borderColor = null
  switch (data.file_name) {
    case "wind_line":
      color = "rgba(155,80,160,1)"
      borderColor = null
      break;
    case "wind_house":
      color = "rgba(193,204,165,1)"
      borderColor = "rgba(132, 161, 114,1)"
      break;
    case "wind_lakes":
      color = "rgba(120,177,190,1)"
      borderColor = "rgba(41,76,183,1)"
      break;
    default:
      color = "rgba(160,84,25,1)"
      borderColor = "rgba(176,14,30,1)"
      break;
  }

  options.forEach((item, index) => {
    if (item.type == "LineString") {
      essentialFactorModel.addFeatureEntity(addPolylineEntity(item.coordinates, data.file_name + index, color))
    } else if (item.type == "Polygon") {
      essentialFactorModel.addFeatureEntity(addPolygonLayer(item.coordinates[0], data.file_name + index, color, borderColor))
    } else if (item.type == "point") {
      // 点
    }
  })
}

// 渲染第二个对比
function randerTwo (options, data) {
  let color = null
  let borderColor = null
  switch (data.file_name) {
    case "wind_line":
      color = "rgba(155,80,160,0.3)"
      borderColor = null
      break;
    case "wind_house":
      color = "rgba(193,204,165,0.3)"
      borderColor = "rgba(132, 161, 114,1)"
      break;
    case "wind_lakes":
      color = "rgba(120,177,190,0.3)"
      borderColor = "rgba(41,76,183,1)"
      break;
    default:
      color = "rgba(160,84,25,0.3)"
      borderColor = "rgba(176,14,30,1)"
      break;
  }

  options.forEach((item, index) => {
    if (item.type == "LineString") {
      essentialFactorModel.addFeatureEntity(addPolylineEntity(item.coordinates, data.file_name + 'two' + index, color))
    } else if (item.type == "Polygon") {
      essentialFactorModel.addFeatureEntity(addPolygonLayer(item.coordinates[0], data.file_name + 'two' + index, color, borderColor))
    } else if (item.type == "point") {
      // 点
    }
  })
}


// 折线
function addPolylineEntity (options, id, color) {
  const polylineEntity = new WindEarth.PolyLineFeatureEntity({
    id: id,
    positions: options,
    styleOptions: {
      color: color,
      heightReference: 0,
      width: 15,
    }
  })
  return polylineEntity
}

// 多边形
function addPolygonLayer (options, id, color, borderColor) {
  const polygonEntity = new WindEarth.PolygonFeatureEntity({
    id: id,
    positions: options,
    styleOptions: {
      fill: true,
      color: color,
      heightReference: 1,
      // outLine: !borderColor ? true : false,
      outLine: false,
      lineStyle: {
        color: "#fff",
        width: 40,
        clampToGround: true
      }
    }
  })
  return polygonEntity
}


essentialFactor.remove = function(options, data, flag = false, num) {
  if (num == 2) {
    essentialFactorId.forEach(item => {
      if (item.title == data.file_name) {
        if (item.num.length == 2) {
          item.options1.forEach((i, index) => {
            essentialFactorModel.removeFeatureEntity(essentialFactorModel.getFeatureEntityById(item.data1.file_name + 'two' + index))
          })
        }
        item.num.splice(1, 1)
        item.data1 = null
        item.options1 = null
      }
    })
    return
  }
  if (flag) {
    essentialFactorId.forEach(i => {
      if (i.title == data.file_name) {
        i.options.forEach((item, index) => {
          essentialFactorModel.removeFeatureEntity(essentialFactorModel.getFeatureEntityById(i.data.file_name + index))
        })
        if (i.num.length == 2) {
          i.options1.forEach((item, index) => {
            essentialFactorModel.removeFeatureEntity(essentialFactorModel.getFeatureEntityById(i.data1.file_name + 'two' + index))
          })
        }
      }
    })
    essentialFactorId = essentialFactorId.filter(item => item.title != data.file_name)
  } else {
    options.forEach((item, index) => {
      essentialFactorModel.removeFeatureEntity(essentialFactorModel.getFeatureEntityById(data.file_name + index))
    })
  }
}

essentialFactor.removeAll = function() {
  if (essentialFactorModel) {
    essentialFactorModel.removeAll()
  }
  essentialFactorModel = null
  essentialFactorId = []
}

export default essentialFactor


// const essentialFactor = {}

// let essentialFactorModel = null

// let essentialFactorId = []
// let num = []

// essentialFactor.load = function(options, data) {
//   if (!data.buffer_size || data.buffer_size <= 0) return
//   if (essentialFactorId.length > 0 && essentialFactorId.indexOf(data.file_name) != -1) {
//     let i = essentialFactorId.indexOf(data.file_name)
//     if (num[i] == data.buffer_size) {
//       return
//     } else {
//       essentialFactor.remove(options, data)
//     }
//   }
//   essentialFactorId.push(data.file_name)
//   num.push(data.buffer_size)
//   if (!essentialFactorModel) {
//     essentialFactorModel = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
//       id: 'essentialFactor'
//     })
//   }


//   let color = null
//   let borderColor = null
//   switch (data.file_name) {
//     case "wind_line":
//       color = "rgba(155,80,160,1)"
//       borderColor = null
//       break;
//     case "wind_house":
//       color = "rgba(193,204,165,1)"
//       borderColor = "rgba(132, 161, 114,1)"
//       break;
//     case "wind_lakes":
//       color = "rgba(120,177,190,1)"
//       borderColor = "rgba(41,76,183,1)"
//       break;
//     default:
//       color = "rgba(160,84,25,1)"
//       borderColor = "rgba(176,14,30,1)"
//       break;
//   }

//   options.forEach((item, index) => {
//     if (item.type == "LineString") {
//       essentialFactorModel.addFeatureEntity(addPolylineEntity(item.coordinates, data.file_name + index, color))
//     } else if (item.type == "Polygon") {
//       essentialFactorModel.addFeatureEntity(addPolygonLayer(item.coordinates[0], data.file_name + index, color, borderColor))
//     } else if (item.type == "point") {
//       // 点
//     }
//   })
// }


// // 折线
// function addPolylineEntity (options, id, color) {
//   const polylineEntity = new WindEarth.PolyLineFeatureEntity({
//     id: id,
//     positions: options,
//     styleOptions: {
//       color: color,
//       heightReference: 0,
//       width: 15,
//     }
//   })
//   return polylineEntity
// }

// // 多边形
// function addPolygonLayer (options, id, color, borderColor) {
//   const polygonEntity = new WindEarth.PolygonFeatureEntity({
//     id: id,
//     positions: options,
//     styleOptions: {
//       fill: true,
//       color: color,
//       heightReference: 1,
//       // outLine: !borderColor ? true : false,
//       outLine: false,
//       lineStyle: {
//         color: "#fff",
//         width: 40,
//         clampToGround: true
//       }
//     }
//   })
//   return polygonEntity
// }


// essentialFactor.remove = function(options, data) {
//   let i = essentialFactorId.indexOf(data.file_name)
//   essentialFactorId.splice(i, 1)
//   num.splice(i, 1)
//   options.forEach((item, index) => {
//     essentialFactorModel.removeFeatureEntity(essentialFactorModel.getFeatureEntityById(data.file_name + index))
//   })
// }

// essentialFactor.removeAll = function() {
//   if (essentialFactorModel) {
//     essentialFactorModel.removeAll()
//   }
//   essentialFactorModel = null
//   essentialFactorId = []
//   num = []
// }

// export default essentialFactor