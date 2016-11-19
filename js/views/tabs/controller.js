'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as tabsActions from '../../actions/tabs';
import * as searchActions from '../../actions/search';
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
      if (tabId === 'search') {
        dispatch(searchActions.show());
      } else {
        dispatch(searchActions.hide());
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsListView);
