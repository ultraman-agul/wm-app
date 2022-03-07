# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

# 开发流程

1. 配置别名：在 vite.config.ts 中配置，需要先安装`npm i @types/node -D` 才能使用 path 模块
2. 集成路由：安装支持 vue3 的路由 vue-router@4 `npm i vue-router@4`，配置 router/index.ts
3. 新一代状态管理工具，Pinia.js ： `npm install pinia --save`
4. 配置网络请求 axios： `npm i axios`， 配置 api/index
5. 继承 css 预编译器： `npm i sass -D`,
6. 改用 postcss-px-to-viewport 适配： `postcss-px-to-viewport`，配置 postcss.config.js 文件
7. 引入 eslint prettierrc 进行代码格式化检查
8. 完善登录功能,携带 token 认证
9. 头像上传到服务端，服务端保存到可访问静态资源文件夹，返回图片路径，前端接收路径展示
