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

export function changeLogginState ({userid, isLoggin}) {
  return {
    type: types.CHANGE_LOGGIN_STATE,
    userid,
  };
}

export function changeKeyHeight ({keyHeight}) {
  return {
    type:types.CHANGE_KEY_HEIGHT,
    keyHeight
  }
}
