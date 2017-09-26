/**
 * <plusmancn@gmail.com> created at 2017
 *
 *
 * @flow
 *
 * 模拟页面头部导航(用于madal)
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput as TextInputOffical,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from '../Color';
import Icon from 'react-native-vector-icons/Ionicons';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MMicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eicon from 'react-native-vector-icons/Entypo';
import Ficon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
const { height, width } = Dimensions.get('window');
import {
  FontSize
} from '../../UiLibrary';

const SelectSendContent = (<Micon name="add-circle" size={ 30 } color={Color.Grey} />);

const VoiceIcon = (<Micon name="keyboard-voice" size={30} color={Color.Grey} />);

/**
 * 左中右布局页面提示
 * Param: param
 * Return: { undefined }
 **/
class PageHeader extends Component {

  constructor(props){
    super(props);
  }

  render () {
    let { LeftComponent,
          RightComponent,
          TextComponent,
          style } = this.props;
    return (
      <View style={[styles.html, style]}>
        <View style={ styles.Box }>
          <View style={ styles.leftBox}>
            { LeftComponent }
          </View>
          <View style={styles.textBox}>
            { TextComponent }
          </View>
          <View style={ styles.rightBox }>
            { RightComponent }
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  html: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 20 // 顶部status高度设置
  },
  Box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 50
  },
  textBox: {
    paddingHorizontal: 8,
    flexShrink: 1,
    flex: 1,
    alignItems: 'center'
  },
  leftBox: {
    justifyContent: 'flex-start'
  },
  rightBox: {
    justifyContent: 'flex-end'
  }
});

export default PageHeader;
