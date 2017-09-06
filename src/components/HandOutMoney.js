/**
 * 发送红包页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Text,
  StatusBar
} from 'react-native';

import {
  FontSize,
  Button,
  Color,
  TextInput,
  PageHeader,
  AlertMuneBox
} from '../UiLibrary/';
import PropTypes from 'prop-types';
import Eicon from 'react-native-vector-icons/Entypo';


const openMuneIcon = (<Eicon name="dots-three-horizontal" size={ 28 } color={Color.White} />);

class HandSendRedMoneyModal extends Component {
  moneyColor = "#E95F38";

  static propTypes = {
    closeModal: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      isShowMune: false
    };
  }

  render() {
    const { closeModal } = this.props;
    const CloseButton = (<TouchableOpacity style={styles.closeBtn} onPress={ closeModal }><Text style={{color: Color.White}}>取消</Text></TouchableOpacity>);
    const openMune = ( <TouchableOpacity style={ styles.MuneIcon } onPress={() => this.setState({isShowMune: true})}>{ openMuneIcon }</TouchableOpacity> );
    const Textcomponent = (
      <Text style={styles.title}>发红包 </Text>
    );
    return (
      <View>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ "#E95F38" }
          />
        <PageHeader
          style={{backgroundColor: this.moneyColor }}
          LeftComponent={ CloseButton }
          RightComponent={ openMune }
          TextComponent={ Textcomponent }
          />
        <TextInput.Label
          placeholder="点击此处输入"
          labelText="用户名"
          />
        <TextInput.number
          labelText="单个金额"
          />
        <AlertMuneBox
          visible={ this.state.isShowMune }
          onClosePress={ () => this.setState({isShowMune: false })}
          data={[{text: '红包记录', onPress: () => alert('ok')}]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  closeBtn: {
    padding: 9
  },
  MuneIcon: {
    padding: 9
  },
  title: {
    color: Color.White,
    fontSize: FontSize.White.Super
  }
});

export default HandSendRedMoneyModal;
