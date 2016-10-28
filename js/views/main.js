'use strict';

import React from 'react';
import {
  View,
  Navigator
} from 'react-native';
import * as config from '../config';
import Feeds from './feeds/controller';
import JobView from './settings/controller';
import Settings from './settings/controller';
import OverlaysManager from './../views/overlays-manager/code';
import NavigatorBar from './../components/navigator-bar/code';
import * as appStateActions from '../actions/state';
import appStore from '../store';
import styles from './style';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'inbox',
      prevName: ''
    };
    this.stateChangeListener = this.stateChangeListener.bind(this);
    this.back = this.back.bind(this);
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
        id: stateName,
        backButton: true
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
  shouldComponentUpdate = () => false;
  componentDidMount() {
    appStore.subscribe(this.stateChangeListener);
  }
  render() {
    var initialRoute = {
      title: config.APP_NAME,
      initial: true,
      type: 'tab',
      id: 'inbox',
      onRightButtonClick: this.onSettingsClick
    };
    return (
      <View style={styles.container}>
        <Navigator
          ref="navigator"
          initialRoute={initialRoute}
          renderScene={this.renderScene}
          navigationBar={
            <NavigatorBar route={initialRoute} />
          }
          style={styles.navigator}
        />
        <OverlaysManager />
      </View>
    );
  }
}

export default Main;
