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
  ScrollView,
  Platform,
  View,
  Modal,
  Dimensions,
  Keyboard,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import React, { Component } from 'react';
import { CachedImage } from "react-native-img-cache";
import FontSize from '../FontSize';
import Color from '../Color';
import config from '../../config'

export default class MessageCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentUser,
            message,
            onPreddRedPackage,
            key,
            handleImg
          } = this.props;
    // 获取消息类型
    const { type, content } = message.msg;
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
    const textMsg = (
      <View
        style={[styles.contentView, {backgroundColor: differentStyle.backgroundColor}]}>
        <Text style={ styles.messageCellText }>{ content }</Text>
      </View>
    );

    let chatMessage = (mgsComponent) =>{
      return (
        <View
          key={key}
          style={[ styles.messageCell,
          {flexDirection: differentStyle.flexDirection }]}>
          <CachedImage
            component={ Image }
            source={{
              uri: `${config.domain}${message.ext.fromAvatar}`
            }}
            style={ styles.avatar }
            mutable
            />
          { mgsComponent }
          <View style={styles.endBlankBlock} />
        </View>
      )
    }

    if (type == "txt") {
      return chatMessage(textMsg, key);
    }else if (type == 'redPackage') {
      // 红包消息
      return chatMessage(redPackageMsg({packageData: '',
                                        style: [styles.contentView],
                                        onPress: onPreddRedPackage
                                       }));
    }else if (type == "img") {
      // 图片信息
      return chatMessage(imgMsgComponent({
        uri: `${config.domain}/files/chatImg/${message.from}_TO_${message.to}/${message.ext.other.sendMsgUri}`,
        onPress: this.props.handleImg
        }));
    }else{
      return (
        <View key={key}>
          <Text>消息类型不正确!</Text>
        </View>
      )
    }
  }
}


const imgMsgComponent = ({
  uri,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={ onPress }
      style={ styles.sendMsgContent }
      >

      <CachedImage
        component={ Image }
        source={{
          uri: uri
        }}
        style={styles.sendMsgImg}
        mutable
        />
    </TouchableOpacity>
  )
}

/**
 * 红包类型提示消息
 * Param: param
 * Return: { undefined }
 **/
const redPackageMsg = ({
  packageData,
  style,
  onPress}) => {
    return (
      <TouchableOpacity
        onPress={ onPress }
        style={[styles.redPackageBox]}>
        <View style={styles.rePackageContent}>
          <Text style={styles.redPacageText}>大吉大利,红包拿来</Text>
        </View>
        <View style={styles.redPackageHint}>
          <Text style={ styles.rePackageHintText }>信信红包</Text>
        </View>
      </TouchableOpacity>
    );
  }

const styles = EStyleSheet.create({
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
  sendMsgContent:{

  },
  sendMsgImg:{
    width: "10rem",
    height: "8rem"
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
  redPackageBox: {
    width: "12rem",
    height: "5rem",
    backgroundColor: Color.Red,
    borderRadius: 4,
    overflow: 'hidden',
    margin: 5
  },
  rePackageContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  redPacageText: {
    color: Color.White
  },
  redPackageHint: {
    backgroundColor: Color.White,
    width: '100%',
    height: 20,
    padding: 5
  },
  rePackageHintText: {
    color: Color.Grey,
    fontSize: 12
  }
});
