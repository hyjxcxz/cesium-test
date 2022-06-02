import { Module } from 'vuex'
import { RootState } from '../index'
// 定义类型
export interface appState {
  clickFanList: any
}

export const store: Module<appState, RootState> = {
  namespaced: true,
  state: (): appState => ({
    clickFanList: {}
  }),
  mutations: {
    changeClickFanList (state: appState, data: Object) {
      state.clickFanList = data
    }
  },
  actions: {}
}
