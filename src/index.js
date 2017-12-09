import React from 'react';
import { AppRegistry, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './navigators/AppNavigator';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './reducers/index';
import * as userAction from './reducers/user/userActions';
import AppWithNavigationState from './navigators/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import styleConfig from './theme';
import WebIM from './Lib/WebIM';

let store = createStore( AppReducer, applyMiddleware(
  thunkMiddleware
));

EStyleSheet.build(styleConfig);

class ReduxExampleApp extends React.Component {
  constructor(props){
    super(props);
    // NOTE: 监听环信用户事件
    WebIM.conn.listen({
      onOpened: msg => {
        // 出席后才能接受推送消息
        WebIM.conn.setPresence();
        // store.dispatch( userAction.saveUserId( msg.accessToken ));
        // NavigationActions.navigate({ routeName : 'MyApp' }),
        console.log('链接成功');
        // 链接成功之后打开请求状态
        AppNavigator.router.getStateForAction(
          store.dispatch(userAction.changeFetch(true))
        );
        // 获取聊天室
        // store.dispatch( userAction.getChatRooms() );
        // 获取好友列表
        // store.dispatch( userAction.getRosterByIM() );
        // 获取用户群组列表
        // store.dispatch( userAction.getGroupsRooms());
      },
      // 接受推送通知
      onPresence: msg => {
        // console.log("通知", msg)
        if ( msg.type == 'subscribe' ) {
          // console.log("接受到的消息", msg);
        }
        switch (msg.type) {
        case 'subscribe':
          // 加好友时双向订阅过程，所以当对方同意添加好友的时候
          // 会有一步对方自动订阅本人的操作，这步操作是自动发起
          // 不需要通知提示，所以此处通过state=[resp:true]标示
          if (msg.status === '[resp:true]') {
            return;
          }
          break;
        case 'subscribed':
          break;
        case 'unsubscribe':
          // TODO: 局部刷新
          console.log('局部刷新');
          break;
        case 'unsubscribed':
          // 好友退订消息
          store.dispatch(RosterActions.getContacts());
          Alert.alert(msg.from + ' ' + I18n.t('unsubscribed'));
          break;
        case "notify":
          // console.log(msg)
        }
      },
      // 断开连接
      onClosed: msg => {
        console.log('onClosed');
      },
      onError: error => {
        // 处理各种异常
        console.log('异常了!', error);
      },
      // 更新黑名单
      onBlacklistUpdate: (list) => {

      },
      // 文本信息
      onTextMessage: (message) => {
        console.log( 0, message)
        const userName = store.getState().userReducer.userName
        if (message.type == "groupchat" && message.from == userName) {
          // 来自自身发送的txt群聊信息不做渲染
          return;
        }
        if (message.type == "chat" && message.from == userName) {
          // 来自自身发送的txt群聊信息不做渲染
          return;
        }
        store.dispatch(userAction.onTextMessage({
          content: message,
          type:"txt",
          roomId: message.type == "chat" ? message.to : message.to,
          sendOrReceive: "receive"}))
      },
      onPictureMessage: (message) => {
        // 图片消息
        console.log('1', message)
        const userName = store.getState().userReducer.userName
        if ( message.type == "groupchat" && message.from == userName) {
          // 来自自身发送的txt群聊信息不做渲染
          return;
        }
        store.dispatch(userAction.onTextMessage({
          content: message,
          type:"img",
          roomId: message.type == "chat" ? message.to : message.to,
          sendOrReceive: "receive"
        }))
      }
    });
  }
  componentWillMount() {

  }

  render() {
    return (
      <Provider store={ store }>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ImClient', () => ReduxExampleApp);

export default ReduxExampleApp;
