# 信信 聊天客户端
> logo 稍后附上
> 客户端支持`ios`和`android`用户体验目前按照微信客户端来做
>一个基于 react-native + redux + 环信互动云 + node或者php 的仿微信
> 之后附上项目主页

## 写在前面
这是自己作为一个 `JS` 开发者面对来自他人的不确信，常常问起自己的问题。
我想不管答案是什么，更重要的是探索深挖的过程；不肤浅，总能有意想不到的收获。

## 效果图
> 稍后附上

## 运行项目
> react-native 在 debug 和 release 模式之间的性能差距是惊人的。

**安装依赖**
```shell
yarn install
```
**进入开发模式**
```shell
react-native run-ios
// or
react-native run-android
```
**Release 包生成**
> 稍后附上

## 组件库
组件库中包含
> 开发本项目的时候，要求自己尽量手写基础组件，基础组件与业务无关，可通用

组件库地址：[UiLibrary](http://git.meiyouka.com/liyuan/xinxin-FE-LY/tree/dev/src/UiLibrary)

通过更改 app.json 的 appMode 字段，进行组件调试模式（ui）和 Im 模式（xxclient）的切换

## 开发笔记
项目介绍全部在`README`中

## TODO
接下来的开发重点在

字段 | 定义     | 可选值
:----|:---------|:-------------
type | 消息类型 | `txt`

**TODO**
>由于项目工程大 每次创建一个Component之后都需要 链接redux和navigation包括navigation链接redx
>解决一次Component创建后自动化
