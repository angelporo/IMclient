/**
 * 复选框组件
 *
 */
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Color from '../Color';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CheckBox extends Component {
  static propTypes={
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    style: React.PropTypes.any
  };
  constructor(props){
    super(props);
    this.state = {
      checked: props.checked
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  }

  toggle(){
    this.setState({checked:!this.state.checked}, () => {
      this.props.onPress(this.state.checked);
    });
  }
  render () {
    let IconName ="ios-checkmark-circle-outline";
    const { checked, style, onPress } = this.props;
    if( checked ){
      IconName =  "ios-checkmark-circle";
    }
    const content = ( <Icon
                      name={ IconName }
                      size={ 30 }
                      color={Color.WechatGreen}
                      />);
    return(
      <TouchableOpacity
        onPress={ onPress }
        style={[style,
        styles.checkboxIcon]}
        >
        { content }
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  checkboxIcon: {
  }
});
