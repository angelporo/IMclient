import * as types from './userType';
import WebIM from '../../Lib/WebIM';

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
export function changeLogginState ({userid, isLoggin}) {
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
    return {
        type:types.CHANGE_KEY_HEIGHT,
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
            dispatch( getChatRoomOthorInfoByGoupId( resp ) );
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
                from: '234432',
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
export function getChatRoomOthorInfoByGoupId  (resp) {
    // NOTE: 通过遍历获取每个聊天室id,  异步 通过每个聊天室id获取自己服务器中详细内容
    let result = [];
    resp.forEach( item => {
        // TODO: 通过群聊id获取自己 线上群聊信息
        // await fetch( uil, data)
        // .then( response => response.json() )
        // .then( data => {
        //     // TODO: 对接store中数据接口
        //     console.log(data);
        // })
        // .catch( e => console.log('用户聊天群组列表ERR', e));
        const data = { // 返回 构建结构
            latestMessage: '最后的消息',
            latestTime: '2017-03-23',
            name: item.name,
            id: item.roomId,
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
export const getGroupMemberByGroupID = (id, page) => (dispatch, getState) => {
    const pageNum = 1,
    pageSize = 1000;
    const options = {
        pageNum: pageNum,
        pageSize: pageSize,
        groupId: 'yourGroupId',
        success: function (resp) {
            console.log("Response: ", resp);
        },
        error: function(e){}
    };
    WebIM.conn.listGroupMember(options);
}

/**
 * 更新用户参与聊天列表
 * Param: param
 * Return: { Object }
 **/
export const updataChatRooms = ({chatRooms}) => {
    return {
        type: types.CHANGE_CHAT_ROOMS,
        chatRooms
    };
}
