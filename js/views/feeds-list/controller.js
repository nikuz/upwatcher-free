'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as storage from '../../modules/storage';
import * as feedsActions from '../../actions/feeds';
import * as feedsModel from '../../models/feeds';
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
    },
    addToFavorites: function(id) {
      dispatch(feedsActions.addToFavorites(id));
      feedsModel.addToFavorites(id);
    },
    removeFromFavorites: function(id) {
      dispatch(feedsActions.removeFromFavorites(id));
      feedsModel.removeFromFavorites(id);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsListView);
