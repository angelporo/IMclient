/**
 * 展示用户基本信息
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import PhotoUpload from 'react-native-photo-upload';

const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);

import {
  FontSize,
  Button,
  Color,
  TextInput
} from '../UiLibrary/';

class UserInfoComponent extends Component {
  static navigationOptions = props => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={Color.Black}
                         name="ellipsis-h"
                         size={ 26 }
                         color={ Color.White }
                         /> );
    return {
      title: '个人信息',
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
      <PhotoUpload
        onPhotoSelect={avatar => {
          if (avatar) {
            console.log('Image base64 string: ', avatar)
          }
        }}
        >
        <Image
      style={{
        paddingVertical: 30,
        width: 150,
        height: 150,
        borderRadius: 75
      }}
      resizeMode='cover'
      source={{
        uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
      }}
        />
        </PhotoUpload>
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

export default connect(mapStateToProps, mapDispatchToProps)( UserInfoComponent );
