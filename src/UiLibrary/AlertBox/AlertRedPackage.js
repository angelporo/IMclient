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
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import FontSize from '../FontSize';
import Color from '../Color';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as Animatable from 'react-native-animatable';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MMicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CachedImage } from "react-native-img-cache";
import Eicon from 'react-native-vector-icons/Entypo';

export default class AlertRedPackage extends Component {
  static propTypes = {
    openRedPackageAnimation: PropTypes.string,
    redPackageBackground: PropTypes.string,
    redPackageOpacity: PropTypes.number,
    onCloseRedPackage: PropTypes.func,
    icon: PropTypes.string,
    userName: PropTypes.string
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
            onCloseRedPackage,
            icon,
            userName
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
            <View style={{height: '100%'}}>
              <View style={styles.avatarBox}>
                <CachedImage
                  component={ Image }
                  source={{
                    uri: icon
                  }}
                  style={ styles.userAvatar }
                  mutable
                  />
                <Text style={styles.userNameText}>{userName}</Text>
              </View>
              { /* 抢红包按钮 */ }
              <View style={styles.rushMoneyIconBox}>
                <Text>红包按钮</Text>
              </View>
            </View>
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
  avatarBox: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rushMoneyIconBox: {
    flex: 1,
    flexBasis: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  packageMask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  userNameText: {
    color: Color.White,
    fontSize: FontSize.Main,
    marginTop: 10
  },
  userAvatar: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Color.White,
    overflow: 'hidden',
  },
  quitIcon: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems:'center',
    left: 0,
    top: 0,
    zIndex: 10
  },
  content: {
    position: 'relative',
    width: '16rem',
    height: '20rem',
    backgroundColor: Color.Red,
    opacity: 1,
    zIndex: 11,
    borderRadius: '0.3rem',
  }
});
