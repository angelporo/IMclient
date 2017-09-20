/**
 * 用户钱包组件页面
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);
import {
  FontSize,
  Button,
  Color,
  TextInput
} from '../UiLibrary/';

class UserWalletComponent extends Component {
  static navigationOptions = props => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={Color.Black}
                         name="ellipsis-h"
                         size={ 26 }
                         color={ Color.White }
                         /> );
    return {
      title: '钱包',
      // headerRight: headerRight
    };
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    _this = this;
  }

  render() {
    return (
      <View
        style={styles.container}
        >
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 20
  },
});

const mapStateToProps = state => ({
  isFetch: state.userReducer.isFetch
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)( UserWalletComponent );
