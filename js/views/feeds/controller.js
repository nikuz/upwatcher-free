'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as tabsActions from '../../actions/tabs';
import * as notificationsActions from '../../actions/notifications';
import FeedsView from './view';

const mapStateToProps = function(state) {
  return {
    tabs: state.tabs
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    changeTab: function(tabId) {
      dispatch(tabsActions.change(tabId));
      if (tabId === 'favorites') {
        dispatch(notificationsActions.hide());
      } else {
        dispatch(notificationsActions.checkReceived());
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsView);
