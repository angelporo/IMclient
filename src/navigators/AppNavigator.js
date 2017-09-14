import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import Login from '../components/login';
import Register from '../components/register';
import { switchMenuState } from '../reducers/user/userAction';
import ChatRoom from '../components/ChatRoom';
import AddFriendComponent from '../components/AddFriend';
import {
  Color,
} from '../UiLibrary/';

import MyApp from '../components/Tabindex';
// 生成路由关系 绑定导航路由
export const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  MyApp: {screen: MyApp },
  ChatRoom: {screen: ChatRoom },
  AddFriend: { screen: AddFriendComponent},
}, {
  // 全局配置导航
  navigationOptions: {
    headerStyle: { backgroundColor: Color.Black },
    headerTitleStyle: {color: Color.White},
    headerBackTitleStyle: {color: Color.White},
    // headerTruncatedBackTitle: '返回',
    headerTitleStyle: {color: Color.White},
    headerTintColor: Color.White,
    headerBackTitleStyle: {color: Color.White}
  },
  mode:'card'
});

// 在store中绑定state到component props
const mapStateToProps = state => ({
  nav: state.nav
});

// 在navigator中绑定dispatch, state
const AppWithNavigationState = ({ dispatch , nav }) => {
    return (
      <AppNavigator
        navigation={ addNavigationHelpers({ dispatch, state: nav })} />
    );
};

const mapDispatchToProps = dispatch => {
  return {
    switchMenuState: compose( dispatch, switchMenuState)
  };
};


// AppWithNavigationState.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   nav: PropTypes.object.isRequired
// };

// 导出链接好dispatch, state, 我navigator的组件
export default connect(mapStateToProps )(AppWithNavigationState);
