import * as types from './userType';
import WebIM from '../../Lib/WebIM';

export function changeFetch (isFetch) {
    console.log('请求开始');
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
 * Return: {undefined}
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
                status: 'offline'
            });
        }
    });
    return {
        type: types.GET_ROSTER,
        roster: ros
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
            dispatch(updateRoster(roster));
        },
        error: (error) => {
            //TODO ERROR
        }
    });
}

/**
 * 获取当前登录用户参与的聊天
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
            dispatch( updataChatRooms({chatRooms: list}))
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
export const getGroupsRooms = () => (dispatch, getState) => {
  // FIXME: 对接环信用户聊天列表数据
    const options = {
        success: function (resp) {
            console.log("user groups response: ", resp);
            dispatch( updataChatGroups({groups: resp}));
        },
        error: function (e) {
            console.log(e);
        }
    };
    WebIM.conn.getGroup(options);
}


/**
 * 更新用户参与聊天列表
 * Param: param
 * Return: {undefined}
 **/
export const updataChatRooms = ({chatRooms}) => {
    return {
        type: types.CHANGE_CHAT_ROOMS,
        chatRooms,
    };
}


/**
 * 更新用户参与群组聊天
 * Param: param
 * Return: {undefined}
 **/
export const updataChatGroups = ({groups}) => {
    return {
        type: types.CAHNGE_GROUP,
        groups,
    }
}
