# 工程准备启动等
## 启动
npm install
## 运行
npm run dev
## 打包
npm run build
## 查看打包结果
npm run preview

# 文件目录
———— src
   ____api            接口
   ____assets         静态文件
   ____components     业务组件文件
   ____composables    封装的组件文件
   ____layout         布局
   ____plugins        注册的插件（全局指令等）
   ____router         路由
   ____store          存储vuex
   ____styles         全局样式
   ____utils          工具
   ____views          路由页面
# 报错参考
https://blog.csdn.net/qq_45022197/article/details/124428798

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
