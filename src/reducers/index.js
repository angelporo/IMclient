import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import  nav from './nav';

const AppReducer = combineReducers({
  nav,
  userReducer
});

export default AppReducer;
