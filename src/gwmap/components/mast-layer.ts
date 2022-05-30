// import store from '@/store'
// import { Message } from 'element-ui'
import gwmap from '../index'
declare const WindEarth: any
const mastLayer:any = {}
// const mastModule:any = null
let mastFeatureLayer:any = null

mastLayer.loadMast = function (dataList:any, call:any) {
  mastLayer.remove()
  if (dataList.length <= 0) return
  if (!mastFeatureLayer) {
    mastFeatureLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer)
    mastFeatureLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, (res:any) => {
      setTimeout(() => {
        if (!res.feature || !res.position) {
          // store.commit('clickMast', null)
        } else {
          if (!String(res.feature.id).includes('_label')) {
            // const status = getMastStatus(res.feature.styleOptions.mast)
            // if (status === 3) {
            //   store.commit('clickMast', null)
            //   Message.error('测风数据解析异常！')
            // } else if (status === 1) {
            //   store.commit('clickMast', null)
            //   Message.error('测风数据正在解析中！')
            // } else if (status === 2) {
            //   res.feature.complete && store.commit('clickMast', Object.assign({
            //     x: res.position.x,
            //     y: res.position.y,
            //     id: res.feature._id,
            //     show: true
            //   }, res.feature.styleOptions.mast))
            // }
            // store.commit('clickMast', Object.assign({
            //   x: res.position.x,
            //   y: res.position.y,
            //   id: res.feature._id,
            //   show: true
            // }, res.feature.styleOptions.mast))
          } else {
            mastLayer.zoomToFeature(res.feature._id)
          }
        }
      }, 100)
    })
    // 弹窗地图跟随事件
    mastFeatureLayer.bindRotateEventFunc(function (res:any) {
      // console.log(JSON.stringify(res.position))
      if (res.position && res.position.x && res.position.y) {
        // if (store.state.app.clickMastData && store.state.app.clickMastData.x && store.state.app.clickMastData.show) {
        //   if (res.position.x !== store.state.app.clickMastData.x && res.position.y !== store.state.app.clickMastData.y) {
        //     store.commit('clickMast', Object.assign({
        //       x: res.position.x,
        //       y: res.position.y,
        //       show: true,
        //       id: res.feature._id
        //     }, res.feature.styleOptions.mast))
        //   }
        // }
      } else {
        // store.commit('clickMast', null)
      }
    })
    // 地图点击关闭弹窗
    // var handler = new WindEarth.ScreenSpaceEventHandler(gwmap.viewer.scene.canvas)
    // handler.setInputAction(function (event) {
    //   store.commit('clickMast', null)
    // }, WindEarth.ScreenSpaceEventType.LEFT_CLICK)
  }

  dataList.forEach((item:any, index:number) => {
    gwmap.getLonLatHeight([[Number(item.longitude || item.coordinate_x), Number(item.latitude || item.coordinate_y), Number(0)]], (callback:any) => {
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
mastLayer.zoomToFeature = function (mastId:any, t:any, y:any) {
  console.log('测风定位id: ', mastId)
  const entities = mastFeatureLayer.getFeatureEntityById(mastId)
  gwmap.viewer.flyTo(entities, {
    offset: new WindEarth.HeadingPitchRange(0, t || -0.8, y || 1000)
  })
}
// 修改label属性
mastLayer.changeProperty = (mast:any) => {
  if (!mastFeatureLayer) return
  const labelFeature = mastFeatureLayer.getFeatureEntityById(mast.mastId + '_label')
  if (!labelFeature) return
  labelFeature.changeFeatureProperty({
    styleOptions: {
      url: getLabel(mast).url
    }
  })
}
mastLayer.remove = function () {
  if (!mastFeatureLayer) return
  // mastFeatureLayer.undindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK)
  mastFeatureLayer.removeFromViewer()
  mastFeatureLayer = null
  // store.commit('clickMast', null)
}
mastLayer.mastLocationLayer = function () {
  mastFeatureLayer.locationLayer()
}
export default mastLayer

// 添加标签and模型
function createMastModel (item:any) {
  const labelEntity = addLabelLayer(item)
  mastFeatureLayer.addFeatureEntity(labelEntity)
  const modelEntity = addModelLayer(item)
  mastFeatureLayer.addFeatureEntity(modelEntity)
  mastFeatureLayer.locationLayer()
}
// 模型
function addModelLayer (item:any) {
  const modelEntity = new WindEarth.ModelFeatureEntity({
    id: item.mastId,
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
function addLabelLayer (item:any) {
  const itemLabel = getLabel(item)
  const labelEntity = new WindEarth.BillBoardFeatureEntity({
    id: item.mastId + '_label',
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
function getLabel (item:any) {
  let canvas = null
  let ctx:any = null
  const result = {
    url: '',
    width: 240,
    height: 80
  }
  canvas = document.createElement('canvas')
  canvas.width = 240
  canvas.height = 80
  ctx = canvas.getContext('2d')
  // const color = (item.filename && item.filename_txt) ? '#B172FF' : '#B172FF'

  // 绘制一个圆角矩形
  // strokeRoundRect(context, 10, 10, 100, 50, 10)

  // 绘制并填充一个圆角矩形

  fillRoundRect(ctx, 49, 20, canvas.width / 2, canvas.height / 2, 10, 'rgba(177, 114, 255, 1)')

  strokeRoundRect(ctx, 44, 16, canvas.width / 2 + 10, canvas.height / 2 + 10, 14, '', '')

  ctx.font = '20px bolder Microsoft YaHei'
  ctx.fillStyle = '#0A1230'
  ctx.textAlign = 'center'// 文字水平居中 并且将fillText的第二个参数设置为ctx width的一半
  ctx.fillText(item.mast_name, canvas.width / 2 - 7, canvas.height / 2 + 7)
  result.url = canvas.toDataURL('image/png', 1.0)
  return result
}
// 测风塔计算状态
// function getMastStatus (item) {
//   let status = 0, arr = []
//   // console.log(store.state.projectUpload.mastStatus)
//   arr = store.state.projectUpload.mastStatus.filter(v => v.mast_task === item.mast_name)
//   if (arr.length) status = arr[0].status
//   return status
// }

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
  cxt.strokeStyle = '#B4E3FE'
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
