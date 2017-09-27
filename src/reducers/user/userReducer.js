import  inintUserState from './state';
import * as types from './userType';
import { DeviceStorage } from '../../utils.js';


export default function user(state = inintUserState, action) {
    switch (action.type) {
    case types.CHANGE_LOGGIN_STATE:
        return { ...state, isFetch: action.isFetch};
    case types.CLOSE_MUNE:
        return { ...state, isShowMune: action.menuState };
    case types.CHANGE_LOGGIN_STATE:
        return { ...state, isLogged: action.isLogged, userId: action.userid };
    case types.CHANGE_KEY_HEIGHT:
        DeviceStorage.save("keyBoardHeight", action.keyHeight); // 保存keyBoardHeight到数据库
        return {...state, keyBoardHeight: action.keyHeight };
    case types.GET_ROSTER:
        return Object.assign({}, state, { friendList: action.roster });
    case types.CAHNGE_GROUP:
        return Object.assign({}, state, { userRecentChat : action.result});
    case types.SEND_GROUP_CHAT_INFO:
        state.userRecentChat[ action.index ].chatData.push( action.msgData );
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
    default:
        console.log(state);
        return state;
    }
}
