'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as storage from '../../modules/storage';
import * as FeedsActions from '../../actions/feeds';
import FeedsListView from './view';

const mapStateToProps = function(state) {
  return {
    feeds: state.feeds
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getStoredFeeds: async function() {
      return await storage.get('feeds');
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsListView);
