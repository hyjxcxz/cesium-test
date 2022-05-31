// import store from '@/store'
import gwmap from '../index'
declare const WindEarth:any

const wtLayer:any = {}
let wtModule:any = null
let model:any = null
let wtFeatureLayer:any = null
let ellipseLayer:any = null
let arrDataList:any = []
let editFeatureEntityHelper:any = null
wtLayer.load = function (dataList:any) {
  editFeatureEntityHelper = new WindEarth.EditFeatureEntityHelper(gwmap.viewer)
  wtLayer.remove()
  if (!dataList) return
  wtModule = new WindEarth.ModelWithBillboardModule(gwmap.viewer)
  dataList.forEach((item:any, index:any) => {
    wtModule.loadModelWithBillboard({
      id: item.turbine_id,
      name: item.turbine_name,
      positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.elevation || 0],
      url: '/models/turbine25.glb',
      highLightColor: 'green'
    })
  })
  wtModule.layerLocation()
}
wtLayer.locationModel = (name:any) => {
  wtModule.modelLocation([name])
  wtModule.setModelHighLight(name, true)
}

wtLayer.loadWt = function (dataList:any, call = function () { }) {
  wtLayer.remove()
  editFeatureEntityHelper = new WindEarth.EditFeatureEntityHelper(gwmap.viewer)
  if (!dataList) return
  if (!wtFeatureLayer) {
    wtFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
    wtFeatureLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res:any) => {
      //  风机不能移动原因   xyh是因为没有自由风速free_speed  自动优化排布是因为没有feature
      setTimeout(() => {
        if (!res.feature || !res.position) {
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
            wtLayer.zoomToFeature(res.feature._id)
          }
        }
      }, 0)
    })
    // 弹窗地图跟随事件
    wtFeatureLayer.bindRotateEventFunc(function (res:any) {
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

  dataList.forEach((item:any, index:any) => {
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
wtLayer.getFeatureEntityById = function (id:any) {
  return wtFeatureLayer.getFeatureEntityById(id)
}
wtLayer.createModel = function (item:any) {
  return createWtModel(item)
}
// 定位当前风机
wtLayer.zoomToFeature = function (wtId:any, t:any, y:any) {
  let entities = null
  if (Array.isArray(wtId)) {
    entities = wtId.map(v => {
      return wtFeatureLayer.getFeatureEntityById(v)
    })
  } else {
    entities = wtFeatureLayer.getFeatureEntityById(wtId)
  }
  gwmap.viewer.flyTo(entities, {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 2000)
  })
}

// 修改风机label属性
wtLayer.changeWtProperty = (turbine:any, color = null) => {
  if (!wtFeatureLayer) return
  const labelFeature = wtFeatureLayer.getFeatureEntityById(turbine.turbine_id + '_label')
  if (!labelFeature) return
  labelFeature.changeFeatureProperty({
    styleOptions: {
      url: getLabel(turbine, color).url
    }
  })
}

wtLayer.remove = function () {
  // if (!wtModule) return
  // wtModule.removeAll()
  // wtModule = null

  if (!wtFeatureLayer) return
  wtFeatureLayer.unbindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  wtFeatureLayer.unbindRotateEventFunc()
  wtFeatureLayer.removeFromViewer()
  wtFeatureLayer = null
  // store.commit('clickFanWt', null)
}

wtLayer.removeEllipse = () => {
  if (!ellipseLayer) return
  ellipseLayer.removeAll()
  ellipseLayer = null
}

// 点击移动风机坐标
wtLayer.yiMove = () => {
  // const arr = []
  editFeatureEntityHelper.setEditMode(1)
  editFeatureEntityHelper.setFeatureEntityEditMode(model, true)
  editFeatureEntityHelper.handler.removeInputAction(WindEarth.MouseEventType.LEFT_CLICK)
  editFeatureEntityHelper.setEditedFeature(model)
  // if (!store.state.app.clickFanWtData) return
  // const { x, y } = store.state.app.clickFanWtData
  // model['leftClick']({ x, y })
  // var start = model.coord
  // model.addListener('dragEnd', function (feature) {
  //   const { coord, id } = feature.entity
  //   store.commit('clickNowFan', { coord, id })
  //   const labelFeature = wtFeatureLayer.getFeatureEntityById(model.id + '_label')
  //   if (!labelFeature) return
  //   labelFeature.changeFeatureProperty({
  //     positions: coord
  //   })
  //   // let xy = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [start[0], start[1]]);
  //   // let xy1 = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [coord[0], coord[1]]);
  //   store.commit('putMoveData', {
  //     // x: xy1[0] - xy[0],
  //     // y: xy1[1] - xy[1],
  //     lon: coord[0] - start[0],
  //     lat: coord[1] - start[1]
  //   })
  // })
}

wtLayer.wtDel = () => {
  editFeatureEntityHelper.setEditMode(1)
  editFeatureEntityHelper.setFeatureEntityEditMode(model, true)
  const labelFs = wtFeatureLayer.getFeatureEntityById(model.id + '_label')
  wtFeatureLayer.removeFeatureEntity(model)
  wtFeatureLayer.removeFeatureEntity(labelFs)
}

// 开启编辑
wtLayer.editStart = () => {
  // 设置可以进行编辑的要素Entity
  wtFeatureLayer.entities.values.forEach((entity:any) => {
    editFeatureEntityHelper.setFeatureEntityEditMode(entity, true)
  })
  wtLayer.nodeEdit()
}
// 节点编辑
wtLayer.nodeEdit = () => {
  // 设置当前的编辑模式为节点编辑
  editFeatureEntityHelper.setEditMode(1)
  editFeatureEntityHelper.moveEndEvent.addEventListener(function (event:any) {
    console.log(event)
  })
}

wtLayer.loadWtEllipse = (param:any, wtList:any) => {
  wtLayer.removeEllipse()
  if (!wtList) return
  if (!ellipseLayer) {
    ellipseLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
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
wtLayer.layerLocation = function (t:any, y:any) {
  if (!wtFeatureLayer) return
  wtFeatureLayer.locationLayer({
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 25000) // -0.2, 16000
  })
}

// 标签显影
wtLayer.lableShow = function (id:any, isShow:any) {
  if (!wtFeatureLayer || arrDataList.length <= 0) return
  arrDataList.forEach((item:any) => {
    const labelFs = wtFeatureLayer.getFeatureEntityById(item.turbine_id + '_label')
    labelFs._show = isShow
  })
}
wtLayer.wtLayerLocation = function () {
  wtLayer.layerLocation()
}

export default wtLayer

// 添加标签and模型
function createWtModel (item:any) {
  try {
    const labelEntity = addLabelLayer(item, item.distance && item.distance > 0 ? '255,0,0' : null)
    wtFeatureLayer.addFeatureEntity(labelEntity)
    const modelEntity = addModelLayer(item)
    wtFeatureLayer.addFeatureEntity(modelEntity)
  } catch (err) {
    console.log(err)
  }

  // wtLayer.layerLocation()
}

// 标注刷新单个风机
wtLayer.putWt = function (model:any) {
  wtFeatureLayer && wtFeatureLayer.removeFeatureEntityById(model.turbine_id)
  wtFeatureLayer && wtFeatureLayer.removeFeatureEntityById(model.turbine_id + '_label')
  const modelEntity = addModelLayer(model)
  wtFeatureLayer.addFeatureEntity(modelEntity)
  if (model.distance) {
    const labelEntity = addLabelLayer(model, '255,0,0')
    wtFeatureLayer.addFeatureEntity(labelEntity)
  } else {
    const labelEntity = addLabelLayer(model, '')
    wtFeatureLayer.addFeatureEntity(labelEntity)
  }
}

// 模型
function addModelLayer (item:any) {
  const modelEntity = new WindEarth.ModelFeatureEntity({
    id: item.turbine_id,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    orientation: {
      head: 140,
      tilt: 0,
      roll: 0
    },
    styleOptions: {
      turbine: item,
      url: '/models/2.0机组动态.gltf',
      heightReference: item.heights ? 0 : 1,
      color: item.distance && item.distance > 0 ? 'red' : 'blue',
      // color: '#0A3DCC',
      colorBlendAmount: 0.22,
      // colorBlendMode: WindEarth.ColorBlendMode.HIGHLIGHT,
      scale: 0.5,
      runAnimations: false,
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
      scale: 0.85,
      heightReference: item.heights ? 0 : 1,
      width: itemLabel.width,
      height: itemLabel.height,
      horizontalOrigin: WindEarth.HorizontalOrigin.LEFT,
      verticalOrigin: WindEarth.VerticalOrigin.BOTTOM,
      // eyeOffset: new WindEarth.Cartesian3(0, 0, -100),
      pixelOffset: new WindEarth.Cartesian2(0, 0), // 左右，前后
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1.2, 7500, 0.5),
      distanceDisplayCondition: {
        near: 0,
        far: 100000 // 最远显示距离
      },
      disableDepthTestDistance: 200
    }
  })
  return labelEntity
}

function getLabel (turbine:any, color:any) {
  if (color === undefined || color === '') {
    color = '159, 177, 252'
  }
  let canvas = null
  // const ctx = null
  const result = {
    url: '',
    width: 190,
    height: 80
  }
  canvas = document.createElement('canvas')
  canvas.width = 190
  canvas.height = 80
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
  // const draw = function (x1:any, y1:any, x2:any, y2:any, x3:any, y3:any, color:any, type:any) {
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
  cxt.strokeStyle = 'rgba(255, 255, 255,1)'

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
  ellipseLayer.addFeatureEntity(ellipseEntity)
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
