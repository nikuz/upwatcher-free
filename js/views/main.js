'use strict';

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Navigator
} from 'react-native';
import * as config from '../config';
import Feeds from './feeds/controller';
import JobView from './settings/controller';
import Settings from './settings/controller';
import OverlaysManager from './../views/overlays-manager/code';
import * as appStateActions from '../actions/state';
import appStore from '../store';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import logo from '../../images/logo.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'inbox',
      prevName: ''
    };
    this.stateChangeListener = this.stateChangeListener.bind(this);
    this.back = this.back.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);
  }
  stateChangeListener() {
    var stateName = appStore.getState().state.name;
    if (stateName !== this.state.name) {
      this.setState({
        name: stateName,
        prevName: this.name
      });
      this.refs.navigator.push({
        title: stateName.substring(0, 1).toUpperCase() + stateName.substring(1, stateName.length),
        id: stateName
      });
    }
  }
  onSettingsClick() {
    appStore.dispatch(appStateActions.change('settings'));
  }
  back() {
    this.setState({
      name: this.prevName
    });
    this.refs.navigator.pop();
  }
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
  renderNavBar() {
    return {
      LeftButton: (route) => {
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
        if (route.id !== 'settings') {
          return (
            <TouchableOpacity style={styles.icon_wrap} onPress={this.onSettingsClick}>
              <Icon name="sliders" style={styles.icon} />
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      }
    };
  }
  shouldComponentUpdate = () => false;
  componentDidMount() {
    appStore.subscribe(this.stateChangeListener);
  }
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
