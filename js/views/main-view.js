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
import OverlaysManager from './../views/overlays-manager/controller';
import NavigatorBar from './../components/navigator-bar/code';
import styles from './style';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'inbox',
      prevName: ''
    };
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.back = this.back.bind(this);
  }
  onSettingsClick() {
    this.props.pushState('settings');
  }
  back() {
    this.props.popState(this.state.prevName);
  }
  componentWillReceiveProps(nextProps) {
    var stateName = nextProps.state.name;
    if (nextProps.state.type === 'push') {
      this.setState({
        name: stateName,
        prevName: this.state.name
      });
      this.refs.navigator.push({
        title: stateName.substring(0, 1).toUpperCase() + stateName.substring(1, stateName.length),
        id: stateName,
        backButton: true
      });
    } else if (nextProps.state.type === 'pop') {
      this.setState({
        name: stateName,
        prevName: null
      });
      this.refs.navigator.pop();
    }
  }
  shouldComponentUpdate = () => false;
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
            <NavigatorBar
              route={initialRoute}
              backHandler={this.back}
            />
          }
          style={styles.navigator}
        />
        <OverlaysManager />
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
