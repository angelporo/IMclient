/**
 * 用户所有actions
 * Param: param
 * Return: {undefined}
 **/
import * as types from './userType';
import WebIM from '../../Lib/WebIM';
import { DeviceStorage } from '../../utils.js';
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
export function changeLogginState ({ userid, isLoggin }) {
    return {
        type: types.CHANGE_LOGGIN_STATE,
        userid
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
export const loggin = ({phone, psd}) => (dispatch, getState) => {
    if (WebIM.conn.isOpened()) {
        WebIM.conn.close('logout');
    }
    const options = {
        apiUrl: WebIM.config.apiURL,
        user: phone,
        pwd: psd,
        appKey: WebIM.config.appkey,
    };
    WebIM.conn.open( options );
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
 * 获取当前登录用户参与的聊天(项目中不使用聊天室功能)
 * Param: param
 * Return: {undefined}
 **/
export const getChatRooms = () => ( dispatch, getState ) => {
    WebIM.conn.getChatRooms({
        apiUrl: WebIM.config.apiURL,
        pagenum: 1,                                 // 页数
        pagesize: 25,                               // 每页个数
        success: function (list) {
            console.log('聊天室列表', list.data);
            dispatch( updataChatRooms({ chatRooms: list }))
        },
        error: function (e) {
            console.log('List chat room error');
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
export const sendChatTxtMeg = ({ chatData , roomID, message }) => (dispatch, getState) => {
    const msgId = WebIM.conn.getUniqueId();            // 生成本地消息id
    let msg = new WebIM.message('txt', msgId); // 创建文本消息
    console.log('msgid', msgId);
    const option = {
        msg: message,             // 消息内容
        to: roomID,                     // 接收消息对象(群组id)
        roomType: false,
        chatType: 'chatRoom',
        success: function () {
            // 发送群聊成功
            console.log('群聊信息发送成功');
            const msgData = {
                msg: {
                    content: message,
                    type: 'text'
                },
                msgID: msgId,
                avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                name: 'liyuan',
                from: '234432', // 消息来源后台存放用户jid
                to: '234543'
            };
            // 获取当前群组在联系人列表中索引
            const index = getState()
            .userReducer
            .userRecentChat
            .findIndex(n => n.id === roomID);
            dispatch( updateStoreGroupInfo({ msgData, index }));
        },
        fail: function () {
            console.log('failed');
        }
    };
    msg.set(option);
    msg.setGroup('groupchat');
    WebIM.conn.send(msg.body);
}

/**
 * 发送群聊成功信息 更新store中群聊信息
 * Param: { chatDataFormCurrentRoom : Array( 当前群组聊天数据 ), msg: String }
 * Return: { undefined }
 **/
export const updateStoreGroupInfo = ({ msgData, index }) => {
    return {
        type: types.SEND_GROUP_CHAT_INFO,
        msgData,
        index
    }
}


/**
 * 通过聊天室id获取聊天室自己数据库中数据
 * Param: {resp: Array}
 * Return: { Promise }
 **/
export const getChatRoomOthorInfoByGoupId =  resp => (dispatch, getState) => {
    // NOTE: 通过遍历获取每个聊天室id,  异步 通过每个聊天室id获取自己服务器中详细内容
    let result = [];
    resp.forEach( async (item) => {
        // TODO: 通过群聊id获取自己 线上群聊信息
        // await fetch( uil, data)
        // .then( response => response.json() )
        // .then( data => {
        //     // TODO: 对接store中数据接口
        //     console.log(data);
        // })
        // .catch( e => console.log('用户聊天群组列表ERR', e));
        // await getAdminIdByGroup(item.roomId)(dispatch, getState);
        const data = { // 返回 构建结构
            latestMessage: '最后的消息',
            latestTime: '2017-03-23',
            name: item.name,
            isTop: false,
            id: item.roomId,
            type: 'group', // 消息类型(group: 群聊, single: 单聊);
            groupMembers: {
                id: item.roomId,  // 聊天是id
                myUserNameAsGroup: '群内昵称',
                adminId: ['213445'], // 管理员id 用来比较设置权限问题
                groupName: '群名称',
                type: 'group', // 消息类型(group: 群聊, single: 单聊);
                members: [{ //群聊成员
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                    userName: 'liyuan',
                }, {
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                    userName: 'enhen',
                }, {
                    avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
                    id: '3453656423543',
                    userName: 'liyuan',
                }]
            },
            unReadMessageCount: 12,
            groupPageNum: 1,  // 查询群组成员页码
            avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',
            chatInfo: {
                name: '王宇飞',
                avatar: 'https://avatars1.githubusercontent.com/u/16830481?v=4&s=40',//对方头像
                userId: '34545645'// 对方聊天用户id
            },
            chatData: [{// 集体聊天记录
                msg: {
                    content: 'haha',
                    type: 'text'
                },
                avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
                name: 'liyuan',
                from: '23455553', // 消息来源id
                to: '233564'  // 消息发送id
            }, {
                msg: {
                    content: '一会就吃饭了, 想想今天吃什么!',
                    type: 'text'
                },
                avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
                name: 'liyuan',
                from: '223455553', // 消息来源id
                to: '233564'  // 消息发送id
            }, {// 集体聊天记录
                msg: {
                    content: 'haha',
                    type: 'text'
                },
                avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
                name: 'liyuan',
                from: '23455553', // 消息来源id
                to: '233564'  // 消息发送id
            }, {
                msg: {
                    content: '',
                    type: 'redPackage',
                    redPackageData: [2, 3, 4, 5, 4]
                },
                avatar: "https://avatars1.githubusercontent.com/u/16830481?v=4&s=40",
                name: 'liyuan',
                from: '23455553', // 消息来源id
                to: '233564'  // 消息发送id
            }]
        };
        result.push( data );
    });
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