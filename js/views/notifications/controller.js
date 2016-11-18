'use strict';

import * as React from 'react';
import {
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import * as config from '../../config';
import * as notificationsActions from '../../actions/notifications';
import * as overlayActions from '../../actions/overlay';
import * as errorActions from '../../actions/error';
import * as logsController from '../../controllers/logs';
import NotificationsView from './view';

const mapStateToProps = function(state) {
  return {
    notifications: state.notifications
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    show: function(cont) {
      dispatch(overlayActions.open({
        navigator: false,
        transparent: true,
        animationType: 'fade',
        component: cont
      }));
    },
    hide: function() {
      dispatch(overlayActions.close());
    },
    onPress: function() {
      Linking.openURL(`market://details?id=${config.PAID_APP_ID}`).catch((err) => {
        dispatch(errorActions.show(this.onPress.bind(this)));
        logsController.captureError(err);
      });
      dispatch(notificationsActions.hide());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsView);
