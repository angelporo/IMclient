/**
 *
 * 底部弹出菜单
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

export default class AlertMenuBox extends Component {
  static propTypes = {
    style: PropTypes.any,
    data: PropTypes.Object
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      let { style, data, visible, onClosePress } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={ true }
        style={ styles.contentBox }
        visible={ visible }
        >
        <View style={styles.closeModal}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={onClosePress}
            >
            <Text> </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContent}>
          {
            data.map( (n, i) => <AlertItem key={ i } text={n.text} onPress={n.onPress} /> )
          }
        <TouchableOpacity
      onPress={ onClosePress }
      style={[styles.item, { marginTop: 8}]}
        >
        <Text style={styles.itemText}>取消</Text>
        </TouchableOpacity>
        </View>
        </Modal>
        );
    }
}

export function AlertItem ({text, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.item}
      >
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
}


const styles = EStyleSheet.create({
  contentBox: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0, 0, 0, .3)",
    position: 'relative'
  },
  closeModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .4)"
  },
  closeModalButton: {
    backgroundColor: "transparent",
    width: '100%',
    height: '100%'
  },
  item: {
    borderStyle: 'solid',
    borderColor: Color.LittleGrey,
    backgroundColor: Color.White,
    borderBottomWidth: 1,
    paddingVertical: 12
  },
  itemText: {
    textAlign: 'center',
    fontSize: '1rem'
  },
  line: {
    backgroundColor: Color.White,
    fontSize: FontSize.Content,
    height: 45,
    paddingHorizontal: 15,
    borderColor: Color.LittleGrey,
    borderWidth: StyleSheet.hairlineWidth
  },
  buttonContent: {
    width: '100%',
    backgroundColor: Color.LittleGrey,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
