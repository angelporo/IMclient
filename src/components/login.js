/**
 * 用户登录页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { switchMenuState, changeLogginState } from '../reducers/user/userAction';
import {
  FontSize,
  Button,
  Color,
  TextInput,
  AlertBox
} from '../UiLibrary/';

import Icon from 'react-native-vector-icons/FontAwesome';
import WebIM from '../Lib/WebIM.js';
console.log('测试环信', WebIM);


class Login extends Component {
  static navigationOptions = ({navigation}) => {
    // FIXME: 修改导航中组件中传递事件bug
  const headerRight = (<Icon.Button
                       onPress={ () => navigation.state.params.loginSwitchMenu() }
                       backgroundColor={Color.Black}
                       name="ellipsis-h"
                       size={ 26 }
                       color={ Color.White }
                       /> );
  return {
    title: '登录',
    headerRight: headerRight
  };
  }
  // 菜单内容
  menuData  = [{text: '找回密码', onPress: () => alert('ha')},
               {text: '帮助中心', onPress: () => alert('he')}]

  _switchMenu () {
    this.setState({isShowMenu: true});
  }

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      phone: '',
      isCanLogin: false,
      isShowMenu: false
    };
  }

  _login = async () => {

  }
  componentWillMount() {
    this.props.navigation.setParams({ loginSwitchMenu:this._switchMenu.bind(this)});
    }
  _goRegister () {
    this.props.navigation.dispatch({type: 'Logined'});
    // this.props.navigation.dispatch({type: 'Register'});
  }

  render() {
    const { isLogged, switchMenuState, changeLogginState } = this.props;
    return (
      <View
        style={styles.container}
        >
          <TextInput.Label
            labelText="手机号"
            labelStyle={ styles.labelStyle }
            autoCapitalize="none"
            placeholder="请填写11位手机号"
            onChangeText={(phone) =>
              this.setState({phone})
            }
            value={this.state.phone}
            returnKeyType="done"
            />
          <TextInput.Label
            labelText="密码"
            labelStyle={styles.labelStyle}
            autoCapitalize="none"
            placeholder="请输入密码"
            onChangeText={(password) => {
              this.setState({password});
            }}
            value={this.state.password}
            returnKeyType="done"
            />
            <Button
              style={styles.loginButton}
              textStyle={styles.loginText}
              disabled={!this.state.isCanLogin}
              onPress={this._login}
              >
              登录
            </Button>
            <Button
              style={styles.registerButton}
              textStyle={styles.loginText}
              disabled={false}
              onPress={this._goRegister.bind(this)}
              >
              注册
            </Button>
            <AlertBox.AlertMenuBox
              onClosePress={ () => this.setState({isShowMenu: false}) }
              data={this.menuData}
              visible={this.state.isShowMenu}
              />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  registerButton: {
    borderColor: Color.WechatGreen,
    backgroundColor: Color.WechatGreen
  },
  loginButton: {
    marginVertical: 20,
    borderColor: Color.WechatGreen,
    backgroundColor: Color.WechatGreen
  },
  loginText: {
    color: Color.White,
    fontSize: FontSize.Primary,
    paddingVertical: 10
  },
  labelStyle: {
    textAlign: 'left',
    paddingHorizontal: 0
  }
});

const mapStateToProps = state => ({
  isLogged: state.userReducer.isLogged
});

const mapDispatchToProps = dispatch => ({
  switchMenuState: compose( dispatch, switchMenuState),
  changeLogginState: compose( dispatch, changeLogginState)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
