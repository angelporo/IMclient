import { CLOSE_MUNE, CHANGE_LOGGIN_STATE } from './userType';

/**
 * 更改登录注册时显示的菜单状态
 * Param: param
 * Return: {undefined}
 **/
export function switchMenuState ({menuState}) {
  return {
    type: CLOSE_MUNE,
    menuState
  };
}

export function changeLogginState ({userid, isLoggin}) {
  return {
    type: CHANGE_LOGGIN_STATE,
    userid,
  };
}
