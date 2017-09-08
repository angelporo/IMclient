/**
 *
 * 项目中弹出红包组件
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput as TextInputOffical,
  TouchableOpacity,
  Modal,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import FontSize from '../FontSize';
import Color from '../Color';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MMicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eicon from 'react-native-vector-icons/Entypo';
export default class AlertRedPackage extends Component {
  static propTypes = {
    onCloseRedPackagedata: PropTypes.func,
    duration: PropTypes.number
  }
  duration = this.props.duration || 600
  quitIcon = (<Eicon
              name="cross"
              size={24}
              color={Color.White}
              backgroundColor={"transparent"}
              />);

  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const { openRedPackageAnimation,
            redPackageBackground,
            redPackageOpacity,
            onCloseRedPackage
          } = this.props;
    if (openRedPackageAnimation) {
return (
      <Animatable.View
        animation={ openRedPackageAnimation }
        duration={ this.duration }
        style={[styles.container]}>
        <Animatable.View
          transition='backgroundColor'
          duration={200}
          style={[ styles.packageMask, { backgroundColor: redPackageBackground,
          opacity: redPackageOpacity }]}
          >
        </Animatable.View>
        <Animatable.View
          style={[styles.content]}>
          <TouchableOpacity
            style={ styles.quitIcon }
            onPress={onCloseRedPackage}
            >
            { this.quitIcon }
          </TouchableOpacity>
          <Text>弹出红包框</Text>
        </Animatable.View>
      </Animatable.View>
    );
    }else{
      return null;
    }

  }
}

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  packageMask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  quitIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems:'center',
    left: 0,
    top: 0
  },
  content: {
    position: 'relative',
    width: '16rem',
    height: '20rem',
    backgroundColor: Color.Red,
    opacity: 1,
    zIndex: 11,
    borderRadius: '0.3rem',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
