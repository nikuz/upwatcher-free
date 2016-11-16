'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import AppStore from '../../store';
import FCM from 'react-native-fcm';
import * as notificationsActions from '../../actions/notifications';
import * as feedsActions from '../../actions/feeds';
import * as userController from '../../controllers/user';
import NotificationsView from './view';

const mapStateToProps = function(state) {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = function(dispatch) {
  var token,
    notificationUnsubscribe,
    refreshUnsubscribe;

  return {
    registration: async function() {
      token = await FCM.getFCMToken();
      // TODO: remove it:
      // token = 'fwQY8JdV2fw:APA91bF-z6QWwotN7fPWkO27swM0_KYNNrNbrzc1-5KDzyUlmEXqlDBi2HQ1TtgYGU_88w-RF5rJpZtUgXOZsUaYFvcRHt8zZFo0JqqS9bZLrQqBTPBNwRHm7219-daO19z2kJ43Jo1c';
      if (token) {
        // console.log(token);
        userController.registration(token); // registration on backend
      }

      // collapse_key: "com.upwatcher"
      // from: "538493948651"
      // google.message_id: "0:1479240421059848%562bde94562bde94"
      // google.sent_time: 1479240421033
      let initialNotification = await FCM.getInitialNotification();
      if (initialNotification && initialNotification.collapse_key && initialNotification['google.message_id']) {
        dispatch(feedsActions.refresh());
      }
      notificationUnsubscribe = FCM.on('notification', function() {
        let appState = AppStore.getState();
        if (appState.state.id === 'inbox' && appState.tabs.activeTab === 'search') {
          dispatch(notificationsActions.show());
        } else {
          dispatch(notificationsActions.scheduleAShowing());
        }
      });
      // fcm token may not be available on first load, catch it here
      refreshUnsubscribe = FCM.on('refreshToken', function(value) {
        if (!token) {
          token = value;
          userController.registration(token);
        }
      });
    },
    destroyEvents: function() {
      token = null;
      notificationUnsubscribe();
      refreshUnsubscribe();
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
