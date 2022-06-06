import { Module } from 'vuex'
import { RootState } from '../index'
// 定义类型
export interface windState {
  projectInfo: any
}

export const store: Module<windState, RootState> = {
  namespaced: true,
  state: (): windState => ({
    projectInfo: {}
  }),
  mutations: {
    changeProjectInfo (state: windState, data: Object) {
      state.projectInfo = data
    }
  },
  actions: {}
}
