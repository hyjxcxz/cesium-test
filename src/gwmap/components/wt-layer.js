import store from '../../store'
const wtLayer = {}
let wtModule = null
let model = null
let wtFeatureLayer = null
let ellipseLayer = null
let arrDataList = []
let editFeatureEntityHelper = null;
wtLayer.load = function(dataList) {
  editFeatureEntityHelper = new WindEarth.EditFeatureEntityHelper(gwmap.viewer);
  wtLayer.remove()
  if (!dataList) return
  wtModule = new WindEarth.ModelWithBillboardModule(gwmap.viewer)
  dataList.forEach((item, index) => {
    wtModule.loadModelWithBillboard({
      id: item.turbine_id,
      name: item.turbine_name,
      positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.elevation || 0],
      url: '/models/turbine25.glb',
      highLightColor: 'green',
    })
  })
  wtModule.layerLocation()
}
wtLayer.locationModel = name => {
  wtModule.modelLocation([name])
  wtModule.setModelHighLight(name, true)
}

wtLayer.loadWt = function(dataList, call = function() { }) {
  wtLayer.remove()
  editFeatureEntityHelper = new WindEarth.EditFeatureEntityHelper(gwmap.viewer);
  if (!dataList) return

  if (!wtFeatureLayer) {
    wtFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
    wtFeatureLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res) => {
      //  风机不能移动原因   xyh是因为没有自由风速free_speed  自动优化排布是因为没有feature
      setTimeout(() => {
        if (!res.feature || !res.position) {
          store.commit('clickFanWt', null)
        } else {
          if (!String(res.feature.id).includes('_label')) {
            // if (!res.feature.styleOptions.turbine.free_speed && res.feature.styleOptions.turbine.free_speed !== 0) {
            //   return
            // }
            model = res.feature;
            store.commit('clickFanWt', Object.assign({
              x: res.position.x,
              y: res.position.y,
              show: true
            }, res.feature.styleOptions.turbine))
            if (store.state.projectUpload.showTabTitleNum == 0) {
              store.commit('clickFanWt', Object.assign({
                x: res.position.x,
                y: res.position.y,
                show: false
              }, res.feature.styleOptions.turbine))
            }
          } else {
            wtLayer.zoomToFeature(res.feature._id)
          }
        }
      }, 100)
    })
    // 弹窗地图跟随事件
    wtFeatureLayer.bindRotateEventFunc(function(res) {
      if (res.position && res.position.x && res.position.y) {
        if (store.state.app.clickFanWtData && store.state.app.clickFanWtData.x && store.state.app.clickFanWtData.show) {
          if (res.position.x !== store.state.app.clickFanWtData.x && res.position.y !== store.state.app.clickFanWtData.y) {
            store.commit('clickFanWt', Object.assign({
              x: res.position.x,
              y: res.position.y,
              show: true
            }, res.feature.styleOptions.turbine))
          }
        }
      } else {
        store.commit('clickFanWt', null)
      }
    })
    // 地图点击关闭弹窗
    // var handler = new WindEarth.ScreenSpaceEventHandler(gwmap.viewer.scene.canvas)
    // handler.setInputAction(function (event) {
    //   store.commit('clickFanWt', null)
    // }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }
  arrDataList = dataList
  dataList.forEach((item, index) => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback) => {
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
wtLayer.getFeatureEntityById = function(id) {
  return wtFeatureLayer.getFeatureEntityById(id)
}
wtLayer.createModel = function(item) {
  return createWtModel(item);
}
// 定位当前风机
wtLayer.zoomToFeature = function(wt_id, t, y) {
  let entities = null
  if (Array.isArray(wt_id)) {
    entities = wt_id.map(v => {
      return wtFeatureLayer.getFeatureEntityById(v)
    })
  } else {
    entities = wtFeatureLayer.getFeatureEntityById(wt_id)
  }
  gwmap.viewer.flyTo(entities, {
    duration: 1,
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 2000)
  })
}

// 修改风机label属性
wtLayer.changeWtProperty = (turbine, color = null) => {
  if (!wtFeatureLayer) return
  const labelFeature = wtFeatureLayer.getFeatureEntityById(turbine.turbine_id + '_label')
  if (!labelFeature) return
  labelFeature.changeFeatureProperty({
    styleOptions: {
      url: getLabel(turbine, color).url
    }
  })
}

wtLayer.remove = function() {
  // if (!wtModule) return
  // wtModule.removeAll()
  // wtModule = null

  if (!wtFeatureLayer) return
  wtFeatureLayer.unbindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  wtFeatureLayer.unbindRotateEventFunc()
  wtFeatureLayer.removeFromViewer()
  wtFeatureLayer = null
  store.commit('clickFanWt', null)
}

wtLayer.removeEllipse = () => {
  if (!ellipseLayer) return
  ellipseLayer.removeAll()
  ellipseLayer = null
}
//点击移动风机坐标
wtLayer.yiMove = () => {
  let arr = [];
  editFeatureEntityHelper.setEditMode(1);
  editFeatureEntityHelper.setFeatureEntityEditMode(model, true);
  editFeatureEntityHelper.handler.removeInputAction(WindEarth.MouseEventType.LEFT_CLICK);
  editFeatureEntityHelper.setEditedFeature(model);
  let { x, y } = store.state.app.clickFanWtData;
  model['leftClick']({ x, y });
  var start = model.coord
  model.addListener('dragEnd', function(feature) {
    let { coord, id } = feature.entity;
    store.commit('clickNowFan', { coord, id });
    let labelFeature = wtFeatureLayer.getFeatureEntityById(model.id + '_label')
    if (!labelFeature) return
    labelFeature.changeFeatureProperty({
      positions: coord
    })
    let xy = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [start[0], start[1]]);
    let xy1 = proj4Util.proj4From84(store.state.app.projectInfo.epsg_src, [coord[0], coord[1]]);
    store.commit('putMoveData', {
      x: xy1[0] - xy[0],
      y: xy1[1] - xy[1],
      lon: coord[0] - start[0],
      lat: coord[1] - start[1]
    })
  });
},
  wtLayer.wtDel = () => {
    editFeatureEntityHelper.setEditMode(1);
    editFeatureEntityHelper.setFeatureEntityEditMode(model, true);
    let labelFs = wtFeatureLayer.getFeatureEntityById(model.id + '_label')
    wtFeatureLayer.removeFeatureEntity(model);
    wtFeatureLayer.removeFeatureEntity(labelFs);
  },
  //开启编辑
  wtLayer.editStart = () => {
    //设置可以进行编辑的要素Entity
    wtFeatureLayer.entities.values.forEach((entity) => {
      editFeatureEntityHelper.setFeatureEntityEditMode(entity, true);
    });
    wtLayer.nodeEdit();
  }
//节点编辑
wtLayer.nodeEdit = () => {
  //设置当前的编辑模式为节点编辑
  editFeatureEntityHelper.setEditMode(1);
  editFeatureEntityHelper.moveEndEvent.addEventListener(function(event) {
    console.log(event);
  });
}

wtLayer.loadWtEllipse = (param, wtList) => {
  wtLayer.removeEllipse()
  if (!wtList) return
  if (!ellipseLayer) {
    ellipseLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
  }
  wtList.forEach(item => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback) => {
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
wtLayer.layerLocation = function(t, y) {
  if (!wtFeatureLayer) return
  wtFeatureLayer.locationLayer({
    offset: new WindEarth.HeadingPitchRange(0, t || -0.3, y || 25000) // -0.2, 16000
  })
}


// 标签显影
wtLayer.lableShow = function(id, isShow) {
  if (!wtFeatureLayer || arrDataList.length <= 0) return
  arrDataList.forEach((item, index) => {
    var labelFs = wtFeatureLayer.getFeatureEntityById(item.turbine_id + '_label')
    labelFs._show = isShow
  })
}
wtLayer.wtLayerLocation = function() {
  wtLayer.layerLocation()
}

export default wtLayer






// 添加标签and模型
function createWtModel (item) {
  try {
    const labelEntity = addLabelLayer(item)
    wtFeatureLayer.addFeatureEntity(labelEntity)
    const modelEntity = addModelLayer(item)
    wtFeatureLayer.addFeatureEntity(modelEntity)
  } catch (err) {
    console.log(err)
  }

  // wtLayer.layerLocation()
}

// 模型
function addModelLayer (item) {
  const modelEntity = new WindEarth.ModelFeatureEntity({
    id: item.turbine_id,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    orientation: {
      head: 0,
      tilt: 0,
      roll: 0
    },
    styleOptions: {
      turbine: item,
      url: '/models/205-3.gltf',
      heightReference: item.heights ? 0 : 1,
      // color: color,
      colorBlendAmount: 0.9,
      colorBlendMode: WindEarth.ColorBlendMode.HIGHLIGHT,
      scale: 2.5,
      // minimumPixelSize: 20,
      // maximumScale: 5,
      distanceDisplayCondition: {
        near: 0,
        far: 100000
      }
    }
  })
  return modelEntity
}
// 标签
function addLabelLayer (item, isHighLight) {
  const itemLabel = getLabel(item, isHighLight)
  const labelEntity = new WindEarth.BillBoardFeatureEntity({
    id: item.turbine_id + '_label',
    // name: item.turbine_name,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    styleOptions: {
      url: itemLabel.url,
      name: item.turbine_name,
      // scale: 1,
      heightReference: item.heights ? 0 : 1,
      width: itemLabel.width,
      height: itemLabel.height,
      eyeOffset: new WindEarth.Cartesian3(0, 0, -100),
      pixelOffset: new WindEarth.Cartesian2(26, 0), // 左右，前后
      scaleByDistance: new WindEarth.NearFarScalar(2000, 1.2, 7500, 0.5),
      distanceDisplayCondition: {
        near: 0,
        far: 100000 // 最远显示距离
      },
      disableDepthTestDistance: 0
    }
  })
  return labelEntity
}
function getLabel (turbine, color) {
  let canvas = null
  let ctx = null
  const result = {
    url: '',
    width: 80,
    height: 100
  }
  canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 166
  ctx = canvas.getContext('2d')
  ctx.fillStyle = color || ((turbine.checked && turbine.checked !== '0') ? '#2cd0b9' : '#8883FF')
  ctx.beginPath()
  ctx.arc(64, 89, 61, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = '#EBF2E4'
  ctx.lineWidth = '4'
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(52, 145)
  ctx.lineTo(76, 145)
  ctx.lineTo(64, 162)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(51, 149)
  ctx.lineTo(64, 162)
  ctx.lineTo(77, 149)
  ctx.stroke()

  ctx.font = `${turbine.turbine_name.length > 4 ? (turbine.turbine_name.length > 5 ? 32 : 36) : 40}px bolder Microsoft YaHei`
  ctx.fillStyle = '#4d2b05'
  ctx.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  ctx.fillText(turbine.turbine_name, 64, 107)
  result.url = canvas.toDataURL('image/png', 1.0)
  return result
}

// 添加椭圆
function createWtEllipse (item, param) {
  const ellipseEntity = addEllipseLayer(item, param)
  ellipseLayer.addFeatureEntity(ellipseEntity)
}
// 椭圆
function addEllipseLayer (item, param) {
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
      outlineColor: WindEarth.Color.fromBytes(44, 208, 185),	// 可选一个指定Color轮廓的属性。
      outlineWidth: 5
    }
  })
  return ellipseEntity
}
