import { store } from '@/store/index'
import { windFarmInfo, makerInfo, electricStationInfo } from '@/config/detile_config'
export function detileInfor (info: any, obj: any) {
  const type = obj.type
  const storeApp:any = store.state.app
  const List = storeApp[type + 'clickFanList']
  info.id = obj.id
  info.x = List.x
  info.y = List.y
  info.datas = []
  if (obj.type === 'windFarm') {
    info.title = windFarmInfo.title
    info.data = windFarmInfo.data
    info.num = windFarmInfo.num
    info.class = windFarmInfo.class
    info = setnum(info, windFarmInfo.maxnum, List)
    info = getString(info, obj)
  } else if (obj.type === 'maker') {
    info.title = makerInfo.title
    info.data = makerInfo.data
    info.num = makerInfo.num
    info.class = makerInfo.class
    info = setnum(info, makerInfo.maxnum, List)
    info = getString(info, obj)
  } else if (obj.type === 'electricStation') {
    info.class = electricStationInfo.class
    info.title = electricStationInfo.title
    info.data = electricStationInfo.data
    info.num = electricStationInfo.num
    info = setnum(info, makerInfo.maxnum, List)
    info = getString(info, obj)
  }
  // info.data.map((item: any) => {
  //   if (item.key === '风场名称：') {
  //     item.value = obj.project_name
  //   } else if (item.key === '经度：') {
  //     item.value = obj.longitude
  //   } else if (item.key === '纬度：') {
  //     item.value = obj.latitude
  //   } else if (item.key === '工厂名称：') {
  //     item.value = obj.project_name
  //   } else if (item.key === '高压电站名称：') {
  //     item.value = obj.project_name
  //   }
  //   return item
  // })
  // const infor = getString(info, obj)
  // info = infor
  return info
}
function setnum (info: any, num: number, List:any) {
  if (List.arr.length > 1) {
    info.num = num
    info.datas = List.arr
  }
  return info
}
function getString (info:any, obj:any) {
  info.data.map((item: any) => {
    if (obj.type === 'windFarm') {
      item = windFarmString(item, obj)
    } else if (obj.type === 'maker') {
      item = makerString(item, obj)
    } else if (obj.type === 'electricStation') {
      item = electricStationString(item, obj)
    }
    return item
  })
  return info
}
function windFarmString (item:any, obj:any) {
  if (item.key === '风场名称：') {
    item.value = obj.project_name
  } else if (item.key === '经度：') {
    item.value = obj.longitude
  } else if (item.key === '纬度：') {
    item.value = obj.latitude
  }
  return item
}
function makerString (item:any, obj:any) {
  if (item.key === '工厂名称：') {
    item.value = obj.project_name
  } else if (item.key === '行政区划：') {
    item.value = obj.longitude
  } else if (item.key === '供货类型：') {
    item.value = obj.latitude
  } else if (item.key === '产能信息：') {
    item.value = obj.latitude
  } else if (item.key === '库存信息：') {
    item.value = obj.latitude
  } else if (item.key === '发货部件数：') {
    item.value = obj.latitude
  }
  return item
}
function electricStationString (item:any, obj:any) {
  if (item.key === '高压电站：') {
    item.value = obj.project_name
  }
  return item
}
