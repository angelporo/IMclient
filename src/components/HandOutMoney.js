/**
 * 发送红包页面
 * Param: param
 * Return: {undefined}
 **/
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

import {
  FontSize,
  Button,
  Color,
  TextInput,
  PageHeader,
  AlertBox,
} from '../UiLibrary/';

import PropTypes from 'prop-types';
import Eicon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome';

const openMuneIcon = (<Eicon name="dots-three-horizontal" size={ 28 } color={Color.White} />);

/**
 * 发红红包
 * Param: param
 * Return: { undefined }
 **/
class HandleSendRedPackage extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
      type: PropTypes.string,  // "group" or "single"
  }
  constructor(props) {
    super(props);
    this.state = {
      isShowMune: false,
      sum: "",
      num: "1",
      isCanSubmit:  false,
      submitText: '塞钱进红包',
      insterPasd: false
    };
    this.type = this.props.type;
  }
  _onSubmit () {
    this.setState({
      insterPasd: true
    });
  }
  onHandleCloseInsterPsd() {
    this.setState({
      insterPasd: false
    });
  }
  _isCanSubmit (sum, num) {
    const RegNum = /^([1-9]\d*|[0]{1,1})$/;
    const Reg = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
    console.log(sum, num);
    if(this.type === 'group') {
      if (Reg.test(sum)) {this.setState({submitText: '金额填写错误'});}
      if (!RegNum.test(num)) {this.setState({submitText: '数量填写错误'});}
      return Reg.test(sum) && RegNum.test(num);
    }else {
      return Reg.test(sum);
    }
  }

  _changMoneyText(sum) {
    // 输入钱数量正则判断 this.state.isCanSubmit
    this.setState({sum,
                   isCanSubmit: this._isCanSubmit(sum, this.state.num)
                  });
  }
  _changMoneyNumber (num) {
    this.setState({num,
                   isCanSubmit: this._isCanSubmit(this.state.sum, num)
                  });
  }
  render() {
    const { closeModal } = this.props;
    const CloseButton = (<TouchableOpacity
                         style={styles.closeBtn}
                         onPress={ closeModal }>
                         <Text style={{color: Color.White}}>取消</Text>
                         </TouchableOpacity>);
    const openMune = ( <TouchableOpacity
                       style={ styles.MuneIcon }
                       onPress={() => this.setState({isShowMune: true})}>
                       { openMuneIcon }
                       </TouchableOpacity> );
    const Textcomponent = (
      <Text style={styles.title}>发红包 </Text>
    );
    return (
      <View style={styles.html}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ "#E95F38" }
          StatusBarAnimation="fade"
          />
        <PageHeader
          style={{ backgroundColor: Color.Red }}
          LeftComponent={ CloseButton }
          RightComponent={ openMune }
          TextComponent={ Textcomponent }
          />
        <ScrollView
          endFillColor={ Color.Grey }
          >
          <TextInput.number
            labelText="单个金额"
            style={styles.msgInput}
            type="message"
            placeholder="0"
            keyboardType="numeric"
            value={this.state.sum}
            unit="元"
            onChangeText={ this._changMoneyText.bind(this)}
            />
          {
            this.type === 'group' ? (
              <TextInput.number
                labelText="红包数量"
                style={styles.numberInput}
                type="message"
                placeholder="1"
                unit="个"
                keyboardType="numeric"
                defaultValue={ this.state.num }
                value={ this.state.num }
                onChangeText={ this._changMoneyNumber.bind(this) }
                />
            ) : null
          }
        <TextInput.number
      placeholder="大吉大利,红包拿来"
      labelText="留言"
      style={styles.moneyInput}
        />

        <View style={styles.mstHint}>
        <Text style={styles.moneyDisplay}>
        {`￥${ this.state.sum === '' ? "0.00" : this.state.sum }`}
      </Text>
        </View>

        <View>
        <Button
      style={styles.submitButton}
      textStyle={ styles.submitText }
      disabled={ !this.state.isCanSubmit }
      onPress={this._onSubmit.bind(this)}
        >
        塞钱进红包
      </Button>
        </View>
        </ScrollView>
        <AlertBox.AlertMenuBox
      visible={ this.state.isShowMune }
      onClosePress={ () => this.setState({isShowMune: false })}
      data={[{text: '红包记录', onPress: () => alert('ok')}]}>
        </AlertBox.AlertMenuBox>
        {
          this.state.insterPasd ? (<InsterPassWordBox
                                   onClose={this.onHandleCloseInsterPsd.bind(this)} />) : null
        }
      </View>
    );
  }
}

function InsterPassWordBox ({onClose}) {
  const CloseBtn = (<FIcon color={ Color.Grey } name="times" size={ 20 }/>);
  const PassWordComponent = () =>{
    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          >
          <TextInput.Password
            maxLength={6}
            onChange={ (text) => {}}
            />
        </KeyboardAvoidingView>
      );
    } else {
      return (
        <TextInput.Password
          maxLength={6}
          onChange={ (text) => {}}
          />);
    }
  };
  return (
    <View style={styles.insterPasdBox}>
      <View style={styles.insterPasdContent}>
        <TouchableOpacity
          style={styles.insterPsdCloseBtn}
          onPress={onClose}>
          {CloseBtn}
        </TouchableOpacity>
        <View style={styles.psdTitle}>
          <Text style={{color: Color.Grey, fontSize: FontSize.Main}}>请输入支付密码</Text>
        </View>
        <View style={ styles.pasdInputBox }>
          { PassWordComponent() }
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  html: {
    backgroundColor: Color.BackgroundGrey,
    height: '100%',
    position: 'relative'
  },
  closeBtn: {
    padding: 9
  },
  MuneIcon: {
    padding: 9
  },
  insterPsdCloseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101
  },
  title: {
    color: Color.White,
    fontSize: FontSize.White.Super
  },
  moneyInput: {
    marginHorizontal: 16,
    marginLeft: 16,
    marginRight: 16
  },
  pasdInputBox: {
    alignItems: 'center'
  },
  psdTitle: {
    paddingVertical: 16,
    alignItems: 'center'
  },
  insterPasdBox: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  insterPasdContent: {
    width: '90%',
    height: 150,
    backgroundColor: Color.White,
    zIndex: 100,
    borderRadius: 6,
    overflow: 'hidden',
    paddingTop: 10
  },
  mstHint: {
    height: 100,
  },
  msgInput: {
    margin: 16,
  },
  numberInput: {
    marginHorizontal: 16,
    marginBottom: 16
  },
  submitButton: {
    backgroundColor: Color.Red,
    borderWidth: 0,
    marginHorizontal: 16,
    paddingVertical:  10
  },
  submitText: {
    color: Color.White,
    fontSize: FontSize.Primary
  },
  moneyDisplay: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 20
  }
});

export default HandleSendRedPackage;
