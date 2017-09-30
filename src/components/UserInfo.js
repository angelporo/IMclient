/**
 * 展示用户基本信息
 * Param: param
 * Return: {undefined}
 **/
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    ScrollView
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
    TextInput,
    ListItem
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
  handleAmendUserName () {
    // 修改用户名字
  }

  userAvatar () {
    const { avatar } = this.props;
    return (
      <PhotoUpload
        pickerTitle="选择来源"
        onPhotoSelect={avatar => {
          if (avatar) {
            console.log('Image base64 string: ', avatar)
          }
        }}
        >
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 10
          }}
          resizeMode='cover'
          source={{
            uri: avatar
          }}
          />
      </PhotoUpload>
    )
  }

  render() {
    const { avatar, userName, mobile } = this.props;
    return (
      <ScrollView style={{marginTop: 10}}>
        <ListItem.Label
          labelText="头像"
          rightComponent={this.userAvatar.bind(this)}
          />
        <ListItem.Separator />
        <View style={{marginTop: 10}}>
          <ListItem.Label
            labelText="名字"
            style={{height: 45}}
            rightComponent={ userName }
            onPress={this.handleAmendUserName.bind(this)}
            />
          <ListItem.Separator />

          <ListItem.Label
            labelText="手机号"
            style={{height: 45}}
            rightComponent={ mobile }
            onPress={this.handleAmendUserName.bind(this)}
            />
          <ListItem.Separator />

          <ListItem.Label
            labelText="二维码"
            style={{height: 45}}
            onPress={this.handleAmendUserName.bind(this)}
            />
          <ListItem.Separator />

          <ListItem.Label
            labelText="个性签名"
            style={{height: 45}}
            onPress={this.handleAmendUserName.bind(this)}
            />

          <ListItem.Separator />
        </View>
      </ScrollView>
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
    isFetch: state.userReducer.isFetch,
    avatar: state.userReducer.avatar,
    userName: state.userReducer.userName,
    mobile: state.userReducer.mobile
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)( UserInfoComponent );
