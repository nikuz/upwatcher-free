'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
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
    refresh: async function() {
      dispatch(feedsActions.refreshStart());
      var response;
      try {
        response = await feedsModel.request();
      } catch (e) {
        console.log(e); // something wrong, need to handle
      }
      dispatch(feedsActions.refreshStop());
      if (response && response.jobs) {
        dispatch(feedsActions.update(response.jobs));
        feedsModel.set(response.jobs);
      } else {
        console.log(response); // something wrong, need to handle
      }
    },
    loadMoreJobs: async function(page) {
      dispatch(feedsActions.loadMoreJobsStart());
      var response;
      try {
        response = await feedsModel.request(null, page);
      } catch (e) {
        console.log(e); // something wrong, need to handle
      }
      dispatch(feedsActions.loadMoreJobsStop());
      if (response && response.jobs) {
        dispatch(feedsActions.addMore(response.jobs));
      } else {
        console.log(response); // something wrong, need to handle
      }
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
