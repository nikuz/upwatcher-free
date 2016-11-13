'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import AppStore from '../../store';
import FCM from 'react-native-fcm';
import * as notificationsActions from '../../actions/notifications';
import * as feedsActions from '../../actions/feeds';
import NotificationsView from './view';

const mapStateToProps = function(state) {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    registration: async function() {
      // PushNotifications.configure({
      //   onRegister: function(token) {
      //     console.log(token);
      //     // this.registerHandler(token);
      //   },
      //   onNotification: function(notification) {
      //     console.log(notification);
      //     dispatch(feedsActions.refresh());
      //     // dispatch(notificationsActions.show());
      //   },
      //   senderID: process.env.GCM_SENDER_ID
      // });
      var token = await FCM.getFCMToken();

      // console.log(initialNotification);
      // if (await FCM.getInitialNotification()) {
      //   console.log('adasdasd');
      //   // dispatch(feedsActions.refresh());
      // }
      FCM.on('notification', function() {
        var appState = AppStore.getState();
        if (appState.state.id === 'inbox') {
          dispatch(notificationsActions.show());
        } else {
          dispatch(feedsActions.refresh());
        }
      });
    },
    onPress: function() {
      dispatch(feedsActions.refresh());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsView);
