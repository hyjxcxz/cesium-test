import { Module } from 'vuex'
import { RootState } from '../index'
// 定义类型
export interface appState {
  clickFanList: any,
  windFarmclickFanList: any,
  electricStationclickFanList: any
  headerTitle: String
}

export const store: Module<appState, RootState> = {
  namespaced: true,
  state: (): appState => ({
    clickFanList: {},
    windFarmclickFanList: {},
    electricStationclickFanList: {},
    headerTitle: '基础数据服务'
  }),
  mutations: {
    changeClickFanList (state: appState, data: Object) {
      state.clickFanList = data
    },
    // 风电场-制造任务、运输任务
    windFarmClickFanList (state: appState, data: Object) {
      state.windFarmclickFanList = data
    },
    // 风电场-输变电站
    electricStationClickFanList (state: appState, data: Object) {
      state.electricStationclickFanList = data
    },
    headerTitle (state: appState, data: String) {
      state.headerTitle = data
    }
  },
  actions: {}
}
