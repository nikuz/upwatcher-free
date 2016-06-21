'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  Navigator
} from 'react-native';
import * as config from '../config';
import Feeds from './feeds/code';
import OverlaysManager from './../views/overlays-manager/code';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import logo from '../../images/logo.png';

class Main extends React.Component {
  onSettingsClick = () => {

  };
  back = () => {
    this.refs.navigator.pop();
  };
  renderScene(route, navigator) {
    var component;
    switch (route.id) {
      case 'inbox':
        component = <Feeds navigator={navigator} />;
        break;
      case 'job_view':
        component = <JobView {...route.job_data} navigator={navigator} />;
        break;
      case 'settings':
        component = <Settings />;
        break;
    }
    return component;
  }
  renderNavBar = () => {
    return {
      LeftButton: function(route) {
        if (route.id !== 'inbox') {
          return (
            <TouchableOpacity style={styles.icon_wrap} onPress={this.back}>
              <Icon name="arrow-left" style={styles.icon} />
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      },
      Title: (route) => {
        if (route.id === 'inbox') {
          return (
            <View style={styles.title}>
              <Image
                style={styles.logo}
                source={logo}
              />
            </View>
          );
        } else {
          return (
            <View style={styles.title}>
              <Text style={styles.title_text}>{route.title}</Text>
            </View>
          );
        }
      },
      RightButton: (route) => {
        if (route.id === 'settings') {
          return (
            <TouchableOpacity style={styles.icon_wrap} onPress={this.onSettingsClick}>
              <Icon name="sliders" style={styles.icon} />
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref="navigator"
          initialRoute={{
            title: config.APP_NAME,
            type: 'tab',
            id: 'inbox'
          }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={this.renderNavBar()}
              style={styles.nav_bar}
            />
          }
          style={styles.navigator}
        />
        <OverlaysManager />
      </View>
    );
  }
}

export default Main;
