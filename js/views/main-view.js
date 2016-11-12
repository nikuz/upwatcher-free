'use strict';

import React from 'react';
import {
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';
import * as config from '../config';
import Feeds from './feeds/controller';
import Preview from './preview/controller';
import Settings from './settings/controller';
import OverlaysManager from './../views/overlays-manager/controller';
import ErrorManager from './../views/errors/controller';
import NotificationsManager from './../views/notifications/controller';
import NavigatorBar from './../components/navigator-bar/code';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'inbox',
      prevId: ''
    };
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.back = this.back.bind(this);
  }
  onSettingsClick() {
    this.props.pushState('settings');
  }
  back() {
    this.props.popState(this.state.prevId);
  }
  componentWillReceiveProps(nextProps) {
    var stateId = nextProps.state.id,
      stateName = nextProps.state.name,
      stateData = nextProps.state.data;

    if (nextProps.state.type === 'push') {
      this.setState({
        id: stateId,
        prevId: this.state.id
      });
      this.refs.navigator.push({
        title: stateName.substring(0, 1).toUpperCase() + stateName.substring(1, stateName.length),
        id: stateId,
        backButton: true,
        data: stateData
      });
    } else if (nextProps.state.type === 'pop') {
      this.setState({
        id: stateId,
        prevId: null
      });
      this.refs.navigator.pop();
    }
  }
  shouldComponentUpdate = () => false;
  renderScene(route, navigator) {
    switch (route.id) {
      case 'inbox':
        return <Feeds />;
      case 'preview':
        return <Preview
          navigator={navigator}
          data={route.data}
        />;
      case 'settings':
        return <Settings />;
    }
  }
  render() {
    var initialRoute = {
      title: config.APP_NAME,
      initial: true,
      type: 'tab',
      id: 'inbox',
      rightButton: (
        <TouchableOpacity style={styles.nav_bar_button} onPress={this.onSettingsClick}>
          <MaterialIcons name="menu" style={styles.nav_bar_button_icon} />
        </TouchableOpacity>
      )
    };
    return (
      <View style={styles.container}>
        <Navigator
          ref="navigator"
          initialRoute={initialRoute}
          renderScene={this.renderScene}
          navigationBar={
            <NavigatorBar
              route={initialRoute}
              backHandler={this.back}
            />
          }
          style={styles.navigator}
        />
        <OverlaysManager />
        <ErrorManager />
        <NotificationsManager />
      </View>
    );
  }
}

Main.propTypes = {
  state: React.PropTypes.object.isRequired,
  pushState: React.PropTypes.func.isRequired,
  popState: React.PropTypes.func.isRequired
};

export default Main;
