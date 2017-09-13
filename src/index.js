import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppReducer from './reducers/index';
import * as userAction from './reducers/user/userAction';
import AppWithNavigationState from './navigators/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import styleConfig from './theme';
import WebIM from './Lib/WebIM';
import Realm from 'realm';

const store = createStore( AppReducer, applyMiddleware(
    thunkMiddleware
));
EStyleSheet.build(styleConfig);

class ReduxExampleApp extends React.Component {
    constructor(props){
        super(props);
      this.state = {
        realm: null
      };
        // NOTE: 监听环信用户事件
        WebIM.conn.listen({
            onOpened: msg => {
                console.log('链接成功');
                // 获取用户好友列表
                store.dispatch(userAction.changeFetch(true)); // 链接成功之后打开请求状态
                // store.dispatch(userAction.getChatRooms()); // 获取聊天室
                store.dispatch(userAction.getRosterByIM()); // 获取好友列表
                store.dispatch( userAction.getGroupsRooms() );// 获取用户群组列表
            },
            onError: error => {
                console.log('链接失败', error);
            },
        });
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
