/**
 * 用户所有actions
 * Param: param
 * Return: {undefined}
 **/
import * as types from './userType';
import WebIM from '../../Lib/WebIM';
import "whatwg-fetch";
import { DeviceStorage,
         getNowFormatDate,
         timeDifference,
         DateFormat
       } from '../../utils.js';
import config from "../../config";

Date.prototype.format = function (format) {
           var args = {
               "M+": this.getMonth() + 1,
               "d+": this.getDate(),
               "h+": this.getHours(),
               "m+": this.getMinutes(),
               "s+": this.getSeconds(),
               "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
               "S": this.getMilliseconds()
           };
           if (/(y+)/.test(format))
               format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
           for (var i in args) {
               var n = args[i];
               if (new RegExp("(" + i + ")").test(format))
                   format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
           }
           return format;
       };
// import * as userUiAction from './userStateAction';


// // 之后重构action样板
// export default {
//   changeFetch: userUiAction.changeFetch, // 改变用户当时请求状态
//   switchMenuState: userUiAction.switchMenuState // 更改登录注册时显示的菜单状态

// }

/**
 * 改变当前请求状态
 * Param: {isFetch: Boolean}
 * Return: {undefined}
 **/
export function changeFetch (isFetch) {
    return {
        type: types.CHANGE_FETCH_STATE,
        isFetch
    };
}

/**
 * 更改登录注册时显示的菜单状态
 * Param: param
 * Return: {undefined}
 **/
export function switchMenuState ({menuState}) {
    return {
        type: types.CLOSE_MUNE,
        menuState
    };
}


/**
 * 修改登录状态
 * Param: param
 * Return: {undefined}
 **/
export function changeLogginState ({ response, isLoggin, psd }) {
  // 登录成功后连接环信, 开启接受推送资源
  WebIM.conn.open({
    apiUrl: WebIM.config.apiURL,
    user: response.content.user.Name,
    pwd: psd,
    appKey: WebIM.config.appkey
  });
  return {
    type: types.CHANGE_LOGGIN_STATE,
    response,
    isLoggin,
    psd
  };
}

/**
 * 修改app中键盘高度
 * Param: param
 * Return: { undefined }
 **/
export function changeKeyHeight ({keyHeight}) {
  DeviceStorage.save("keyBoardHeight", keyHeight); // 保存keyBoardHeight到数据库
    return {
        type: types.CHANGE_KEY_HEIGHT,
        keyHeight
    };
}


/**
 * 更新store用户好友列表数据
 * Param: param
 * Return: {undefined}
 **/
export const updateRoster = (roster) => {
    let ros = [];
    roster.map( (n) => {
        if ( n.subscription === 'both' || n.subscription === 'to' ) {
            ros.push({
                avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                name: n.name,
                subscription: 'both',
                // 一下通过请求后台数据库获取
                userId: n.jid,
                vibration: true,
                phone: '13190172734',
              status: 'offline',
              ischeck: false
            });
        }
    });
    return {
        type: types.GET_ROSTER,
        roster: ros
    };
}


/**
 * 注册用户
 * Param: param
 * Return: {undefined}
 **/
export const register = ({userName, psd, nickName, phone}) => (dispatch , getState) => {
    const options = {
        username: userName,
        password: pad,
        nickname: nickName,
        appKey: WebIM.config.appkey,
        success: function () {
            alert('注册成功');
        },
        error: function () { },
        apiUrl: WebIM.config.apxoiURL
    };
    WebIM.conn.registerUser(options);
}

/**
 * 用户登录
 * Param: param
 * Return: {undefined}
 **/
export const loggin = ({mobile, passWord}) => (dispatch, getState) => {
    // if (WebIM.conn.isOpened()) {
    //     WebIM.conn.close('logout');
    // }
    const options = {
        // apiUrl: WebIM.config.apiURL,
        mobile: mobile,
        passWord: passWord,
        // appKey: WebIM.config.appkey,
    };
    // WebIM.conn.open( options );
}


/**
 * 保存用户id
 * Param: param
 * Return: {undefined}
 **/
export const saveUserId  = (userid) => {
    return {
        type: types.SAVE_USERID,
        userId: userid
    }
}

/**
 * 获取用户好友列表
 * Param: { rosterListData: Array }
 * Return: {undefined}
 **/
export const getRosterByIM = () => (dispatch, getState) => {
    console.log('请求中好友列表...');
    WebIM.conn.getRoster({
        success: roster => {
            // FIXME: 请求会好友列表之后需要向后台请求数据 单用户基本数据(头像...)
            console.log('获取用户好友', roster);
            dispatch(updateRoster(roster));
        },
        error: (error) => {
            //TODO ERROR
        }
    });
}

/**
 * 获取登录用户聊天群组列表
 * Param: param
 * Return: {undefined}
 **/
export const getGroupsRooms = () => ( dispatch, getState ) => {
    // FIXME: 对接环信用户聊天列表数据
    let options = {
        success: (resp) => {
            console.log("获取群聊列表", resp);
            if(!resp.length) return;
            dispatch( getChatRoomOthorInfoByGoupId( resp )(dispatch, getState) );
        },
        error:  (e) => {
            console.log('环信获取用户群主信息失败', e);
        }
    };
    WebIM.conn.listRooms(options);
}

/**
 * 发送群聊txt信息
 * Param: { msg: String,roomId: String }
 * Return: { undefined }
 **/
export const sendChatTxtMeg = ({
  requestBody,
  type,
  imgInfo,  // 发送图片是具体未知, 用来获取图片在客户端本地地址, 避免服务器压力过大
}) => (dispatch, getState) => {
  const data = getState().userReducer
  const userAvatar = data.avatar;
  console.log(requestBody)
  if (type == "txt") {
    // send txt message
    let textPath = `${config.domain}/sendmsg?time=${Date.now()}`
    let textcontenttype = 'application/json'
    // frist send and then change the chat state
    const userRecentChat = getState().userReducer.userRecentChat
    const target = requestBody.target[0]
    // 获取当前最近聊天记录索引
    const index = userRecentChat.findIndex( n => target == n.id)
    const sendTUnix = requestBody.ext.sendTime * 1000
    // 构建消息聊天记录
    const timeStemp = Date.now()
    const chatContent = {
      msg:{
        content: requestBody.msg.msg,
        type:requestBody.msg.type
      },
      avatar: userAvatar,
      from: requestBody.from,
      to:target,
      timeId: timeStemp,
      ext:{
        other: requestBody.ext,
        fromAvatar: requestBody.ext.fromAvatar,
        sendTime: sendTUnix, // 对比时间搓
      }
    }
    dispatch(updateStoreGroupInfo({msgData: chatContent, index: index}));
    // 发送成功 写入本地聊天记录里面 并且更新最近联系中数据
    fetch(textPath , {
      method:"POST",
      headers:{
        'Content-Type': textcontenttype,
      },
      body:JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        if(data.code != 0) {
          return alert(data.msg)
        }
        // TODO: 如果发送失败 改变发送消息的状态
      })
      .catch( e => console.log("发送聊天内容出错", e))
  }
  if (type == "img") {
    // 发送图片消息
    let imgPath = config.domain + "/sendimg"
    fetch(imgPath , {
      method:"POST",
      headers:{
        'Content-Type': 'multipart/form-data',
      },
      body: requestBody,
    })
      .then( response => response.json())
      .then( data => {
        if (data.code != 0) {
          alert(data.msg)
          return
        }
        data.content.forEach((n, i) => {
          // 遍历发送成功图片消息
          const msg = n.res.msg
          const ext = n.res.ext
          let sendImgContent = {
            ...n.info,
            type: n.res.target_type == "users" ? "chat" : "chatgroups",
            ext: {
              ...ext,
              // TODO: 使用客户端本地地址来渲染图片,
              // sendMsgUri(用户本地地址)
            },
            from: n.res.from,
            to: n.res.target[0],
            width: msg.size.width,
            height: msg.size.hegiht,
          }
          dispatch(onTextMessage({
            content: sendImgContent,
            type:"img",
            sendOrReceive: "send",
            roomId: sendImgContent.to
          }))
          // 发送图片后显示到聊天记录里面
        })
      })
    .catch( e => console.log(e))
  }

}


/**
 * 更新用户聊天记录
 **/
export const updateStoreGroupInfo = ({ msgData, index }) => {
    return {
        type: types.SEND_GROUP_CHAT_INFO,
        msgData,
        index,
    }
}

/**
 * 通过聊天室id获取聊天室自己数据库中数据
 * Param: {resp: Array}
 * Return: { Promise }
 **/
export const getChatRoomOthorInfoByGoupId =  resp => (dispatch, getState) => {
    // NOTE: 通过遍历获取每个聊天室id,  异步 通过每个聊天室id获取自己服务器中详细内容
    return {
        type: types.CAHNGE_GROUP,
        result: result
    };
}

/**
 * 根据群聊id查询群聊成员
 * Param: param
 * Return: { undefined }
 **/
export const getGroupMemberByGroupID = function (id) {
    return async function (dispatch, getState) {
        // 查询群聊信息 -> 自己服务器
    const options = {
        roomId: id,
        success: function ( resp ) {
            console.log("members:", resp );
        },
        error: function(e){}
    };
        await WebIM.conn.queryRoomMember( options );
    }
}


/**
 * 获取群聊管理员列表
 * Param: param
 * Return: {undefined}
 **/
export const getAdminIdByGroup =  ( groupId ) => (dispatch, getState) => {
    const reult = [];
    /**
     * http request
     * Param: param
     * Return: {undefined}
     **/
    return result
}



/**
 * 更新用户参与聊天列表
 * Param: param
 * Return: { Object }
 **/
export const updataChatRooms = ({ chatRooms }) => {
    return {
        type: types.CHANGE_CHAT_ROOMS,
        chatRooms
    };
}

/**
 * 切换聊天顶置功能
 * Param: param
 * Return: {undefined}
 **/
export const switchIsTopChat = ({ index, isTop }) => {
  return {
    type: types.SWITCH_CHAT_TOP,
    index,
    isTop
  }
}

/**
 * 设置群昵称
 * Param: param
 * Return: {undefined}
 **/
export const setGroupName = ({content, setType, index}) => {
    return ({
        type: types.SET_GROUP_NAME,
        content,
        index // 当前群聊消息在聊天数组中的索引
    });
}

/**
 * 设置用户在群聊中的昵称
 * Param: param
 * Return: {undefined}
 **/
export const setUserNameAsGroupChat = ({content, setType, index}) => {
    return ({
        type: types.SET_GROUP_USERNAME,
        content,
        index // 当前群聊消息在聊天数组中的索引
    });
}

// 收到文本消息,
// 最近联系表如果有, 追加聊天记录
// 最近联系列表如果没有, 添加追进联系人列表到本地, 并且写入聊天记录
export const onTextMessage = ({content, type, sendOrReceive, roomId}) => (dispatch, getState) => {
  // 接收和发送时的目标字段不相同,  所以使用变量来判断
  if (content.error) {
    alert(content.errorText);
  }
  let store = getState().userReducer;
  let rencentChatList = store.userRecentChat;
  let has = rencentChatList.findIndex( n => n.id == roomId);
  const msgType = content.type == 'chat' ? "users" : "chatgroups";
  const unixD = content.ext.sendTime * 1000
  console.log('content', content)
  if (has == -1) {
    // 添加到最近聊天头部
    console.log(getState().userReducer)
    let ext = content.ext
    // 构建最近聊天记录详情
    let userRecent = {
      avatar: ext.fromAvatar,
      id: content.to,
      isTop:false,
      latestMessage: content.data,
      latestTime: unixD,
      name: content.type == "groupchat" ? ext.targetInfo.groupInfo.name : ext.targetInfo.chatInfo.Name,
      type: content.type == 'groupchat' ? "chatgroups" : "users",
      groupMembers: ext.targetInfo.groupInfo.affiliations,
      chatRoomHistory: [{
        msg:{
          content: type == "img" ? "[图片]" : content.data,
          type: type,
        },
        type:msgType,
        avatar: config.domain + content.ext.fromAvatar,
        from: content.from,
        to: content.to,
        ext: {
          other: content.ext,
          fromAvatar: content.ext.fromAvatar,
          sendTime: unixD, // 对比时间搓
        }
      }]
    }
    // 添加到列表中
    dispatch(addRecnentChatUnshift({content: userRecent}))
  }else {
    // 现有最近聊天存在
    // comment: 最近聊天列表有, 写入聊天记录
      const chatContent = {
        msg:{
          content: type == "img" ? "[图片]" : content.data,
          type: type,
        },
        type: msgType,
        avatar: config.domain + content.ext.fromAvatar,
        from: content.from,
        to: content.to,
        ext: {
          other: content.ext,
          fromAvatar: content.ext.fromAvatar,
          sendTime: unixD, // 对比时间搓
        }
      }
    // 发送成功 写入本地聊天记录里面
    dispatch(updateStoreGroupInfo({ msgData:chatContent, index: has }));
    // 更改最后聊天内容
  }
}

/*
 * 新建群组聊天
 */
export let addRecnentChatUnshift = ({content}) => {
  return ({
    type: types.CREATE_GROUPS,
    content,
  })
}


export let appendToMembersByRoomId = ({members, idx}) => {
  return ({
    type: types.APEND_MEMBERS_TO_RECENT,
    members,
    idx,
  })
}

/*
 * params { userName: []string}
 */
export let getGroupsMemberByUserName = ({userNames, idx}) => (dispatch, getState) => {
  const path = `${config.domain}/getusersInfo`
  let request = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName: userNames})
  }
  fetch(path, request)
    .then(response => response.json())
    .then(data => {
      if (data.code != 0) {
        alert(data.msg)
        return
      }
      const groupsMemberInfo = data.content.map(n => {
        return ({
          name: n.Name,
          age: n.Age,
          avatar: n.Avatar,
          userName: n.Name,
          mobile: n.Mobile,
          id: n.Name,
        })
      })
      dispatch(appendToMembersByRoomId({members: groupsMemberInfo,
                                        idx: idx}))
    })
    .catch( e => console.log(e))
}
