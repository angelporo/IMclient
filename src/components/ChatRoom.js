/**
 * 聊天房间
 * Param: param
 * Return: {undefined}
 **/
import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ListView,
  Image,
  Text,
  TextInput,
  Platform,
  View,
  Modal,
  Dimensions,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import {
  FontSize,
  Color,
  Button
} from '../UiLibrary/';

import Icon from 'react-native-vector-icons/Ionicons';
import Micon from 'react-native-vector-icons/MaterialIcons';
import MMicon from 'react-native-vector-icons/MaterialCommunityIcons';
import Eicon from 'react-native-vector-icons/Entypo';
import Ficon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import HandSendRedMoneyModal from './HandOutMoney';
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
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params.info.chatData);
    this.toInfo = props.navigation.state.params.info.chatInfo;
    this.firstEnter = 0;
    this.textInput = null;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      textInputHeight: 40,
      dataSource: this.ds.cloneWithRows(props.navigation.state.params.info.chatData),
      inputValue: '',
      refreshing: false,
      sendVoice: false,
      seleteSendTypeHeight: 0,
      selectTypeOpacity: 0,
      voiceValue: '按住说话',
      modalVisible: false,
      keyBoardHeight: null, // TODO: 这个的键盘高度应该放在store中,  全局读取
      isFocus: false,
      selectZindex: 0
    };
  }

  componentWillUnmount() {
    // socketStore.clearUnReadMessageCount(socketStore.currentChatKey);
    // socketStore.currentChatKey = null;
  }

  // 不要和动画效果抢系统资源
  componentDidMount() {
    // socketStore.currentChatKey  = `${profileStore.userInfo.userId}-${this.toInfo.userId}`;
    // socketStore.fillCurrentChatRoomHistory();
  }

  _scrollToBottom () {
    let scrollProperties = this.chatListView.scrollProperties;

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
      this.chatListView.scrollTo({
        y: offsetY > 0 ? offsetY  : 0,
        animated: this._userHasBeenInputed
      });
    }, this._userHasBeenInputed ? 0 : 130);
  }

  _onSubmitEditing = () => {
    this._userHasBeenInputed = true;
    // 数据组装
    let { userInfo } = profileStore;
    let payload = {
      from: userInfo.userId,
      to: this.toInfo.userId,
      uuid: uuid.v4(),
      msg: {
        type: 'txt',
        content: this.state.inputValue
      },
      ext: {
        avatar: userInfo.avatar,
        name: userInfo.name
      }
    };

    this.setState({ inputValue: '' });

    // 远程发送
    // socketStore.socket.emit('message', [payload]);

    // 本地会话列表更新
    // socketStore.pushLocalePayload(Object.assign({
    //   localeExt: {
    //     toInfo: this.toInfo
    //   }
    // }, payload));
  }

  _renderRow = (row, sectionID, rowId) => {
    let userid = "23455553";
    this.currentMaxRowId = +rowId;
    console.log('row', row);
    return (
      <MessageCell
        key={`cell-${ rowId }`}
        currentUser={ userid }
        message={ row }
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
    this.setState({voiceValue: "松开发送"});
  }
  _onPressOutVoice() {
    // 长按说话松开事件
    this.setState({voiceValue: "按住说话"});
  }
  componentDidMount() {
    this._keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    this._keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
  }

  componentWillUnmount() {
    this._keyboardWillShowSubscription.remove();
    this._keyboardWillHideSubscription.remove();
  }
  _keyboardWillShow(e) {
    let keyboardHeight = e.endCoordinates.height;
    this.setState({keyBoardHeight: keyboardHeight});
  }

  _keyboardWillHide(e) {
    this.refs.toolBarTextInput && this.refs.toolBarTextInput.blur();
  }
  _onPressAddButton () {
    if (this.state.seleteSendTypeHeight !== 0 ) {
      return this.setState({seleteSendTypeHeight:  0,
                     selectTypeOpacity: 0,
                     selectZindex: 0,
                     isFocus: true
                           }, () => setTimeout( () => this.textInput.focus(), 100));
    }
    if (this.state.isFocus) {
      return this.setState({seleteSendTypeHeight:  this.state.keyBoardHeight,
                     selectTypeOpacity: 1,
                     selectZindex: 1
                           }, () => setTimeout(() => this.textInput.blur(), 100));
    }
    this.setState({seleteSendTypeHeight:  this.state.keyBoardHeight || 170,
                     selectTypeOpacity: 1,
                     selectZindex: 1
                    });
  };
  _onBlure () {
    this.setState({isFocus: false
                  });
  }
  _onFocus () {
    this.setState({seleteSendTypeHeight: 0,
                   selectTypeOpacity: 0,
                   selectZindex: 0,
                   isFocus: true
                  });
  }
  _onPressListView () {
     return this.setState({seleteSendTypeHeight: 0,
                           selectTypeOpacity: 0,
                           selectZindex: 0
                          });
  }
  render() {
    console.log('data', this.state.dataSource);
    let content = (
      <View>
      <View
        style={styles.container}
        >
        <TouchableWithoutFeedback
          onPress={this._onPressListView.bind(this)}>
          <ListView
          refreshControl={
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onPullMessage}
                  />
              }
              onEndReached={() => {
                this._userReachEnd = true;
          }}
          onEndReachedThreshold={10}
          ref={(reference) => { this.chatListView = reference; }}
          enableEmptySections={true}
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
            renderRow={this._renderRow}
            dataSource={ this.state.dataSource }

              />
          </TouchableWithoutFeedback>
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
                      ref={ (input) => this.textInput = input}
                      style={[styles.input, {
                      height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180 )}]}
                      multiline={true}
                      controlled={true}
                      underlineColorAndroid="transparent"
                      returnKeyType="default"
                      value={this.state.inputValue}
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
                  ) : (
                    <View
                      style={[styles.input, {justifyContent: 'center', alignItems: 'center'},  {
                      height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180 )}]}>
                      <TouchableOpacity
                        style={ styles.voiceButton }
                        onLongPress={this._onLongPressVoice.bind(this)}
                        onPressOut={this._onPressOutVoice.bind(this)}
                        >
                      <Text style={{color: Color.Grey}}>{this.state.voiceValue}</Text>
</TouchableOpacity>
</View>
                  )
              }
        <TouchableOpacity
      onPress={ this._onPressAddButton.bind(this)}
      style={styles.selectSendContentButton}>
        { SelectSendContent }
      </TouchableOpacity>
        <Button
      style={styles.sendButton}
      textStyle={ styles.sendButtonText }
      disabled={ !this.state.inputValue }
      onPress={ this._onSubmitEditing }>
        发送
      </Button>
        </View>
        </View>
        <Animatable.View
      duration={ 300 }
      easing="linear"
      transition={["height"]}
      style={[styles.seleteType, { height: this.state.seleteSendTypeHeight,  zIndex: this.state.selectZindex}]}>
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2}
      onPress={ () => this.setState({modalVisible: true})}
      text={"红包"}
      Icon={selectWallet} />
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2}
      text={"相册"}
      onPress={ () => alert('ok')}
      Icon={ selectPhoto } />
        <SeletTypeItem
      height={(this.state.keyBoardHeight || 170) / 2}
      text={"相机"}
      onPress={ () => alert('ok')}
      Icon={ selectCamera } />
        </Animatable.View>
        <Modal
      animationType={"slide"}
      transparent={ false }
      visible={this.state.modalVisible}
        >
        <HandSendRedMoneyModal closeModal={() => this.setState({modalVisible: false})}/>
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
      onPress={ onPress}
      >
      <View style={styles.selectItemIcon}>
      { Icon }
      </View>
      <Text style={{width: '100%', marginTop: 5, color: Color.Black, textAlign: 'center', fontSize: 12}}>{ text}</Text>
    </TouchableOpacity>
  );
}

class MessageCell extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.message.msg.content}</Text>
      </View>
    )
    let { currentUser, message } = this.props;

    let differentStyle = {};
    //判断消息来源id号和用户id号
    if (message.from === currentUser) {
      differentStyle = {
        flexDirection: 'row-reverse',
        backgroundColor: '#92E649'
      };
    } else {
      differentStyle = {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
      };
    }

    return (
      <View
        style={[styles.messageCell, {flexDirection: differentStyle.flexDirection}]}
        >
        <Image
          source={{
            uri: message.avatar
          }}
          style={styles.avatar}
          />
        <View
          style={[styles.contentView, {backgroundColor: differentStyle.backgroundColor}]}
          >
          <Text style={styles.messageCellText}>{message.msg.content}</Text>
        </View>
        <View style={styles.endBlankBlock} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.White
  },
  KeyboardAvoidingView: {
    flex: 1
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Color.LittleGrey,
    borderBottomWidth: 1,
    backgroundColor: Color.White,
    position: 'relative'
  },
  sendButton: {
    marginHorizontal: 6,
    backgroundColor: Color.red,
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
    padding: 10
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
  contentView: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    overflow: 'hidden',
    flexShrink: 1,
    margin: 5,
    justifyContent: 'center'
  },
  endBlankBlock: {
    margin: 5,
    width: 50,
    height: 40
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
    height: 25,
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
  }
});


const mapStateToProps = state => ({
  chatData: state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
