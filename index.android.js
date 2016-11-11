'use strict';

import env from './env';
import React from 'react';
import {
  StatusBar,
  View,
  AppRegistry
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import AppStore from './js/store';
import initialModelsSet from './js/models/main';
import Main from './js/views/main-controller';

class App extends React.Component {
  componentDidMount() {
    initialModelsSet();
    SplashScreen.hide();
    StatusBar.setBackgroundColor('#67be44');
  }
  render() {
    return (
      <Provider store={AppStore}>
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor="#67be44"
          />
          <Main />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('upwatcher', () => App);
