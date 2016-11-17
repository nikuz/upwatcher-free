'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import AppStore from '../../store';
import FCM from 'react-native-fcm';
import * as notificationsActions from '../../actions/notifications';
import * as overlayActions from '../../actions/overlay';
import * as feedsActions from '../../actions/feeds';
import * as searchModel from '../../models/search';
import * as upworkModel from '../../models/upwork';
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
      if (token) {
        userController.registration(token); // registration on backend
      }

      let initialNotification = await FCM.getInitialNotification();
      if (initialNotification && initialNotification.fcm && initialNotification.fcm.action && await searchModel.get() && !(await upworkModel.getVerifierWaiter())) {
        dispatch(overlayActions.close());
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
