/**
 * 用户登录页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  BackHandler
} from 'react-native';
import "whatwg-fetch";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { switchMenuState,
         changeLogginState,
         loggin
       } from '../reducers/user/userActions';
import {
    FontSize,
    Button,
    Color,
    TextInput,
    AlertBox
} from '../UiLibrary/';
import MyApp from './Tabindex';
import Icon from 'react-native-vector-icons/FontAwesome';
// import WebIM, { api } from '../Lib/WebIM.js';
import config from "../config";

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
    const  { changeLogginState } = this.props;
    const _this = this;
    const mobile = '18303403737'//this.state.phone,
    const psd = 'angel' //this.state.password
    const body = {
      mobile: mobile,
      passWord: psd
    };
    const path = `${config.domain}/login`;
    fetch(path, {
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then((res) => {
        // 返回数据
        if (res.code != 0) {
          alert(res.msg);
        }
        // 登录成功
        // 适配用户最近联系人
        const userRencentChatData = _this.userRecentChatAD(res.content.recentConcat);
        res.recentConcat = userRencentChatData;
        changeLogginState({response: res, isLoggin: true, psd: psd});
        _this.props.navigation.dispatch({type: 'Logined'});
      })
      .catch(e => console.log(e));

  }
  // 用户最近联系人适配器
  userRecentChatAD (res) {
    return res.map((n, i) => {
      let data = n.members;
      const roomInfo = data.chatType === "users" ? data.user : data.chatGroup;
      const history = data.chatRoomHistory;
      if (data.chatType == "users") {
        // 单聊
        return {
          latestMessage: data.lastMsg,
          latestTime: data.lastMsgUpdated,
          id:roomInfo.Name,
          name: roomInfo.Name,
          type:data.chatType,
          isTop: roomInfo.isTop,
          groupMembers: history,
          recentKey: data.recentKey,
          avatar: `${config.domain}${roomInfo.Avatar}`,
          chatRoomHistory: []
        };
      }else if (data.chatType == "chatgroups"){
        // 群聊
        return {
          latestMessage: data.lastMsg,
          latestTime: data.lastMsgUpdated,
          name:roomInfo.name,
          id: roomInfo.id,
          type:data.chatType,
          affiliations: roomInfo.affiliations,
          isTop: roomInfo.isTop,
          recentKey: data.recentKey,
          groupMembers: history,
          avatar: `${config.domain}${roomInfo.groupAvatar}`,
          chatRoomHistory: []
        };
      }
    });
  }
  componentWillUpdate() {

  }
  componentWillMount() {

    this.props.navigation.setParams({ loginSwitchMenu:this._switchMenu.bind(this)});
  }
    _goRegister () {
        // this.props.navigation.dispatch({type: 'Logined'});
        this.props.navigation.dispatch({type: 'Register'});
    }
componentDidMount() {
  BackHandler.addEventListener("hardwareBackPress", () => alert('退出app'));
  }
    render() {
      const { switchMenuState,  navigation } = this.props;
      return  (
        <View
          style={ styles.container }
          >
          <TextInput.Label
            labelText="手机号"
            labelStyle={ styles.labelStyle }
            autoCapitalize="none"
            placeholder="请填写11位手机号"
            onChangeText={(phone) =>{
              if (phone.length !== 0) {
                this.setState({isCanLogin: true});
              }
              this.setState({phone});
              }
            }
            value={this.state.phone}
            returnKeyType="done"
            />
            <TextInput.Label
              labelText="密码"
              labelStyle={ styles.labelStyle }
              autoCapitalize="none"
              placeholder="请输入密码"
              onChangeText={(password) => {
                this.setState({password});
              }}
              value={ this.state.password }
              returnKeyType="done"
              />
              <Button
                style={styles.loginButton}
                textStyle={styles.loginText}
                disabled={!this.state.isCanLogin}
                onPress={ this._login.bind(this) }
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
                visible={ this.state.isShowMenu }
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
  changeLogginState: compose( dispatch, changeLogginState),
  loggin: compose( dispatch,  loggin)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
