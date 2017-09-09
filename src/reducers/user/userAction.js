import * as types from './userType';

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
    userid,
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
 * 获取用户好友列表
 * Param: { rosterListData: Array }
 * Return: {undefined}
 **/
export function getRoster(rosterListData) {
  let roster = [];
  rosterListData.map( (n) => {
    if ( n.subscription === 'both' || n.subscription === 'to' ) {
      roster.push(n);
    }
  });
  return {
    type: types.GET_ROSTER,
    roster
  };
}
