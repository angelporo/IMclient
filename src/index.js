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
// import Realm from 'realm';

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
                // 链接成功之后打开请求状态
                store.dispatch(userAction.changeFetch(true));
                // 获取聊天室
                // store.dispatch(userAction.getChatRooms());
                // 获取好友列表
                store.dispatch(userAction.getRosterByIM());
                // 获取用户群组列表
                store.dispatch( userAction.getGroupsRooms());
            },
            // 接受消息
            onPresence: msg => {
                console.log("onPresence", msg );
                switch (msg.type) {
                case 'subscribe':
                    // 加好友时双向订阅过程，所以当对方同意添加好友的时候
                    // 会有一步对方自动订阅本人的操作，这步操作是自动发起
                    // 不需要通知提示，所以此处通过state=[resp:true]标示
                    if (msg.status === '[resp:true]') {
                        return
                    }

                    break;
                case 'subscribed':
                    break;
                case 'unsubscribe':
                    // TODO: 局部刷新
                    console.log('局部刷新')
                    break;
                case 'unsubscribed':
                    // 好友退订消息
                    store.dispatch(RosterActions.getContacts())
                    Alert.alert(msg.from + ' ' + I18n.t('unsubscribed'))
                    break;
                }
            },
            // 断开连接
            onClosed: msg => {
                console.log('onClosed');
            }, 
            onError: error => {
                console.log('链接失败', error);
            },
            // 更新黑名单
            onBlacklistUpdate: (list) => {
            },
            // 文本信息
            onTextMessage: (message) => {
                console.log('onTextMessage', message)
            },
            onPictureMessage: (message) => {
                console.log('onPictureMessage', message)
            },
        });
    }
// componentWillMount() {
//     Realm.open({
//       schema: [{name: 'Dog', properties: {name: 'string'}}]
//     }).then(realm => {
//       realm.write(() => {
//         realm.create('Dog', {name: 'Rex'});
//       });
//       this.setState({ realm });
//     });
//   }
    render() {
        // console.log('relam', this.state.realm);
        return (
            <Provider store={ store }>
            <AppWithNavigationState />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('ImClient', () => ReduxExampleApp);

export default ReduxExampleApp;
