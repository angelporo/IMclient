/**
 * 搜索输入框
 * Param: param
 * Return: {undefined}
 **/
import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
  View,
  TextInput
} from 'react-native';

import FontSize from '../FontSize';
import Color from '../Color';
import EEcon from 'react-native-vector-icons/EvilIcons';

export default class SearchText extends React.Component {
    static propTypes = {
      placeholder : React.PropTypes.string,
      onSubMitEditing: React.PropTypes.func,
      value:  React.PropTypes.string,
      style:  React.PropTypes.string,
      isShowIcon: React.PropTypes.Boolean
    }
  constructor(props){
    super(props);
    this.state = {
      value: ""
    }
  }

  render() {
    const { placeholder, value, isShowIcon,  onSubMitEditing, style, onChangeValue } = this.props;
      return (
        <View style={[styles.searchBox, style]}>
          {
            isShowIcon ? (
          <View style={styles.searchIcon }>
            <EEcon iconStyle={ styles.searchIcon } name="search" size={ 30 } color="#4F8EF7" />
          </View>
            ): null
          }

          <TextInput
            placeholder={ placeholder }
            style={ styles.textInput }
            value={ value }
            onChangeText={ onChangeValue }
            onSubmitEditing={ onSubMitEditing }
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  searchBox: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Color.White
  },
  textInput: {
    flex: 1,
    height: 26
  },
  searchIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hintInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});
