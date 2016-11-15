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
      var token = await FCM.getFCMToken(),
        initialNotification = await FCM.getInitialNotification();

      console.log(token);

      // collapse_key: "com.upwatcher"
      // from: "538493948651"
      // google.message_id: "0:1479240421059848%562bde94562bde94"
      // google.sent_time: 1479240421033
      if (initialNotification && initialNotification.collapse_key && initialNotification['google.message_id']) {
        dispatch(feedsActions.refresh());
      }
      FCM.on('notification', function() {
        var appState = AppStore.getState();
        if (appState.state.id === 'inbox' && appState.tabs.activeTab === 'search') {
          dispatch(notificationsActions.show());
        } else {
          dispatch(notificationsActions.scheduleAShowing());
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
