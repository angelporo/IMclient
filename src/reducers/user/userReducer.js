import  inintUserState from './state';
import * as types from './userType';

export default function user(state = inintUserState, action) {
    switch (action.type) {
    case types.CLOSE_MUNE:
        return { ...state, isShowMune: action.menuState };
    case types.CHANGE_LOGGIN_STATE:
        return { ...state, isLogged: action.isLogged, userId: action.userid };
    case types.CHANGE_KEY_HEIGHT:
        return {...state, keyBoardHeight: action.keyHeight };
    case types.GET_ROSTER:
      console.log(action);
      return {...state};
    default:
        return state;
    }
}
