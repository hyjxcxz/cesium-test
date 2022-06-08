import { Module } from 'vuex'
import { RootState } from '../index'
// 定义类型
export interface windState {
  projectInfo: Object,
  windfarmDetail: Object
}

export const store: Module<windState, RootState> = {
  namespaced: true,
  state: (): windState => ({
    projectInfo: {},
    windfarmDetail: {}
  }),
  mutations: {
    changeProjectInfo (state: windState, data: Object) {
      state.projectInfo = data
    },
    setWindfarmDetail (state: windState, data: any) {
      state.windfarmDetail = data
    }
  },
  actions: {}
}
