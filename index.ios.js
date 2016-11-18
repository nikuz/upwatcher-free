'use strict';

import env from './env';
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import AppStore from './js/store';
import Main from './js/views/main';

class App extends React.Component {
  render() {
    return (
      <Provider store={AppStore}>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('upwatcherfree', () => App);
