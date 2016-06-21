'use strict';

import env from './env';
import React from 'react';
import {AppRegistry} from 'react-native';
import Main from './js/views/main';

class App extends React.Component {
  render() {
    return <Main />
  }
}

AppRegistry.registerComponent('upwatcher', () => App);
