/**
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './reducers/index';

import AppWithNavigationState from './navigators/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import styleConfig from './theme';

const store = createStore( AppReducer );
EStyleSheet.build(styleConfig);
class ReduxExampleApp extends React.Component {

  render() {
    return (
      <Provider store={ store }>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ImClient', () => ReduxExampleApp);

export default ReduxExampleApp;
