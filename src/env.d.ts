/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'vue3-json-viewer' {
  const vis: any
 export default vis
}
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_API_IP: string,
  readonly VITE_APP_API_USER: string
  // 更多环境变量...
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv
}
