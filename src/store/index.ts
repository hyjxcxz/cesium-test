import { InjectionKey } from '@vue/runtime-core'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { store as app, appState } from './module/app'
import { store as wind, windState } from './module/wind'

// 定义RootState接口，将所有模块类型放入
export interface RootState {
  app: appState,
  wind: windState
}
// 定义类型化的 InjectionKey
export const key: InjectionKey<Store<RootState>> = Symbol('store')

export const store: Store<RootState> = createStore({
  modules: {
    app,
    wind
  }
})

export function useStore () {
  return baseUseStore(key)
}
