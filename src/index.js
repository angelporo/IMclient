/**
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './reducers/index';

import * as userAction from './reducers/user/userAction';
import AppWithNavigationState from './navigators/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import styleConfig from './theme';
import WebIM from './Lib/WebIM';

const store = createStore( AppReducer );
EStyleSheet.build(styleConfig);

class ReduxExampleApp extends React.Component {
  constructor(props){
    super(props);

    // NOTE: 监听环信用户事件
    WebIM.conn.listen({
      onOpened: msg => {
        console.log('链接成功');
        WebIM.conn.getRoster( { success: roster => {
          // FIXME: 请求好友列表之后头像问题待处理
          store.dispatch(userAction.getRoster(roster));
        }});
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
