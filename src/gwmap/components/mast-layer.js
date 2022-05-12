import store from '../../store'
import { Message } from 'element-plus'
const mastLayer = {}
let mastModule = null
let mastFeatureLayer = null

mastLayer.loadMast = function(dataList, call) {
  mastLayer.remove()
  if (dataList.length <= 0) return
  if (!mastFeatureLayer) {
    mastFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
    mastFeatureLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res) => {
      setTimeout(() => {
        if (!res.feature || !res.position) {
          store.commit('clickMast', null)
        } else {
          if (!String(res.feature.id).includes('_label')) {
            const status = getMastStatus(res.feature.styleOptions.mast)
            if (status === 3) {
              store.commit('clickMast', null)
              Message.error('测风数据解析异常！')
            } else if (status === 1) {
              store.commit('clickMast', null)
              Message.error('测风数据正在解析中！')
            } else if (status === 2) {
              res.feature.complete && store.commit('clickMast', Object.assign({
                x: res.position.x,
                y: res.position.y,
                id: res.feature._id,
                show: true
              }, res.feature.styleOptions.mast))
            }
          } else {
            mastLayer.zoomToFeature(res.feature._id)
          }
        }
      }, 100)
    })
    // 弹窗地图跟随事件
    mastFeatureLayer.bindRotateEventFunc(function(res) {
      // console.log(JSON.stringify(res.position))
      if (res.position && res.position.x && res.position.y) {
        if (store.state.app.clickMastData && store.state.app.clickMastData.x && store.state.app.clickMastData.show) {
          if (res.position.x !== store.state.app.clickMastData.x && res.position.y !== store.state.app.clickMastData.y) {
            store.commit('clickMast', Object.assign({
              x: res.position.x,
              y: res.position.y,
              show: true,
              id: res.feature._id
            }, res.feature.styleOptions.mast))
          }
        }
      } else {
        store.commit('clickMast', null)
      }
    })
    // 地图点击关闭弹窗
    // var handler = new WindEarth.ScreenSpaceEventHandler(gwmap.viewer.scene.canvas)
    // handler.setInputAction(function (event) {
    //   store.commit('clickMast', null)
    // }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }

  dataList.forEach((item, index) => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback) => {
      // console.log(callback)
      if (callback) {
        item.heights = callback[0][2] || 0
      } else {
        item.heights = 0
      }
      createMastModel(item)
      if (index === dataList.length - 1) {
        call()
      }
    })
  })
}
mastLayer.zoomToFeature = function(mast_id, t, y) {
  console.log('测风定位id: ', mast_id)
  const entities = mastFeatureLayer.getFeatureEntityById(mast_id)
  gwmap.viewer.flyTo(entities, {
    offset: new WindEarth.HeadingPitchRange(0, t || -0.8, y || 1000)
  })
}
// 修改label属性
mastLayer.changeProperty = (mast) => {
  if (!mastFeatureLayer) return
  const labelFeature = mastFeatureLayer.getFeatureEntityById(mast.mast_id + '_label')
  if (!labelFeature) return
  labelFeature.changeFeatureProperty({
    styleOptions: {
      url: getLabel(mast).url
    }
  })
}

mastLayer.removeMast = function(mast_id) {
  mastFeatureLayer && mastFeatureLayer.removeFeatureEntityById(mast_id)
  mastFeatureLayer && mastFeatureLayer.removeFeatureEntityById(mast_id + '_label')
}

mastLayer.remove = function() {
  if (!mastFeatureLayer) return
  // mastFeatureLayer.undindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  mastFeatureLayer.removeFromViewer()
  mastFeatureLayer = null
  store.commit('clickMast', null)
}
mastLayer.mastLocationLayer = function() {
  mastFeatureLayer.locationLayer()
}
export default mastLayer





// 添加标签and模型
function createMastModel (item) {
  const labelEntity = addLabelLayer(item)
  mastFeatureLayer.addFeatureEntity(labelEntity)
  const modelEntity = addModelLayer(item)
  mastFeatureLayer.addFeatureEntity(modelEntity)
  mastFeatureLayer.locationLayer()
}
// 模型
function addModelLayer (item) {
  const modelEntity = new WindEarth.ModelFeatureEntity({
    id: item.mast_id,
    name: '',
    complete: item.complete,
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights || 0],
    styleOptions: {
      mast: item,
      url: '/models/mast-120.glb',
      heightReference: 0,
      colorBlendAmount: 0.9,
      colorBlendMode: WindEarth.ColorBlendMode.HIGHLIGHT,
      scale: 1.5,
      minimumPixelSize: 20,
      maximumScale: 5,
      distanceDisplayCondition: {
        near: 0,
        far: 50000
      }
    }
  })
  return modelEntity
}
// 标签
function addLabelLayer (item) {
  const itemLabel = getLabel(item)
  const labelEntity = new WindEarth.BillBoardFeatureEntity({
    id: item.mast_id + '_label',
    positions: [item.longitude || item.coordinate_x, item.latitude || item.coordinate_y, item.heights + 200],
    styleOptions: {
      mast: item,
      url: itemLabel.url,
      scale: 1,
      heightReference: 0,
      width: itemLabel.width,
      height: itemLabel.height,
      // eyeOffset: new WindEarth.Cartesian3(0, 0, 0),
      // pixelOffset: new WindEarth.Cartesian2(-2, -200),
      // scaleByDistance: new WindEarth.NearFarScalar(2000, 0.5, 7500, 0.5),
      // distanceDisplayCondition: {
      //   near: 600
      // },
      // disableDepthTestDistance: 0
      // eyeOffset: new WindEarth.Cartesian3(0, 0, -100),
      // pixelOffset: new WindEarth.Cartesian2(0, -200), // 左右，前后
      scaleByDistance: new WindEarth.NearFarScalar(2000, 0.8, 7500, 0.5),
      // scaleByDistance: new WindEarth.NearFarScalar(150, 0.8, 50000, 0.5),
      distanceDisplayCondition: {
        near: 150,
        far: 50000
      },
      disableDepthTestDistance: 0
    }
  })
  return labelEntity
}
function getLabel (item) {
  let canvas = null
  let ctx = null
  const result = {
    url: '',
    width: 150,
    height: 80
  }
  canvas = document.createElement('canvas')
  canvas.width = 150
  canvas.height = 80
  ctx = canvas.getContext('2d')
  const color = (item.filename && item.filename_txt) ? '#80BFFE' : '#D8F3EF'

  fillRoundRect(ctx, 0, 0, 150, 70, 10, color)
  ctx.beginPath()
  ctx.moveTo(70, 70)
  ctx.lineTo(85, 70)
  ctx.lineTo(77, 77)
  ctx.fillStyle = color
  // var grd = ctx.createLinearGradient(0, 0, 200, 0) // 使用渐变颜色填充,（左到右）
  // grd.addColorStop(0, "#4CE8B2") // 起始颜色
  // grd.addColorStop(1, '#EFD458') // 终点颜色
  // ctx.fillStyle = grd // 以上面定义的渐变填充
  ctx.fill()

  // console.log(item)
  ctx.font = 'bold 35px Microsoft YaHei'
  ctx.fillStyle = 'rgba(95,72,46,1)'
  ctx.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  ctx.fillText(item.mast_name, 150 / 2, 45)
  result.url = canvas.toDataURL('image/png', 1.0)
  return result
}
function getMastStatus (item) {
  let status = 0, arr = []
  // console.log(store.state.projectUpload.mastStatus)
  arr = store.state.projectUpload.mastStatus.filter(v => v.mast_task === item.mast_name)
  if (arr.length) status = arr[0].status
  return status
}

// ctx.fillStyle = 'rgba(95,72,46,1)'
//   // 边框
//   ctx.beginPath()
//   ctx.lineWidth = 2
//   ctx.setLineDash([5, 5])
//   ctx.strokeStyle = '#C8F3EC'
//   ctx.strokeRect(10, 10, width - 40, height - 40)
//   ctx.closePath()
//   // 左
//   ctx.beginPath()
//   ctx.lineWidth = 3
//   ctx.setLineDash([])
//   ctx.strokeStyle = '#C8F3EC'
//   ctx.strokeRect(0, 0, 20, 20)
//   ctx.closePath()
//   // 右
//   ctx.beginPath()
//   ctx.lineWidth = 3
//   ctx.setLineDash([])
//   ctx.strokeStyle = '#C8F3EC'
//   ctx.strokeRect(width - 40, 0, 20, 20)
//   ctx.closePath()
//   // 左下
//   ctx.beginPath()
//   ctx.lineWidth = 3
//   ctx.setLineDash([])
//   ctx.strokeStyle = '#C8F3EC'
//   ctx.strokeRect(0, height - 40, 20, 20)
//   ctx.closePath()
//   // 右下
//   ctx.beginPath()
//   ctx.lineWidth = 3
//   ctx.setLineDash([])
//   ctx.strokeStyle = '#C8F3EC'
//   ctx.strokeRect(width - 40, height - 40, 20, 20)
//   ctx.closePath()
//   // 底部
//   fillRoundRect(ctx, 30, 30, width - 70, height - 70, 10, 'rgba(216,243,239,1)')
// console.log(item)
// ctx.font = 'bold 40px Microsoft YaHei'
// ctx.fillStyle = 'rgba(95,72,46,1)'
// ctx.fillText(item.mast_name, 50, 80)
// ctx.font = '30px Microsoft YaHei'
// ctx.fillText('风速：', 50, 140)
// ctx.fillText('风向：' + item.main_wind_direction, 50, 180)
// result.url = canvas.toDataURL('image/png', 1.0)
// return result





// /**该方法用来绘制一个有填充色的圆角矩形 
//  *@param cxt:canvas的上下文环境 
//   *@param x:左上角x轴坐标 
//   *@param y:左上角y轴坐标 
//   *@param width:矩形的宽度 
//   *@param height:矩形的高度 
//   *@param radius:圆的半径 
//   *@param fillColor:填充颜色 
//   **/
function fillRoundRect (cxt, x, y, width, height, radius, /*optional*/ fillColor) {
  // 圆的直径必然要小于矩形的宽高          
  if (2 * radius > width || 2 * radius > height) { return false; }
  cxt.save();
  cxt.translate(x, y);
  // 绘制圆角矩形的各个边  
  drawRoundRectPath(cxt, width, height, radius);
  cxt.fillStyle = fillColor || "#000";
  cxt.fill();
  cxt.restore();
}

function drawRoundRectPath (cxt, width, height, radius) {
  cxt.beginPath(0);
  //从右下角顺时针绘制，弧度从0到1/2PI  
  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
  //矩形下边线  
  cxt.lineTo(radius, height);
  //左下角圆弧，弧度从1/2PI到PI  
  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
  //矩形左边线  
  cxt.lineTo(0, radius);
  //左上角圆弧，弧度从PI到3/2PI  
  cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
  //上边线  
  cxt.lineTo(width - radius, 0);
  //右上角圆弧  
  cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
  //右边线  
  cxt.lineTo(width, height - radius);
  cxt.closePath();
}



// // 无填充圆角矩形
// function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
//   //圆的直径必然要小于矩形的宽高          
//   if (2 * radius > width || 2 * radius > height) { return false; }

//   cxt.save();
//   cxt.translate(x, y);
//   //绘制圆角矩形的各个边  
//   drawRoundRectPath(cxt, width, height, radius);
//   cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2  
//   cxt.strokeStyle = strokeColor || "#000";
//   cxt.stroke();
//   cxt.restore();
// }
// /**该方法用来绘制圆角矩形 
//  *@param cxt:canvas的上下文环境 
//   *@param x:左上角x轴坐标 
//   *@param y:左上角y轴坐标 
//   *@param width:矩形的宽度 
//   *@param height:矩形的高度 
//   *@param radius:圆的半径 
//   *@param lineWidth:线条粗细 
//   *@param strokeColor:线条颜色 
//      **/

// // 无填充圆角矩形
// function roundRect(ctx, x, y, w, h, r) { 
//   ctx.moveTo(0,0)
//   ctx.lineTo(0,300)
//   ctx.moveTo(50.5,0)
//   ctx.lineTo(50.5,300)
//   ctx.moveTo(100.5,0)
//   ctx.lineTo(100.5,300)
//   ctx.moveTo(150.5,0)
//   ctx.lineTo(150.5,300)
//   ctx.moveTo(200.5,0)
//   ctx.lineTo(200.5,300)
//   ctx.moveTo(250.5,0)
//   ctx.lineTo(250.5,300)
//   ctx.moveTo(300.5,0)
//   ctx.lineTo(300.5,300)
//   ctx.moveTo(0,0)
//   ctx.lineTo(300,0)
//   ctx.moveTo(0,50.5)
//   ctx.lineTo(300,50.5)
//   ctx.moveTo(0,100.5)
//   ctx.lineTo(300,100.5)
//   ctx.moveTo(0,150.5)
//   ctx.lineTo(300,150.5)
//   ctx.moveTo(0,200.5)
//   ctx.lineTo(300,200.5)
//   ctx.moveTo(0,250.5)
//   ctx.lineTo(300,250.5)
//   ctx.moveTo(0,300.5)
//   ctx.lineTo(300,300.5)
//   ctx.stroke()
//   CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
//     if (w < 2 * r) { r = w / 2 }
//     if (h < 2 * r) { r = h / 2 }
//     this.beginPath()
//     this.moveTo(x + r, y)
//     this.arcTo(x + w, y, x + w, y + h, r)
//     this.arcTo(x + w, y + h, x, y + h, r)
//     this.arcTo(x, y + h, x, y, r)
//     this.arcTo(x, y, x + w, y, r)
//     this.closePath()
//     return this
//   }
//   ctx.lineWidth = 5
//   ctx.strokeStyle = "#F00"
//   ctx.roundRect(50,50,200,150,30).stroke()
// }


