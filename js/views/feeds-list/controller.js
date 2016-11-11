'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as AppStateActions from '../../actions/state';
import * as feedsActions from '../../actions/feeds';
import * as feedsModel from '../../models/feeds';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import * as errorActions from '../../actions/error';
import * as upworkController from '../../controllers/upwork';
import * as logsController from '../../controllers/logs';
import FeedsListView from './view';

const mapStateToProps = function(state) {
  return {
    feeds: state.feeds,
    favorites: state.favorites
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    refresh: async function() {
      dispatch(feedsActions.refreshStart());
      var response;
      try {
        response = await upworkController.getFeeds();
      } catch (err) {
        dispatch(errorActions.show(this.refresh));
        logsController.captureError(err);
      }
      dispatch(feedsActions.refreshStop());
      if (response && response.jobs) {
        dispatch(feedsActions.update(response.jobs));
        feedsModel.set(response.jobs);
      } else {
        dispatch(errorActions.show(this.refresh));
        logsController.captureMessage('Feeds list `refresh` empty response');
      }
    },
    loadMoreJobs: async function(page) {
      dispatch(feedsActions.loadMoreJobsStart());
      var response;
      try {
        response = await upworkController.getFeeds(null, page);
      } catch (err) {
        dispatch(errorActions.show(this.loadMoreJobs));
        logsController.captureError(err);
      }
      dispatch(feedsActions.loadMoreJobsStop());
      if (response && response.jobs) {
        dispatch(feedsActions.addMore(response.jobs));
      } else {
        dispatch(errorActions.show(this.loadMoreJobs));
        logsController.captureMessage('Feeds list `loadMoreJobs` empty response');
      }
    },
    addToFavorites: function(item) {
      dispatch(favoritesActions.add(item));
      favoritesModel.add(item);
    },
    removeFromFavorites: function(id) {
      dispatch(favoritesActions.remove(id));
      favoritesModel.remove(id);
    },
    pushState: function(id, data) {
      dispatch(AppStateActions.push({
        id,
        name: id,
        data
      }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsListView);
