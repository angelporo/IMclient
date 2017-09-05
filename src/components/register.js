/**
 * 用户注册页面
 * Param: param
 * Return: { undefined }
 **/

import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  FontSize,
  Button,
  Color,
  TextInput
} from '../UiLibrary/';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      isCanLogin: false
    };
  }

  _onChangeText = () => {
    this.setState({
      isCanLogin: (this.state.name && this.state.phone)
    });
  }
  _register () {
    alert('ok');
  }

  render() {
    return (
      <View
        style={styles.container}
        >
        <TextInput.Label
          labelText="昵称"
          labelStyle={styles.labelStyle}
          autoCapitalize="none"
          placeholder="请填写昵称"
          onChangeText={(name) => {
            this.setState({name}, () => {
              this._onChangeText();
            });
          }}
          value={ this.state.name }
          returnKeyType="done"
          />

          <TextInput.Label
            labelText="手机号"
            labelStyle={styles.labelStyle}
            autoCapitalize="none"
            placeholder="请填写11位手机号"
            onChangeText={(phone) => {
              this.setState({phone}, () => {
                this._onChangeText();
              });
            }}
            value={this.state.phone}
            returnKeyType="done"
            />
            <Button
              style={styles.registerButton}
              textStyle={styles.loginText}
              disabled={false}
              onPress={this._register.bind(this)}
              >
              注册
            </Button>
      </View>
    );
  }
}

Register.navigationOptions = props => {
  return {
    title: '注册',
    headerRight: (<Icon.Button onPress={() => alert('ok')} backgroundColor={Color.Black} name="ellipsis-h" size={ 26 } color={Color.White} />)
  };
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  registerButton: {
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

export default Register;
