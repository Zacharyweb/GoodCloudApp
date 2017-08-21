# 好云商建材城App

## 项目描述
好云商建材城App是好云商项目的子项目，好云商建材城App分为好云商导购端App、好云商消费者端App，旨在给建材城门店提供一个建材产品小视频、产品全景展厅、在线直播以及名片展示的平台，给消费者提供一个一站式家装选材平台。

## 项目架构
好云商建材城App采用`Vue`+`vue-cli`+`vue-router`系统架构进行单页面应用的开发，配合构建工具`webpack`进行项目的打包。

## 项目目录结构
项目采用了vue官方脚手架`vue-cli`进行搭建，项目内容位于`src`文件夹中。
- `main.js`——项目的入口文件。
- `route.js`——项目路由配置。
- `App.vue`——项目启动页。
- `/assets`——存放静态资源。
- `/components`——存放单页面组件，其中`/components/common`目录存放公共组件。

## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```