'use strict'
// 此处的strophe也是改造过的，需要拷贝
import '../Sdk/dist/strophe-1.2.8.js';
// 改造过的sdk目录
import websdk from '../Sdk';
// react-native有window对象但是，不是标准的浏览器对象所以，此处需要模拟一个window和document对象，借助于xmldom模块
import xmldom from 'xmldom';
// 改造过的基础配置信息：去掉一些浏览器依赖
import config from './WebIMConfig';
// 为了http请求，此处可以随意使用自己的http组件
// import Api from '../Services/Api'
let WebIM = window.WebIM = websdk;
window.WebIM.config = config;

// strophe 依赖此属性
window.DOMParser = xmldom.DOMParser;
// 模拟document对象
let document = window.document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", 'text/xml')

// 建立连接
WebIM.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: WebIM.config.https,
  url: WebIM.config.xmppURL,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval
})

export default WebIM;
