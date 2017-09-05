import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
// import nav from './navReducer'; // 路由reducer

const firstAction = AppNavigator.router.getActionForPathAndParams('Login');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);

const initialNavState = AppNavigator.router.getStateForAction(
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
  case 'Logined':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'MyApp' }),
      state
    );
    break;
  case 'Login':
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
  default:
    nextState = AppNavigator.router.getStateForAction(action, state);
    break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export default nav;
