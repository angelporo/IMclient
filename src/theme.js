/**
 * 项目中配置主题
 * Param: param
 * Return: {undefined}
 **/
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import EStyleSheet from 'react-native-extended-stylesheet';
import { Color }  from './UiLibrary/';

const FontSize = width > 340 ? 18 : 16;

export default {
  $height: height,
  $width: width,
  rem: FontSize,
  $globalWhiteSpace: '0.8rem'
}
