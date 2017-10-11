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
  ScrollView,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/Entypo';
import EEcon from 'react-native-vector-icons/EvilIcons';
import FFIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
const MyIcon = (<Icon name="ios-person" size={30} color="#4F8EF7" />);

import {
  FontSize,
  Button,
  Color,
  TextInput,
  ListItem,
  PageHeader
} from '../UiLibrary/';

class UserInfoComponent extends Component {
  static navigationOptions = props => {
    const headerRight = (<Icon.Button
                         onPress={ () => _this._switchMenu.bind(_this)() }
                         backgroundColor={ Color.Black }
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
      isShowModal: false,
      isShowQrcode: false,
      isShowQQ: false,
      modalTtile: '名字',
      userName: props.userName
    };
    this.qrcodeIcon = () => (<FIcon name="qrcode" size={ 20 } color={ Color.LightGrey } />);
  }
  componentDidMount() {
    _this = this;
  }
  handleAmendUserName () {
    // 修改用户名字
    this.setState({
      isShowModal: true
    });
  }

  handleShowQrcodeModal () {
    // 修改用户名字
    this.setState({
      isShowQrcode: true
    });
  }

  handleShowUserQQ () {
    // 修改用户名字
    this.setState({
      isShowQQ: true
    });
  }
  handleSelecUserAvatar() {
    ImagePicker.openPicker({
      loadingLabelText: '加载中...',
      width: 500,
      height: 500,
      cropping: true
    })
      .then(image => {
        alert(JSON.stringify(image));
      }).catch(e => {
      });
  }
  handleSubmitUserName() {
    // 提交修改用户头像
    alert(' submit user avatar');
  }
  userAvatar () {
    const { avatar } = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleSelecUserAvatar.bind(this)}
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
      </TouchableOpacity>
    );
  }

  handleAmendUserMobile() {
    this.props.navigation.navigate('AmendUserMobile');
  }

  render() {
    const { avatar, userName, mobile, qrcode } = this.props;
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
            onPress={this.handleAmendUserMobile.bind(this)}
            />
          <ListItem.Separator />

          <ListItem.Label
            labelText="二维码"
            style={{height: 45}}
            onPress={ this.handleShowQrcodeModal.bind(this) }
            rightComponent={ this.qrcodeIcon }
            />
          <ListItem.Separator />

          <ListItem.Label
            labelText="个性签名"
            style={{height: 45}}
            onPress={this.handleShowUserQQ.bind(this)}
            />

          <ListItem.Separator />
        </View>
        <ChangeModal
          closeModal={() => this.setState({isShowModal: false})}
          title={ this.state.modalTtile }
          placeholder='输入新名称'
          type="input"
          value={ this.state.userName }
          handleSubmit={ this.handleSubmitUserName.bind(this) }
          onChangeValue={ text => this.setState({userName: text}) }
          isShow={ this.state.isShowModal }
          />
          <ChangeModal
            closeModal={() => this.setState({isShowQrcode: false})}
            title={ "我的二维码" }
            placeholder='输入新名称'
            type="img"
            value={ this.state.userName }
            handleSubmit={ this.handleSubmitUserName.bind(this) }
            onChangeValue={ text => this.setState({userName: text}) }
            isShow={ this.state.isShowQrcode }
            qrcodeUrl={ qrcode }
            />
        <ChangeModal
          closeModal={() => this.setState({isShowQQ: false})}
          title={ this.state.modalTtile }
          placeholder='让好友看到你的目前状态'
          type="input"
          value={ this.state.userName }
          onChangeValue={ text => this.setState({userName: text}) }
          isShow={ this.state.isShowQQ }
          />
      </ScrollView>
    );
  }
}

export const ChangeModal =  ({
  isShow,
  closeModal,
  title,
  placeholder,
  value,
  onChangeValue,
  onSubMitEditing,
  handleSubmit,
  type,
  qrcodeUrl
}) => {
  const CloseButton = (<TouchableOpacity
                       style={styles.closeBtn}
                       onPress={ closeModal }>
                       <Text style={{color: Color.White}}>取消</Text>
                       </TouchableOpacity>);
  const openMune = ( <TouchableOpacity
                     style={ styles.MuneIcon }
                     onPress={ handleSubmit }>
                     <Text style={{color: Color.White}}>完成</Text>
                     </TouchableOpacity> );
  const Textcomponent = (
    <Text style={{color: Color.White, fontSize:FontSize.Main}}>{ title } </Text>
  );
  return (
    <Modal
      animationType={"slide"}
      onRequestClose={() => this.setState({isShowModal: false})}
      transparent={ false }
      visible={isShow}>
      <PageHeader
        style={{ backgroundColor: Color.Black }}
        LeftComponent={ CloseButton }
        RightComponent={ type === 'input' ? openMune : null }
        TextComponent={ Textcomponent }
        />
      <View style={styles.changeNameBgd}>
        {
          type === 'input' ?
            (
              <TextInput.Search
                placeholder={ placeholder }
                value={ value }
                onChangeValue={ onChangeValue }
                onSubmitEditing={ onSubMitEditing }
                />
            )
          : (
            <View style={ styles.qrcodeBox }>
              <Text style={{marginBottom: 10}}>用户添加好友, 零钱转赠, 好友之间收款</Text>
              <Image
                source={{uri: qrcodeUrl}}
                style={{width: 150, height: 150}}
                resizeMode='cover'
                />
            </View>
          )
        }
      </View>
    </Modal>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  changeNameBgd: {
    height: '100%',
    backgroundColor: Color.BackgroundGrey
  },
  qrcodeBox: {
    backgroundColor: Color.White,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => ({
  isFetch: state.userReducer.isFetch,
  avatar: state.userReducer.avatar,
  userName: state.userReducer.userName,
  mobile: state.userReducer.mobile,
  qrcode: state.userReducer.qrcodeUrl
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)( UserInfoComponent );
