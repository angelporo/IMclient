/**
 * 聊天房间
 * Param: param
 * Return: { undefined }
 **/
import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  findNodeHandle,
  UIManager,
  Image,
  Text,
  TextInput,
  Platform,
  View,
  Modal,
  Dimensions,
  Keyboard,
  StatusBar,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import config from "../config"
import { compose } from 'redux';
import {
  FontSize,
  Color,
  Button,
  ListItem,
  AlertBox
} from '../UiLibrary/';
import WebIM from '../Lib/WebIM.js';
import { getNowFormatDate } from '../utils.js';
import EStyleSheet from 'react-native-extended-stylesheet';
import { changeKeyHeight,
         sendChatTxtMeg,
         appendToMembersByRoomId,
         getGroupsMemberByUserName
       } from '../reducers/user/userActions';
import Icon from 'react-native-vector-icons/Ionicons';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MMicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eicon from 'react-native-vector-icons/Entypo';
import Ficon from 'react-native-vector-icons/FontAwesome';
import OIcon from 'react-native-vector-icons/Octicons';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import HandleSendRedPackage from './HandOutMoney';
const { height, width } = Dimensions.get('window');

const SelectSendContent = (<Micon name="add-circle" size={ 30 } color={Color.Grey} />);
const VoiceIcon = (<Micon name="keyboard-voice" size={30} color={Color.Grey} />);
const TextIcon = (<MMicon name="pencil-box-outline" size={30} color={Color.Grey} />);

const selectWallet = (<Eicon name="wallet" size={ 40 } color={Color.Grey} />);
const selectPhoto = (<Ficon name="picture-o" size={ 38 } color={Color.Grey} />);
const selectCamera=(<Eicon name="camera" size={ 40 } color={Color.Grey} />);

class ChatRoom extends Component {
    // 接收者 ID
    toInfo: {};
    firstEnter: 0;
    ds: Object;
    rows: [];
    state: {};
    currentMaxRowId:  0;
    chatListView: {};
    // 判断用户是否输入过
    _userHasBeenInputed: false;
    _userAtPage = 0;
    _userReachEnd = true;

  static navigationOptions = ({navigation})  => {
    const IconName = navigation.state.params.isPersons === config.chatgroups ? "ios-people" : "ios-person"
    const headerRight = (<Icon.Button
                         onPress={ () => navigation.state.params.chatListSwitchMenu() }
                         name={ IconName }
                         backgroundColor={Color.Black}
                         size={ 24 }
                         iconStyle={{ marginRight: 10 }}
                         color={Color.White}/>)
    return {
      headerRight: headerRight ,
      headerTitle: navigation.state.params.roomName,
      lazy: true,
      gesturesEnabled: false
    };
  };

  constructor(props) {
    super(props);
    this.toInfo = props.navigation.state.params.info.chatInfo;
    this.moveDistance = 130;
    this.firstEnter = 0;
    this.textInput = null;
    this.roomID = props.navigation.state.params.info.id;
    this.roomChatIndex = props.store.userRecentChat.findIndex(n => n.id === this.roomID);
    this.roomOption = props.navigation.state.params.info;
    this.userName = props.store.userName;
    this.userAvatar = props.store.avatar;
    this.state = {
      textInputHeight: 40,
      // 消息数据获取渠道只能在store中拿
      inputValue: '',
      refreshing: false,
      sendVoice: false,
      currentToolType: 'null', // "input" or "tool" or 'null' or 'expression'
      seleteSendTypeHeight: 0,
      selectTypeOpacity: 0,
      voiceValue: '按住说话',
      modalVisible: false,
      keyBoardHeight: this.props.keyBoardHeight, // TODO: 这个的键盘高度应该放在store中,  全局读取
      selectZindex: 0,
      closeToolsButton: -1,
      voiceButtonColor: Color.White,
      voiceTextColor: Color.Grey,
      isShowVoiceCancelButton: false,
      currentVoiceSelecetType: "send" , // 'send' or 'cancel' 选择语音状态
      // 弹出红包状态
      openRedPackageAnimation: "", // 'zoomIn' or 'zoomOut' 弹出和回缩
      redPackageBackground: 'transparent', // 红包背景
      redPackageOpacity: 0
    };
    const { appendToMembersByRoomId,
            store,
            getGroupsMemberByUserName,
          } = props
    const roomInfo = this.props.navigation.state.params.info
    const rencentIdx = store.userRecentChat.findIndex( n => n.id == roomInfo.id)
    let membersObj = store.userRecentChat[rencentIdx].groupMembers;
    // 获取当前群聊和单聊成员
    if (roomInfo.type == 'users') {
      // 单聊添加对方为成员列表中
      const member = {
        name: roomInfo.id,
        age: roomInfo.age,
        id: roomInfo.id,
        userName: roomInfo.name,
        avatar: roomInfo.avatar
      }
      // 添加群成员到指定roomid中
      appendToMembersByRoomId({members: [member], idx: rencentIdx })
    }else {
      // NOTE: 群聊成员, 服务器端获取群成员
      // store 中groupMembersEntity(成员列表实体) groupMembers(成员抽象)
      if (store.userRecentChat[rencentIdx].groupMembersEntity.length != membersObj.length) {
        let aaa = membersObj.map(n => n.owner == "" ? { userName: n.member } : {userName: n.owner})
        getGroupsMemberByUserName({userNames: aaa, idx: rencentIdx})
      }
    }
  }
  layout(ref) {
    /**
     * 获取当前ref的位置信息
     * Param: param
     * Return: {undefined}
     **/
    const handle = findNodeHandle(ref);
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY
        });
      });
    });
  }
  _scrollToBottom () {
    let scrollProperties = this.chatListView._listRef._scrollMetrics;
    // 如果组件没有挂载完全，则不进行内容偏移
    if (!scrollProperties.visibleLength) { return; }

    // 如果是刷新操作，则不进行滑动
    if (!this._userReachEnd) {
      return;
    }

    // 如果组件内元素还没渲染完全，则不进行底部偏移
    // if (socketStore.currentChatRoomHistory.length - this.currentMaxRowId > 11) {
    //   return;
    // }

    // 这里是一个大坑，在测试环境的时候，由于运行速度较慢，scrollProperties.contentLength 总能
    // 获取到正确的值，生产环境需要加个延时，用来保证 `renderRow` 执行完毕
    // 这里设置了 130ms 的延时
    setTimeout(() => {
      let offsetY = scrollProperties.contentLength - scrollProperties.visibleLength;
      this.chatListView.scrollToOffset({
        offset: offsetY > 0 ? offsetY  : 0,
        animated: this._userHasBeenInputed
      });
    }, this._userHasBeenInputed ? 0 : 123);
  }

  handlePressImgContent () {
    alert("click pic")
  }

  // 获取发送消息request
  getSendMsgRequestBody () {
    var requestBody
    console.log(this.roomOption)
    if (this.roomOption.type === config.chat) {
      // 单聊
      requestBody = {
        target: [this.roomOption.name],
      }
    }else if (this.roomOption.type === config.chatgroups) {
      // 群发文本消息
      requestBody = {
        target: [this.roomOption.id],
      }
    }else {
      alert("发送文本消息类型未定义");
    }
    return requestBody
  }

  // 发送text类型消息
  _onSubmitEditing = () => {
    const { sendChatTxtMeg } = this.props;
    const requestContent = {
      target_type:this.roomOption.type,
      from: this.userName,
      recentId: this.roomOption.recentKey + "",
      msg: {
        type:"txt",
        msg: this.state.inputValue,
        fileName: " ", // 不能为空string
        size:{
          width: 0,
          height:0,
        },
        secret:" ", // 不能为空string
      },
      ext:{
        fromAvatar: this.userAvatar,
        // 发送消息时间戳 (必须是10位数的int)
        sendTime: Math.round(new Date().getTime()/1000),
      }
    }
    let requestBody = this.getSendMsgRequestBody.bind(this)()
    // 发送群聊文本消息
    sendChatTxtMeg({requestBody:{...requestBody, ...requestContent},
                    type:'txt' });
    // 发送之后清空聊天框消息
    this.setState({inputValue: ''});
  }

    _renderRow = ({ item, index }) => {
    const { userid, store } = this.props;
      // this.currentMaxRowId = +rowId;
    return (
      <ListItem.MessageCell
        onPreddRedPackage={this._onOpenReadPackage.bind(this)}
        currentUser={ store.userName }
        message={ item }
        key={ item.id }
        handleImg= {this.handlePressImgContent.bind(this)}
        />
    );
  }

  _onPullMessage = async () => {
    this._userReachEnd = false;

    this.setState({
      refreshing: true
    });

    // 历史消息推入
    // await socketStore.fillCurrentChatRoomHistory(++this._userAtPage, 8);

    this.setState({
      refreshing: false
    });
  }
    _onLongPressVoice() {
        this.setState({
            voiceValue: "松开发送",
            voiceTextColor: Color.White,
            isShowVoiceCancelButton: true,
            voiceButtonColor: Color.Red
        });
    }

    _onMoveVoiceButton (e) {
        if(parseInt(e.nativeEvent.locationY) <= parseInt(this.moveDistance)){
            this.setState({
                currentVoiceSelecetType: 'cancel'
            });
        }else{
            this.setState({
                currentVoiceSelecetType: 'send'
            });
        }
    }

  lookChatRoomInfo () {
    console.log(this.props)
    // 构建和最近联系表中数据相同的结构体发送到最近联系人中, 然后打开
    this.props.navigation.navigate('SectChatRoomInfoAndDisplayGroupMember',{
            info: this.props.navigation.state.params.info,
        });
    }
  componentWillMount () {
    const roomNameFrist = this.props.store.userRecentChat;
    const roomNameSecond = this.props.navigation.state.params.info.name;
    const roomName = roomNameFrist.length != 0 ? roomNameFrist[ this.roomChatIndex ].name : roomNameSecond
    this.props.navigation.setParams({
          chatListSwitchMenu: this.lookChatRoomInfo.bind(this),
          isPersons: this.props.navigation.state.params.info.type,
          roomName: roomName == "." ? config.defaultGroupsRoomName : roomName
        });
    }

  _onResponderRelease(e) {
    // 发送语音松开手指事件
    this.setState({ voiceValue: "按住说话",
                    voiceTextColor: Color.Grey,
                    isShowVoiceCancelButton: false,
                    voiceButtonColor: Color.White});
    if (this.state.currentVoiceSelecetType === "send" ) {
      alert('发送');
    }else if (this.state.currentVoiceSelecetType === "cancel") {
      alert('取消');
    }
  }
  componentDidMount() {
    // 获取取消语音滑动距离
    const { appendToMembersByRoomId,
            store,
            getGroupsMemberByUserName,
          } = this.props
    this.layout(this.voiceContent)
      .then( tootInfo => {
        const ToolBoxTopDistance = tootInfo.y;
        this.layout(this.voiceCancelButton)
          .then(data => {
            const LCD = height;
            const targetPaddingTop = ToolBoxTopDistance - data.y;
            this.moveDistance = targetPaddingTop;
          })
          .catch(e => console.log('e', e));

      }).catch(e => console.log(e));

    this._keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    this._keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }

  componentWillUnmount() {
    this._keyboardWillShowSubscription.remove();
    this._keyboardWillHideSubscription.remove();
    this.openInputTimer && clearTimeout(this.openInputTimer);
    this.openReadPackageTime && clearTimeout(this.openReadPackageTime);
    this.textInputTimer && clearTimeout(this.textInputTimer);
  }

  _keyboardWillShow(e) {
    let keyboardHeight = e.endCoordinates.height;
    const { changeGlobelKeyHeight } = this.props;
    changeGlobelKeyHeight({ keyHeight: keyboardHeight});
  }

  _keyboardWillHide(e) {
    this.refs.toolBarTextInput && this.refs.toolBarTextInput.blur();
  }
  _onPressAddButton () {
    const getCurrentType = type => {
      switch (this.state.currentToolType) {
      case  "null":
        return  "tool";
      case  "tool":
        return  "input";
      case  "input":
        return  "tool";
      default:
        return 'null';
      }
    };
    this.setState({
      currentToolType: getCurrentType(this.state.currentToolType)
    }, () => {
      if (this.state.currentToolType === 'tool') {
        // 打开tool
        return this.setState({
          selectTypeOpacity: 1,
          seleteSendTypeHeight: this.props.keyBoardHeight || 180,
          selectZindex: 1,
          closeToolsButton: 1
        }, () =>  this.textInput && this.textInput.blur());
      }else if (this.state.currentToolType === 'input') {
        // 打开input
        return this.setState({
          selectTypeOpacity: 0,
          seleteSendTypeHeight: 0,
          selectZindex: 0
        }, () => this.openInputTimer = setTimeout( () => this.textInput && this.textInput.focus(), 250));
      }else if (this.state.currentToolType === 'null') {

      }
    })

  };
  _onBlure () {
    // 失去焦点

  }
  _onFocus () {
    // 获取焦点
    if (this.state.currentToolType === 'tool') {
      this.setState({
        seleteSendTypeHeight: 0,
        selectTypeOpacity: 0,
        selectZindex: 0
      });
    }
    this.setState({currentToolType: "input"
                  });
  }
  closeModal() {
    this.setState({modalVisible: false});
    StatusBar.setBarStyle("light-content");
  }
    _onPressListView () {
        return this.setState({
            seleteSendTypeHeight: 0,
            selectTypeOpacity: 0,
            selectZindex: 0,
            currentToolType: 'null',
            closeToolsButton: -1
        }, () => this.textInputTimer = setTimeout(() => this.textInput && this.textInput.blur(),  0));
    }
  _onOpenReadPackage () {
    this.setState({
      openRedPackageAnimation: 'zoomIn'
    }, () => {
      this.openReadPackageTime = setTimeout(
        () => this.setState({redPackageBackground: Color.LightBlack,
                             redPackageOpacity: 0.7
                            }),
        320
      );
    });
  }

  _onCloseRedPackage() {
    this.setState({
      openRedPackageAnimation: 'zoomOut',
      redPackageBackground: "transparent",
      redPackageOpacity: 0
    });
  }
  VoiceDisplayView ({isShow, type})  {
    const display = isShow ? { opacity: 1, zIndex: 10} : { opacity: 0, zIndex: -2};
    // FIXME: android 下面手指滑动会出现背景色总是出现问题
    return (
      <Animatable.View
        ref={ ref => this.voiceContent = ref}
        style={ [ styles.voiceDisplay,  display, {backgroundColor: 'transparent'} ] }
        >
        <View
          ref={ ref => this.voiceCancelButton = ref }
          style={ styles.voiceDisplayContent }>
          <Text style={{color: Color.White}}>
            { type === 'send' ? "松开发送" : " 松开取消" }
          </Text>
        </View>
      </Animatable.View>
    );
  }
    getPhotoByCamera () {
        // 相册获取图片
        ImagePicker.openCamera({
            loadingLabelText: '加载中...'
        })
        .then(image => {
            console.log(image);
        }).catch(e => {

        })
    }

  getPhotoByImageLibrary () {
    const { sendChatTxtMeg } = this.props
    const _this = this
    const roomType = this.roomOption.type
    ImagePicker.openPicker({
      multiple: true,
      loadingLabelText: '加载中...'
    }).then( (image) => {
      // 发送图片消息,  构建request
      let data = new FormData();
      image.forEach( (n) => {
        let d = {
          name: n.filename,
          uri:n.sourceURL,
          type:"multipart/form-data",
          size: n.size
        }
        data.append('file', d)
      })
      data.append('from', _this.userName )
      data.append('target_type', _this.roomOption.type )
      data.append('recentId', _this.roomOption.recentKey + "",)
      data.append('fromAvatar', _this.userAvatar)
      data.append("target", _this.roomOption.id)
      data.append('sendTime', Math.round(new Date().getTime()/1000))

      // 发送群聊文本消息
      sendChatTxtMeg( {requestBody:data,
                       type:"img",
                       imgInfo: image
                      });
    })
      .catch(e => {
      console.log("上传图片错误", e)
    })
  }
  render() {
    const rencentConcats = this.props.store.userRecentChat;
    const rencentConcat = rencentConcats.length != 0  ? rencentConcats[this.roomChatIndex].chatRoomHistory : []
    const ChatListView = (
      <FlatList
        data={ rencentConcat }
        keyExtractor={(item, index) => index }
        onRefresh={this._onPullMessage}
        refreshing={this.state.refreshing }
        ref={(reference) => { this.chatListView = reference; }}
        onLayout={
          (event) => {
            this._scrollToBottom();
          }
        }
        onContentSizeChange={
          (event) => {
            this._scrollToBottom();
          }
        }
        renderItem={ this._renderRow.bind(this)}
        />
    );

    let content = (
      <View
        style={ {height: '100%', position: 'relative'}}>
        <AlertBox.AlertRedPackage
          duration={450}
          openRedPackageAnimation={this.state.openRedPackageAnimation}
          redPackageBackground={ this.state.redPackageBackground }
          redPackageOpacity={this.state.redPackageOpacity}
          onCloseRedPackage={this._onCloseRedPackage.bind(this)}
          icon="https://avatars1.githubusercontent.com/u/16830481?v=4&s=40"
          userName="李渊"
          />
        <View style={[styles.container]}>
          <View style={{flex: 1, position: 'relative'}}>
            { ChatListView }
            {// android下只能吧VoiceDisplayView加载在this下,  不然会出现不刷新bug
              this.VoiceDisplayView({type: this.state.currentVoiceSelecetType,
                                     isShow: this.state.isShowVoiceCancelButton
                                    })
            }
            <TouchableWithoutFeedback
              onPress={this._onPressListView.bind(this)}
              style={{flex: 1}}>
              <View
                style={[styles.listViewButton,
                { zIndex: this.state.closeToolsButton }]}
                >
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <View
              style={ styles.bottomToolBar }
              >
              <TouchableOpacity
                onPress={ () => this.setState({sendVoice: !this.state.sendVoice, selectTypeOpacity: 0, seleteSendTypeHeight: 0,selectZindex: 0})}
                style={styles.selectSendContentButton}>
                {
                  !this.state.sendVoice ? VoiceIcon : TextIcon
                }
              </TouchableOpacity>
              {
                !this.state.sendVoice ?
                  (
                    <TextInput
                      onBlur={this._onBlure.bind(this)}
                      onFocus={this._onFocus.bind(this)}
                      ref={ (input) => this.textInput = input }
                      style={[styles.input, {
                      height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180 )}]}
                       multiline={ true }
                       controlled={true}
                       underlineColorAndroid="transparent"
                       returnKeyType="default"
                       value={ this.state.inputValue }
                       placeholder=""
                       // ios only
                       enablesReturnKeyAutomatically={ true }
                       onSubmitEditing={ Keyboard.dismiss }
                       onContentSizeChange={
                         (event) => {
                           this.setState({textInputHeight: event.nativeEvent.contentSize.height});
                         }
                        }
                        onChangeText={ (text) => {
                          this.setState({ inputValue: text });
                        }}
                        />
                  )
                :
                (
                  <View
                    style={[
                      styles.input,
                      {justifyContent: 'center',
                       alignItems: 'center'},
                      {
                        height:
                        Math.max(40,
                                 this.state.textInputHeight < 180 ?
                                                                this.state.textInputHeight :
                                                                180
                                                                )}
                                                              ]}>
                    <View
                      style={ [styles.voiceButton,
                               {backgroundColor: this.state.voiceButtonColor}
                      ] }
                      onStartShouldSetResponder={ evt => true }
                      onResponderGrant={ this._onLongPressVoice.bind(this) }
                      onResponderMove={this._onMoveVoiceButton.bind(this)}
                      onResponderRelease={this._onResponderRelease.bind(this)}
                      >
                    <Text style={{color: this.state.voiceTextColor}}>{this.state.voiceValue}</Text>
                  </View>
            </View>
                )
              }
        <TouchableOpacity
      onPress={ this._onPressAddButton.bind(this) }
      style={styles.selectSendContentButton}>
        { SelectSendContent }
      </TouchableOpacity>
        <Button
      style={styles.sendButton}
      textStyle={ styles.sendButtonText }
      disabled={ !this.state.inputValue }
      onPress={ this._onSubmitEditing.bind(this) }>
        发送
      </Button>
        </View>
        </View>
        <Animatable.View
      duration={ 250 }
      easing="ease"
      transition={["height", "opacity"]}
      style={[styles.seleteType, { height: this.state.seleteSendTypeHeight,
                                   opacity: this.state.selectTypeOpacity
                                 }]}>
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2 }
      onPress={ () => this.setState({modalVisible: true})}
      text={"红包"}
      Icon={selectWallet} />
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2}
      text={"相册"}
      onPress={ this.getPhotoByImageLibrary.bind(this)}
      Icon={ selectPhoto } />
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2}
      text={"相机"}
      onPress={ this.getPhotoByCamera.bind(this)}
      Icon={ selectCamera } />
        </Animatable.View>
        <Modal
      animationType={"slide"}
      onRequestClose={ () => this.setState({modalVisible: false}) }
      transparent={ false }
      visible={this.state.modalVisible}>
        {/*// NOTE: 发送红type选项(群发和单发) */}
        <HandleSendRedPackage
      type={ "group" }
      closeModal={this.closeModal.bind(this)}/>
        </Modal>
        </View>
        </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={ styles.KeyboardAvoidingView }
          keyboardVerticalOffset={ this.props.keyboardVerticalOffset || 64 }>
          { content }
        </KeyboardAvoidingView>
      );
    } else {
      return content;
    }
  }
}

function SeletTypeItem ({onPress, Icon, text, height}) {
  return (
    <TouchableOpacity
      style={{width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              height: height,
              marginTop: 10
      }}
      onPress={ onPress }
      >
      <View style={styles.selectItemIcon}>
        { Icon }
      </View>
      <Text style={{width: '100%', marginTop: 5, color: Color.Black, textAlign: 'center', fontSize: 12}}>{ text}</Text>
    </TouchableOpacity>
  );
}


const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.BackgroundGrey
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: Color.LittleGrey,
    borderBottomWidth: 1,
    backgroundColor: Color.White,
    position: 'relative',
  },
  voiceDisplay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceDisplayContent: {
    width: '10rem',
    height: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.LightBlack,
    opacity: 0.5,
    overflow: 'hidden',
    borderRadius: '0.3rem',
  },
  sendButton: {
    marginHorizontal: 6,
    backgroundColor: Color.Red,
    borderColor: Color.White
  },
  sendButtonText: {
    color: Color.White
  },
  input: {
    flex: 1,
    color: Color.Black,
    maxHeight: 90,
    fontSize: FontSize.Main,
    padding: 10,
  },
  messageCell: {
    marginTop: 5,
    marginBottom: 5
  },
  messageCellText: {
    fontSize: FontSize.Content
  },
  avatar: {
    borderRadius: 4,
    margin: 5,
    width: 40,
    height: 40
  },
  selectItemIcon: {
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Color.LittleGrey,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectSendContentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  seleteType: {
    overflow: 'hidden',
    backgroundColor: Color.White,
    borderStyle: 'solid',
    borderColor: Color.LittleGrey,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  sendMoney: {
    marginRight: 5,
  },
  voiceButton: {
    borderColor: Color.LightGrey,
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    height: 32,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectSendTypeBox: {
    position: 'absolute',
    width: width,
    height: 200,
    backgroundColor: Color.LightGrey
  },
  listViewButton: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
  }
});


const mapStateToProps = state => ({
  userid: state.userReducer.userid,
  keyBoardHeight: state.userReducer.keyBoardHeight,
  store: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  changeGlobelKeyHeight: compose( dispatch,  changeKeyHeight),
  sendChatTxtMeg: compose( dispatch, sendChatTxtMeg),
  appendToMembersByRoomId: compose( dispatch, appendToMembersByRoomId),
  getGroupsMemberByUserName: compose( dispatch, getGroupsMemberByUserName)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
