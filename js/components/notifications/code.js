'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PushNotificationIOS,
  Platform
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import * as EventManager from '../../modules/events';
import Icon from 'react-native-vector-icons/FontAwesome';
import PushNotifications from 'react-native-push-notification';
import styles from './style';

const positionOnScreen = 39,
  hiddenPositionOnScreen = -40,
  animationDuration = 300;

class Notifications extends React.Component {
  state = {
    curFolder: 'inbox',
    animTop: new Animated.Value(hiddenPositionOnScreen),
    animOpacity: new Animated.Value(0)
  };
  show = () => {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: positionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 1
      })
    ]).start();
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
  registerHandler = (token) => {
    EventManager.trigger('notificationsTokenAdded', {token});
  };
  onNotificationHandler = () => {
    if (this.state.curFolder === 'inbox') {
      this.show();
    }
  };
  clickHandler = () => {
    this.hide();
    EventManager.trigger('notificationsClicked');
  };
  onFolderChangedHandler = (options) => {
    var opts = options || {};
    this.setState({
      curFolder: opts.folder
    });
  };
  componentDidMount() {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
      PushNotificationIOS.addEventListener('register', this.registerHandler);
      PushNotificationIOS.addEventListener('notification', this.onNotificationHandler);
    } else {
      PushNotifications.configure({
        requestPermissions: false, // disable iOS processing for third party plugin
        onRegister: token => {
          this.registerHandler(token);
        },
        onNotification: () => {
          this.onNotificationHandler();
        }
      });
    }
    EventManager.on('folderChanged', this.onFolderChangedHandler);
  };
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register', this.registerHandler);
    PushNotificationIOS.removeEventListener('notification', this.onNotificationHandler);
    EventManager.off('folderChanged', this.onFolderChangedHandler);
  }
  render() {
    return (
      <Animated.View style={[styles.wrap, {top: this.state.animTop, opacity: this.state.animOpacity}]}>
        <TouchableOpacity style={styles.button} onPress={this.clickHandler}>
          <Text style={styles.text}>
            <Icon name="arrow-up" style={styles.icon} /> Show new jobs
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Notifications;