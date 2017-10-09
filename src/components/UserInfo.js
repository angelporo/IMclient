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
        modalTtile: '名字'
    };
  }
  componentDidMount() {
    _this = this;
  }
  handleAmendUserName () {
      // 修改用户名字
      this.setState({
          isShowModal: true
      })
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
        })
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
        <ChangeModal
        closeModal={() => this.setState({isShowModal: !this.state.isShowModal})}
        title={ this.state.modalTtile }
        isShow={ this.state.isShowModal }/>
      </ScrollView>
    );
  }
}

export const ChangeModal =  ({isShow,
    closeModal,
    title,
    placeholder,
    value,
    onChangeValue,
    onSubMitEditing
}) => {
    const CloseButton = (<TouchableOpacity
                         style={styles.closeBtn}
                         onPress={ closeModal }>
                         <Text style={{color: Color.White}}>取消</Text>
                         </TouchableOpacity>);
    const openMune = ( <TouchableOpacity
        style={ styles.MuneIcon }
        onPress={() => alert('ok')}>
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
        RightComponent={ openMune }
        TextComponent={ Textcomponent }
        />
        {
            /*
        <TextInput
        placeholder={ placeholder }
        style={ styles.textInput }
        underlineColorAndroid='transparent'
        value={ value }
        onChangeText={ onChangeValue }
        onSubmitEditing={ onSubMitEditing }
        />
            */
        }
        </Modal>
    )
}



const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 70,
        paddingHorizontal: 20
    },
    textInput: {
        flex: 1,
        height: 45
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
