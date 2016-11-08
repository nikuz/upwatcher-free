'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as feedsActions from '../../actions/feeds';
import * as tabsActions from '../../actions/tabs';
import TabsListView from './view';

const mapStateToProps = function(state) {
  return {
    favorites: state.favorites,
    tabs: state.tabs
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    change: function(tabId) {
      dispatch(tabsActions.change(tabId));
      // dispatch(feedsActions.filter(tabId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsListView);
