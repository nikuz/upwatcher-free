'use strict';

import * as React from 'react';
import {
  PushNotificationIOS,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import PushNotifications from 'react-native-push-notification';
import NotificationsView from './view';

const mapStateToProps = function(state) {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    registration: function() {
      // if (Platform.OS === 'ios') {
      //   PushNotificationIOS.requestPermissions();
      //   PushNotificationIOS.addEventListener('register', this.registerHandler);
      //   PushNotificationIOS.addEventListener('notification', this.onNotificationHandler);
      // } else {
      //   PushNotifications.configure({
      //     requestPermissions: false, // disable iOS processing for third party plugin
      //     onRegister: token => {
      //       this.registerHandler(token);
      //     },
      //     onNotification: () => {
      //       this.onNotificationHandler();
      //     }
      //   });
      // }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsView);
