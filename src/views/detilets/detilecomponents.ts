import { store } from '@/store/index'
import { windFarmInfo, makerInfo } from '@/config/detile_config'
export function detileInfor (info: any, obj: any) {
  info.id = obj.id
  info.x = store.state.app.clickFanList.x
  info.y = store.state.app.clickFanList.y
  info.datas = []
  if (obj.type === 'windFarm') {
    info.title = windFarmInfo.title
    info.data = windFarmInfo.data
    info.num = windFarmInfo.num
    info = setnum(info, windFarmInfo.maxnum)
  } else if (obj.type === 'maker') {
    info.title = makerInfo.title
    info.data = makerInfo.data
    info.num = makerInfo.num
    info = setnum(info, makerInfo.maxnum)
  }
  info.data.map((item: any) => {
    if (item.key === '风场名称：') {
      item.value = obj.project_name
    } else if (item.key === '经度：') {
      item.value = obj.longitude
    } else if (item.key === '纬度：') {
      item.value = obj.latitude
    } else if (item.key === '工厂名称：') {
      item.value = obj.project_name
    } else if (item.key === '经度：') {
      item.value = obj.longitude
    } else if (item.key === '纬度：') {
      item.value = obj.latitude
    }
    return item
  })
  return info
}
function setnum (info:any, num:number) {
  if (store.state.app.clickFanList.arr.length > 1) {
    info.num = num
    info.datas = store.state.app.clickFanList.arr
  }
  return info
}
