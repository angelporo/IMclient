import React from 'react';
import PropTypes from 'prop-types';
import {Text,
        TouchableOpacity,
        StyleSheet,
        View
       } from 'react-native';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import UserContackList from './ContactList';
import ChatList from './ChatList';
import UserCenter from './My';
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
  FontSize,
  Color,
} from '../UiLibrary/';

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor }) => (
      MyIcon
    ),
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        >
        <Text>hahahh</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const MyApp = TabNavigator({
  chatList: {
    screen: ChatList,
    navigationOptions: {
      tabBarLabel:'信信',
    }
  },
  userContactList: {
    screen: UserContackList,
    navigationOptions: {
      tabBarLabel:'通讯录',
    }
  },
  userCenter: {
    screen: UserCenter,
    navigationOptions: {
      tabBarLabel:'我的',
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    headerBackTitle: null,
    headerTruncatedBackTitle: '',
    initialRouteParams: 'MyApp',
    backBehavior: null,
    headerLeft: null,
    showIcon: true,
    activeTintColor: Color.WechatGreen,
    inactiveTintColor: Color.Grey,
  indicatorStyle: {
    height: 0
  },
  style: {
    backgroundColor: Color.White,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Color.LittleGrey
  },
    labelStyle: {
      margin: 0
    },
    tabStyle: {
      paddingVertical: 3
    }
  },
  headerBackTitle: '返回',
  headerTruncatedBackTitle: '返回',
  animationEnabled: false,
  tabBarPosition: 'bottom',
  TabBarBottom: true,
  swipeEnabled: false,
  lazy: true
});

export default MyApp;
