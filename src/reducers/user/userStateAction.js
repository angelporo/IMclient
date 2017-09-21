/**
 * 用户客户端UI相关action
 * Param: param
 * Return: {undefined}
 **/

import * as types from './userType';
import WebIM from '../../Lib/WebIM';

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