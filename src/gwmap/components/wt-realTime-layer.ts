// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const wtLayerRealtime:any = {}
let wtModuleRealtime:any = null
let model:any = null
let wtFeatureLayerRealtime:any = null
let ellipseLayerRealtime:any = null
let arrDataList:any = []
let editFeatureEntityHelperRealtime:any = null
wtLayerRealtime.load = function (dataList:any) {
  editFeatureEntityHelperRealtime = new WindEarth.EditFeatureEntityHelper(gwmap.viewer)
  wtLayerRealtime.remove()
  if (!dataList) return
  wtModuleRealtime = new WindEarth.ModelWithBillboardModule(gwmap.viewer)
  dataList.forEach((item:any) => {
    wtModuleRealtime.loadModelWithBillboard({
      id: item.turbine_id,
      name: item.turbine_name,
      positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.elevation || 0],
      url: '/models/turbine25.glb',
      highLightColor: 'green'
    })
  })
  wtModuleRealtime.layerLocation()
}
wtLayerRealtime.locationModel = (name:any) => {
  wtModuleRealtime.modelLocation([name])
  wtModuleRealtime.setModelHighLight(name, true)
}

wtLayerRealtime.loadWt = function (dataList:any, call = function () { }) {
  wtLayerRealtime.remove()
  // gwmap.viewer.scene.depthTestAgainstTerrain = false;
  editFeatureEntityHelperRealtime = new WindEarth.EditFeatureEntityHelper(gwmap.viewer)
  if (!dataList) return
  if (!wtFeatureLayerRealtime) {
    wtFeatureLayerRealtime = new WindEarth.FeatureEntityLayer(gwmap.viewer)
    wtFeatureLayerRealtime.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res:any) => {
      //  风机不能移动原因   xyh是因为没有自由风速free_speed  自动优化排布是因为没有feature
      setTimeout(() => {
        if (!res.feature || !res.position) {
          // if (!store.state.status.moveAuto) return
          // store.commit('clickFanWt', null)
        } else {
          if (!String(res.feature.id).includes('_label')) {
            // if (!res.feature.styleOptions.turbine.free_speed && res.feature.styleOptions.turbine.free_speed !== 0) {
            //   return
            // }
            model = res.feature
            // store.commit('clickFanWt', Object.assign({
            //   x: res.position.x,
            //   y: res.position.y,
            //   show: true
            // }, res.feature.styleOptions.turbine))
          } else {
            wtLayerRealtime.zoomToFeature(res.feature._id)
          }
        }
      }, 0)
    })
    // 弹窗地图跟随事件
    wtFeatureLayerRealtime.bindRotateEventFunc(function (res:any) {
      // if (res.position && res.position.x && res.position.y) {
      //   if (store.state.app.clickFanWtData && store.state.app.clickFanWtData.x && store.state.app.clickFanWtData.show) {
      //     if (res.position.x !== store.state.app.clickFanWtData.x && res.position.y !== store.state.app.clickFanWtData.y) {
      //       store.commit('clickFanWt', Object.assign({
      //         x: res.position.x,
      //         y: res.position.y,
      //         show: true
      //       }, res.feature.styleOptions.turbine))
      //     }
      //   }
      // } else {
      //   store.commit('clickFanWt', null)
      // }
    })
    // 地图点击关闭弹窗
    const handler = new WindEarth.ScreenSpaceEventHandler(gwmap.viewer.scene.canvas)
    handler.setInputAction(function (event:any) {
      // store.commit('clickFanWt', null)
    }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }
  arrDataList = dataList

  dataList.forEach((item:any, index:number) => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback:any) => {
      if (callback) {
        item.heights = callback[0][2] || 0
      } else {
        item.heights = 0
      }
      createWtModel(item)
      if (index === dataList.length - 1) {
        setTimeout(() => {
          call()
        }, 500)
      }
    })
  })
}
wtLayerRealtime.getFeatureEntityById = function (id:any) {
  return wtFeatureLayerRealtime.getFeatureEntityById(id)
}
wtLayerRealtime.createModel = function (item:any) {
  return createWtModel(item)
}
// 定位当前风机
wtLayerRealtime.zoomToFeature = function (wtId:any, t:any, y:any) {
  let entities = null
  if (Array.isArray(wtId)) {
    entities = wtId.map(v => {
      return wtFeatureLayerRealtime.getFeatureEntityById(v)
    })
  } else {
    entities = wtFeatureLayerRealtime.getFeatureEntityById(wtId)
  }
  gwmap.viewer.flyTo(entities, {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 2000)
  })
}

// 修改风机label属性
wtLayerRealtime.changeWtProperty = (turbine:any, color = null) => {
  if (!wtFeatureLayerRealtime) return
  const labelFeature = wtFeatureLayerRealtime.getFeatureEntityById(turbine.turbine_id + '_label')
  if (!labelFeature) return
  labelFeature.changeFeatureProperty({
    styleOptions: {
      url: getLabel(turbine, color).url
    }
  })
}

wtLayerRealtime.remove = function () {
  // if (!wtModuleRealtime) return
  // wtModuleRealtime.removeAll()
  // wtModuleRealtime = null

  if (!wtFeatureLayerRealtime) return
  // gwmap.viewer.scene.depthTestAgainstTerrain = true;
  wtFeatureLayerRealtime.unbindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  wtFeatureLayerRealtime.unbindRotateEventFunc()
  wtFeatureLayerRealtime.removeFromViewer()
  wtFeatureLayerRealtime = null
  // store.commit('clickFanWt', null)
}

wtLayerRealtime.removeEllipse = () => {
  if (!ellipseLayerRealtime) return
  ellipseLayerRealtime.removeAll()
  ellipseLayerRealtime = null
}
// 点击移动风机坐标
wtLayerRealtime.yiMove = () => {
  // const arr = []
  editFeatureEntityHelperRealtime.setEditMode(1)
  editFeatureEntityHelperRealtime.setFeatureEntityEditMode(model, true)
  editFeatureEntityHelperRealtime.handler.removeInputAction(WindEarth.MouseEventType.LEFT_CLICK)
  editFeatureEntityHelperRealtime.setEditedFeature(model)
  // const { x, y } = store.state.app.clickFanWtData
  // model['leftClick']({ x, y })
  // var start = model.coord
  // model.addListener('dragEnd', function (feature) {
  //   const { coord, id } = feature.entity
  //   store.commit('clickNowFan', { coord, id })
  //   const labelFeature = wtFeatureLayerRealtime.getFeatureEntityById(model.id + '_label')
  //   if (!labelFeature) return
  //   labelFeature.changeFeatureProperty({
  //     positions: coord
  //   })
  //   // let xy = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [start[0], start[1]]);
  //   // let xy1 = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [coord[0], coord[1]]);
  //   store.commit('putMoveData', {
  //     x: coord[0] - start[0],
  //     y: coord[1] - start[1],
  //     lon: coord[0],
  //     lat: coord[1],
  //     id
  //   })
  // })
}

wtLayerRealtime.wtDel = () => {
  editFeatureEntityHelperRealtime.setEditMode(1)
  editFeatureEntityHelperRealtime.setFeatureEntityEditMode(model, true)
  const labelFs = wtFeatureLayerRealtime.getFeatureEntityById(model.id + '_label')
  wtFeatureLayerRealtime.removeFeatureEntity(model)
  wtFeatureLayerRealtime.removeFeatureEntity(labelFs)
}

// 开启编辑
wtLayerRealtime.editStart = () => {
  // 设置可以进行编辑的要素Entity
  wtFeatureLayerRealtime.entities.values.forEach((entity:any) => {
    editFeatureEntityHelperRealtime.setFeatureEntityEditMode(entity, true)
  })
  wtLayerRealtime.nodeEdit()
}
// 节点编辑
wtLayerRealtime.nodeEdit = () => {
  // 设置当前的编辑模式为节点编辑
  editFeatureEntityHelperRealtime.setEditMode(1)
  editFeatureEntityHelperRealtime.moveEndEvent.addEventListener(function (event:any) {
    console.log(event)
  })
}

wtLayerRealtime.loadWtEllipse = (param:any, wtList:any) => {
  wtLayerRealtime.removeEllipse()
  if (!wtList) return
  if (!ellipseLayerRealtime) {
    ellipseLayerRealtime = new WindEarth.FeatureEntityLayer(gwmap.viewer)
  }
  wtList.forEach((item:any) => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback:any) => {
      if (callback) {
        item.heights = callback[0][2] || 0
      } else {
        item.heights = 0
      }
      createWtEllipse(item, param)
    })
  })
}

// 风机范围定位
wtLayerRealtime.layerLocation = function (t:any, y:any) {
  if (!wtFeatureLayerRealtime) return
  wtFeatureLayerRealtime.locationLayer({
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 25000) // -0.2, 16000
  })
}

// 标签显影
wtLayerRealtime.lableShow = function (id:any, isShow:any) {
  if (!wtFeatureLayerRealtime || arrDataList.length <= 0) return
  arrDataList.forEach((item:any) => {
    const labelFs = wtFeatureLayerRealtime.getFeatureEntityById(item.turbine_id + '_label')
    labelFs._show = isShow
  })
}
wtLayerRealtime.wtLayerLocation = function () {
  wtLayerRealtime.layerLocation()
}

export default wtLayerRealtime

// 添加标签and模型
function createWtModel (item:any) {
  try {
    const labelEntity = addLabelLayer(item, '')
    wtFeatureLayerRealtime.addFeatureEntity(labelEntity)
    const modelEntity = addModelLayer(item)
    wtFeatureLayerRealtime.addFeatureEntity(modelEntity)
  } catch (err) {
    console.log(err)
  }

  // wtLayerRealtime.layerLocation()
}

// 移动刷新单个风机
wtLayerRealtime.putWt = function (model:any) {
  wtFeatureLayerRealtime && wtFeatureLayerRealtime.removeFeatureEntityById(model.turbine_id)
  wtFeatureLayerRealtime && wtFeatureLayerRealtime.removeFeatureEntityById(model.turbine_id + '_label')
  const modelEntity = addModelLayer(model)
  wtFeatureLayerRealtime.addFeatureEntity(modelEntity)
  const labelEntity = addLabelLayer(model, '')
  wtFeatureLayerRealtime.addFeatureEntity(labelEntity)
}

// 模型
function addModelLayer (item:any) {
  const modelEntity = new WindEarth.ModelFeatureEntity({
    id: item.turbine_id,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    orientation: {
      head: item.wind_dir ? item.wind_dir + 180 : 140,
      tilt: 0,
      roll: 0
    },
    styleOptions: {
      turbine: item,
      url: '/models/2.0机组动态.gltf',
      heightReference: item.heights ? 0 : 1,
      color: '#FFF',
      colorBlendAmount: 0.22,
      // colorBlendMode: WindEarth.ColorBlendMode.HIGHLIGHT,
      // scale: 2.5,
      scale: 1.0,
      // minimumPixelSize: 20,
      maximumScale: 1,
      distanceDisplayCondition: {
        near: 0,
        far: 100000
      }
    }
  })
  return modelEntity
}
// 标签
function addLabelLayer (item:any, isHighLight:any) {
  const itemLabel = getLabel(item, isHighLight)
  const labelEntity = new WindEarth.BillBoardFeatureEntity({
    id: item.turbine_id + '_label',
    // name: item.turbine_name,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    styleOptions: {
      url: itemLabel.url,
      name: item.turbine_name,
      scale: 0.9,
      heightReference: item.heights ? 0 : 1,
      width: itemLabel.width,
      height: itemLabel.height,
      horizontalOrigin: WindEarth.HorizontalOrigin.LEFT,
      verticalOrigin: WindEarth.VerticalOrigin.BOTTOM,
      // eyeOffset: new WindEarth.Cartesian3(0, 0, -100),
      pixelOffset: new WindEarth.Cartesian2(-1, 0), // 左右，前后
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1.2, 7500, 0.5),
      distanceDisplayCondition: {
        near: 0,
        far: 100000 // 最远显示距离
      },
      disableDepthTestDistance: 200
    }
  })
  // labelEntity.polyline = {
  //   positions: WindEarth.Cartesian3.fromDegreesArrayHeights([item.longitude, item.latitude, item.heights, item.longitude, item.latitude, item.heights + 90]),
  //   material: WindEarth.Color.RED,
  //   depthFailMaterial: WindEarth.Color.RED,
  //   width: 3.0
  // };
  return labelEntity
}

function getLabel (turbine:any, color:any) {
  if (turbine) { // store.state.app.canvasStatus
    // return labelSmall(turbine, color)
    return labelBig(turbine, color)
  } else {
    // return labelBig(turbine, color)
    return labelSmall(turbine, color)
  }
}
// 显示实时风速、功率
function labelBig (turbine:any, color:any) {
  if (color === undefined || color === '') {
    color = '64, 255, 253'
  }
  let canvas = null
  // const ctx = null
  const result = {
    url: '',
    width: 190,
    height: 120
  }
  // canvas = document.createElement('canvas')
  // canvas.width = 128
  // canvas.height = 166
  // ctx = canvas.getContext('2d')
  // ctx.fillStyle = color || ((turbine.checked && turbine.checked !== '0') ? '#8883FF' : '#2DFFFE')
  // ctx.beginPath()
  // ctx.arc(64, 89, 61, 0, Math.PI * 2, true)
  // ctx.closePath()
  // ctx.fill()

  // ctx.strokeStyle = '#EBF2E4'
  // ctx.lineWidth = '4'
  // ctx.stroke()

  // ctx.beginPath()
  // ctx.moveTo(52, 145)
  // ctx.lineTo(76, 145)
  // ctx.lineTo(64, 162)
  // ctx.fill()

  // ctx.beginPath()
  // ctx.moveTo(51, 149)
  // ctx.lineTo(64, 162)
  // ctx.lineTo(77, 149)
  // ctx.stroke()

  // ctx.font = `${turbine.turbine_name.length > 4 ? (turbine.turbine_name.length > 5 ? 32 : 36) : 40}px bolder Microsoft YaHei`
  // ctx.fillStyle = '#4d2b05'
  // ctx.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  // ctx.fillText(turbine.turbine_name, 64, 107)
  canvas = document.createElement('canvas')
  canvas.width = 320
  canvas.height = 300
  // ctx = canvas.getContext('2d')
  // var myCanvas = document.getElementById("myCanvas"); //获取canvas对象
  const cxt:any = canvas.getContext('2d')

  // 绘制一个圆角矩形
  // strokeRoundRect(context, 10, 10, 100, 50, 10);

  // 绘制并填充一个圆角矩形
  strokeRoundRect(cxt, 40, 11, 230, 280, 10, '#fff', null)

  fillRoundRect(cxt, 50, 32, 210, 235, 4, `rgba(${color}, 1)`)

  fillRoundRect(cxt, 44, 26, 222, 247, 7, `rgba(${color}, 0.4)`)

  /** 该方法用来绘制一个有填充色的圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param fillColor:填充颜色
   **/
  function fillRoundRect (cxt:any, x:any, y:any, width:any, height:any, radius:any, fillColor:any) {
    // 圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false }

    cxt.save()
    cxt.translate(x, y)
    // 绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius)
    cxt.fillStyle = fillColor || '#fff' // 若是给定了值就用给定的值否则给予默认值
    cxt.fill()
    cxt.restore()
  }

  /** 该方法用来绘制圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param lineWidth:线条粗细
   *@param strokeColor:线条颜色
   **/

  function strokeRoundRect (cxt:any, x:any, y:any, width:any, height:any, radius:any, lineWidth:any, strokeColor:any) {
    // 圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false }

    cxt.save()
    cxt.translate(x, y)
    // 绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius)
    cxt.lineWidth = lineWidth || 2 // 若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle = strokeColor || '#fff'
    cxt.stroke()
    cxt.restore()
  }

  function drawRoundRectPath (cxt:any, width:any, height:any, radius:any) {
    cxt.beginPath(0)
    // 从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2)

    // 矩形下边线
    cxt.lineTo(radius, height)

    // 左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)

    // 矩形左边线
    cxt.lineTo(0, radius)

    // 左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)

    // 上边线
    cxt.lineTo(width - radius, 0)

    // 右上角圆弧
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

    // 右边线
    cxt.lineTo(width, height - radius)
    cxt.lineWidth = 1
    cxt.closePath()
  }
  // var draw = function (x1, y1, x2, y2, x3, y3, color, type) {
  //   cxt.beginPath()
  //   cxt.moveTo(x1, y1)
  //   cxt.lineTo(x2, y2)
  //   cxt.lineTo(x3, y3)
  //   cxt[type + 'Style'] = color
  //   cxt.closePath()
  //   cxt[type]()
  // }
  cxt.beginPath()
  cxt.fillStyle = 'rgba(255, 255, 255, 0)'
  cxt.fillRect(27, 28, 10, 20)

  cxt.closePath()
  cxt.beginPath()
  cxt.fillStyle = 'rgba(255, 255, 255, 0)'
  cxt.fillRect(135, 28, 10, 20)

  cxt.closePath()
  // draw(27,32,27,46,36,40,'rgba(64, 255, 253, 1)','fill')
  // draw(143,32,143,46,134,40,'rgba(64, 255, 253, 1)','fill')
  // draw(80,55,86,55,83,62,'rgba(64, 255, 253, 1)','fill')
  cxt.beginPath()
  cxt.moveTo(0, 40)
  cxt.lineTo(0, 200)
  cxt.strokeStyle = '#fff'

  // cxt.stroke();
  cxt.moveTo(0, 40)
  cxt.lineTo(40, 40)
  cxt.lineWidth = 1
  cxt.stroke()
  cxt.closePath()

  cxt.arc(10, 10, 20, 0, 1.5 * Math.PI, true)
  cxt.font = '8px bolder Microsoft YaHei'
  cxt.fillStyle = '#4d2b05'
  // cxt.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  cxt.fillText(turbine.turbine_name, 55, 90)
  cxt.fillText(`风速:  ${turbine.free_speed == null ? '-' : turbine.free_speed}m/s`, 55, 155)
  cxt.fillText('功率:  -30000W', 55, 226)

  result.url = canvas.toDataURL('image/png', 1.0)
  return result
}
// 不显示实时数据
function labelSmall (turbine:any, color:any) {
  if (color === undefined || color === '') {
    color = '64, 255, 253'
  }
  let canvas = null
  // const ctx = null
  const result = {
    url: '',
    width: 190,
    height: 120
  }
  // canvas = document.createElement('canvas')
  // canvas.width = 128
  // canvas.height = 166
  // ctx = canvas.getContext('2d')
  // ctx.fillStyle = color || ((turbine.checked && turbine.checked !== '0') ? '#8883FF' : '#2DFFFE')
  // ctx.beginPath()
  // ctx.arc(64, 89, 61, 0, Math.PI * 2, true)
  // ctx.closePath()
  // ctx.fill()

  // ctx.strokeStyle = '#EBF2E4'
  // ctx.lineWidth = '4'
  // ctx.stroke()

  // ctx.beginPath()
  // ctx.moveTo(52, 145)
  // ctx.lineTo(76, 145)
  // ctx.lineTo(64, 162)
  // ctx.fill()

  // ctx.beginPath()
  // ctx.moveTo(51, 149)
  // ctx.lineTo(64, 162)
  // ctx.lineTo(77, 149)
  // ctx.stroke()

  // ctx.font = `${turbine.turbine_name.length > 4 ? (turbine.turbine_name.length > 5 ? 32 : 36) : 40}px bolder Microsoft YaHei`
  // ctx.fillStyle = '#4d2b05'
  // ctx.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  // ctx.fillText(turbine.turbine_name, 64, 107)
  canvas = document.createElement('canvas')
  canvas.width = 190
  canvas.height = 120
  // ctx = canvas.getContext('2d')
  // var myCanvas = document.getElementById("myCanvas"); //获取canvas对象
  const cxt:any = canvas.getContext('2d')

  // 绘制一个圆角矩形
  // strokeRoundRect(context, 10, 10, 100, 50, 10);

  // 绘制并填充一个圆角矩形
  strokeRoundRect(cxt, 40, 11, 105, 57, 10, '#fff', null)

  fillRoundRect(cxt, 50, 22, 85, 35, 4, `rgba(${color}, 1)`)

  fillRoundRect(cxt, 44, 16, 97, 47, 7, `rgba(${color}, 0.4)`)

  /** 该方法用来绘制一个有填充色的圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param fillColor:填充颜色
   **/
  function fillRoundRect (cxt:any, x:any, y:any, width:any, height:any, radius:any, fillColor:any) {
    // 圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false }

    cxt.save()
    cxt.translate(x, y)
    // 绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius)
    cxt.fillStyle = fillColor || '#fff' // 若是给定了值就用给定的值否则给予默认值
    cxt.fill()
    cxt.restore()
  }

  /** 该方法用来绘制圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param lineWidth:线条粗细
   *@param strokeColor:线条颜色
   **/

  function strokeRoundRect (cxt:any, x:any, y:any, width:any, height:any, radius:any, lineWidth:any, strokeColor:any) {
    // 圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false }

    cxt.save()
    cxt.translate(x, y)
    // 绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius)
    cxt.lineWidth = lineWidth || 2 // 若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle = strokeColor || '#fff'
    cxt.stroke()
    cxt.restore()
  }

  function drawRoundRectPath (cxt:any, width:any, height:any, radius:any) {
    cxt.beginPath(0)
    // 从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2)

    // 矩形下边线
    cxt.lineTo(radius, height)

    // 左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)

    // 矩形左边线
    cxt.lineTo(0, radius)

    // 左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)

    // 上边线
    cxt.lineTo(width - radius, 0)

    // 右上角圆弧
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

    // 右边线
    cxt.lineTo(width, height - radius)
    cxt.lineWidth = 1
    cxt.closePath()
  }
  // var draw = function (x1:any, y1:any, x2:any, y2:any, x3:any, y3:any, color:any, type:any) {
  //   cxt.beginPath()
  //   cxt.moveTo(x1, y1)
  //   cxt.lineTo(x2, y2)
  //   cxt.lineTo(x3, y3)
  //   cxt[type + 'Style'] = color
  //   cxt.closePath()
  //   cxt[type]()
  // }
  cxt.beginPath()
  cxt.fillStyle = 'rgba(255, 255, 255, 0)'
  cxt.fillRect(27, 28, 10, 20)

  cxt.closePath()
  cxt.beginPath()
  cxt.fillStyle = 'rgba(255, 255, 255, 0)'
  cxt.fillRect(135, 28, 10, 20)

  cxt.closePath()
  // draw(27,32,27,46,36,40,'rgba(64, 255, 253, 1)','fill')
  // draw(143,32,143,46,134,40,'rgba(64, 255, 253, 1)','fill')
  // draw(80,55,86,55,83,62,'rgba(64, 255, 253, 1)','fill')
  cxt.beginPath()
  cxt.moveTo(0, 40)
  cxt.lineTo(0, 200)
  cxt.strokeStyle = '#fff'

  // cxt.stroke();
  cxt.moveTo(0, 40)
  cxt.lineTo(40, 40)
  cxt.lineWidth = 1
  cxt.stroke()
  cxt.closePath()

  cxt.arc(10, 10, 20, 0, 1.5 * Math.PI, true)
  cxt.font = '25px bolder Microsoft YaHei'
  cxt.fillStyle = '#4d2b05'
  cxt.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  cxt.fillText(turbine.turbine_name, 90, 50)

  result.url = canvas.toDataURL('image/png', 1.0)
  return result
}
// 添加椭圆
function createWtEllipse (item:any, param:any) {
  const ellipseEntity = addEllipseLayer(item, param)
  ellipseLayerRealtime.addFeatureEntity(ellipseEntity)
}
// 椭圆
function addEllipseLayer (item:any, param:any) {
  const d = item.drotor
  const ellipseEntity = new WindEarth.Entity({
    position: WindEarth.Cartesian3.fromDegrees(item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0),
    name: item.nearest_turbine_name ? item.nearest_turbine_name : '1',
    ellipse: {
      // heightReference: 2,
      // height: 10,
      height: item.heights + 15,
      semiMajorAxis: Number(param.radiusLong) * d,
      semiMinorAxis: Number(param.radiusShort) * d,
      fill: true,
      material: WindEarth.Color.fromBytes(44, 208, 185).withAlpha(0.5),
      rotation: WindEarth.Math.toRadians(360 - param.direction + 90),
      granularity: Math.PI / 1200, // 调节曲线圆润度
      outline: true, // 可选的boolean属性，指定是否绘制椭圆。
      outlineColor: WindEarth.Color.fromBytes(44, 208, 185), // 可选一个指定Color轮廓的属性。
      outlineWidth: 5
    }
  })
  return ellipseEntity
}
