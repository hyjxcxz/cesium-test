# http://10.35.191.98:82/GW-GIS/GOLDMAP-server.git

# 测试环境地址
  
# 工程准备启动等
## 启动
npm install
## 运行
npm run dev
## 打包构建
npm run build
vue-tsc --noEmit 校验ts
## 查看预览打包结果
npm run preview 
## 规范代码
npm run lint 
分两种
   "lint": "eslint ./src/**/*.{js,jsx,ts,tsx,vue} --fix",
或
   "lint": "eslint './src/**/*.{js,jsx,ts,tsx,vue}' --fix",
## commit规范
git commit -m 'fix(account): 修复xxx的bug'

### build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
### ci 持续集成修改
### chore 其他修改, 比如改变构建流程、或者增加依赖库、工具等
### docs 仅文档新增/改动
### feat 新特性、新功能
### fix 修补某功能的bug
### perf 优化相关，比如提升性能、体验
### refactor 重构某个功能
### revert 回滚到上一个版本
### style 代码格式修改, 注意不是 css 修改
### test 测试用例修改
### update 更新某功能
### optimize: 优化构建工具或运行时性能

## 安装依赖前生效 git钩子才能生效
npm run prepare
# 文件目录
## public
不需要打包构建的文件

## src
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
# TS 用法请参考官方文档或src/components/right/testComponet.vue
https://v3.cn.vuejs.org/guide/typescript-support.html#%E4%B8%8E%E7%BB%84%E5%90%88%E5%BC%8F-api-%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).
