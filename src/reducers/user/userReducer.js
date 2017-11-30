import  inintUserState from './state';
import * as types from './userType';
import { DeviceStorage } from '../../utils.js';
import config from "../../config";


export default function user(state = inintUserState, action) {
    switch (action.type) {
    case types.CHANGE_LOGGIN_STATE:
      // 登录成功改变登录状态和写入获取数据
      console.log(action);
      const resUser = action.response.content.user;
      const userFriend = action.response.content.friend;
      const recentConcat = action.response.recentConcat;
      return { ...state,
               psd: action.psd,
               isLogged: action.isLoggin,
               // isFetch: action.isFetch,
               userid: resUser.Id,
               mobile: resUser.Mobile,
               userName: resUser.Name,
               qrcodeUrl: `${config.domain}${resUser.avatar}`,
               friendList: userFriend || [],
               userRecentChat: recentConcat || [],
             };
    case types.CLOSE_MUNE:
        return { ...state, isShowMune: action.menuState };
    case types.CHANGE_KEY_HEIGHT:
        DeviceStorage.save("keyBoardHeight", action.keyHeight); // 保存keyBoardHeight到数据库
        return {...state, keyBoardHeight: action.keyHeight };
    case types.GET_ROSTER:
        return Object.assign({}, state, { friendList: action.roster });
    case types.CAHNGE_GROUP:
        return Object.assign({}, state, { userRecentChat : action.result});
    case types.SEND_GROUP_CHAT_INFO:
      // 更新消息内容
      state.userRecentChat[action.index].latestMessage = action.msgData.msg.content;
      // 更新消息时间
      state.userRecentChat[action.index].latestTime = action.msgData.ext.sendTime;
      state.userRecentChat[action.index].chatRoomHistory.push( action.msgData );
      console.log(state)
        return JSON.parse(JSON.stringify(state));
    case types.SAVE_USERID:
        return Object.assign({}, state, { userid: action.userId, isLogged: true });
    case types.SWITCH_CHAT_TOP:
        state.userRecentChat[action.index].isTop = action.isTop;
        console.log('比较', Object.assign({}, state) === state );
        return JSON.parse(JSON.stringify(state));
    case types.SET_GROUP_NAME:
        // 群主设置群聊名称
        state.userRecentChat[action.index].name = action.content;
        return JSON.parse(JSON.stringify(state));
    case types.SET_GROUP_USERNAME:
        // 修改用户在群聊中的昵称
        state.userRecentChat[action.index].groupMembers.myUserNameAsGroup = action.content
      return JSON.parse(JSON.stringify(state));

    case types.ON_TEXT_MESSAGE:
      // 收到文本消息
    default:
        return state;
    }
}
