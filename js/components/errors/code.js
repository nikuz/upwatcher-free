'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';
import * as _ from 'underscore';
import * as EventManager from '../../modules/events';
import * as navigatorHelpers from '../../modules/navigator';
import styles from './style';

const positionOnScreen = 39,
  hiddenPositionOnScreen = 0,
  animationDuration = 300;

class Errors extends React.Component {
  state = {
    network: false,
    inbox: false,
    animTop: new Animated.Value(hiddenPositionOnScreen),
    animOpacity: new Animated.Value(0)
  };
  resetState() {
    return {
      network: false,
      inbox: false
    };
  }
  show = (state) => {
    var curRoute = navigatorHelpers.getCurRoute(this.props.navigator);
    if (curRoute.id === 'job_view' && this.props.parent === 'list') {
      return;
    }
    this.setState(_.extend(this.resetState(), state));
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: positionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 1
      })
    ]).start();
    setTimeout(this.hide, 2000);
  };
  hide = () => {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: hiddenPositionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 0
      })
    ]).start();
  };
  networkErrorHandler = () => {
    this.show({
      network: true
    });
  };
  inboxErrorHandler = () => {
    this.show({
      inbox: true
    });
  };
  componentDidMount() {
    EventManager.on('networkError', this.networkErrorHandler);
    EventManager.on('inboxError', this.inboxErrorHandler);
  };
  componentWillUnmount() {
    EventManager.off('networkError', this.networkErrorHandler);
    EventManager.off('inboxError', this.inboxErrorHandler);
  }
  render() {
    return (
      <Animated.View style={[styles.wrap, {top: this.state.animTop, opacity: this.state.animOpacity}]}>
        <Text style={styles.text}>
          {this.state.network ?
            <Text>Check your internet connection</Text>
            : null
          }
          {this.state.inbox ?
            <Text>Something went wrong, please try again</Text>
            : null
          }
        </Text>
      </Animated.View>
    );
  }
}

export default Errors;