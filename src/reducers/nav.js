import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import initUserState from '../reducers/user/state';
// import nav from './navReducer'; // 路由reducer
const initAction = initUserState.isLogged ? "MyApp" : "Login";
const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams(initAction);

const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav( state = initialNavState, action ) {
  let nextState;
  switch ( action.type ) {
  case 'Logined':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'MyApp' }),
      state
    );
    break;
  case 'unLogin':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.back(),
      state
    );
    break;
  case 'Register':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Register' }),
      state
    );
    break;
  case "AddFriend":
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'AddFriend' }),
      state
    );
  default:
    nextState = AppNavigator.router.getStateForAction(action, state);
    break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export default nav;
