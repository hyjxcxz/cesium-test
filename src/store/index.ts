// import { InjectionKey } from 'vue'
// import { createStore, useStore as baseUseStore, Store } from 'vuex'

// export interface State {
//   count: number
// }

// export const key: InjectionKey<Store<State>> = Symbol('store')

// // 创建一个新的 store 实例
// export const store = createStore<State>({
//   state () {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

// // 定义自己的 `useStore` 组合式函数
// export function useStore () {
//   return baseUseStore(key)
// }

import { InjectionKey } from '@vue/runtime-core'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { store as app, appState } from './module/app'

// 定义RootState接口，将所有模块类型放入
export interface RootState {
  app: appState
}
export const key: InjectionKey<Store<RootState>> = Symbol('store')

export const store: Store<RootState> = createStore({
  modules: { app }
})

export function useStore () {
  return baseUseStore(key)
}
