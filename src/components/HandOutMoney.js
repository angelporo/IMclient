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
  Text
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


const openMuneIcon = (<Eicon name="dots-three-horizontal" size={ 28 } color={Color.Grey} />);

class HandSendRedMoneyModal extends Component {

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
    const CloseButton = (<TouchableOpacity style={styles.closeBtn} onPress={ closeModal }><Text style={{color: Color.back}}>取消</Text></TouchableOpacity>);
    const openMune = ( <TouchableOpacity style={ styles.MuneIcon } onPress={() => this.setState({isShowMune: true})}>{ openMuneIcon }</TouchableOpacity> );
    return (
      <View>
        <PageHeader
          LeftComponent={ CloseButton }
          RightComponent={ openMune }
          text="发红包" />

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
  }

});

export default HandSendRedMoneyModal;
