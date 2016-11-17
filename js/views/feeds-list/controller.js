'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as AppStateActions from '../../actions/state';
import * as feedsActions from '../../actions/feeds';
import * as feedsModel from '../../models/feeds';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import * as errorActions from '../../actions/error';
import * as notificationsActions from '../../actions/notifications';
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
      var response,
        responseErr;

      try {
        response = await upworkController.getFeeds();
      } catch (err) {
        responseErr = err;
      }

      dispatch(feedsActions.refreshStop());

      if (response && response.jobs) {
        feedsModel.set(response.jobs);
        if (response.jobs.length) {
          dispatch(feedsActions.update(response.jobs));
        } else {
          dispatch(feedsActions.markAsEmpty());
        }
      } else {
        dispatch(errorActions.show(this.refresh.bind(this)));
        if (responseErr) {
          logsController.captureError(responseErr);
        } else {
          logsController.captureMessage('Feeds list `refresh` empty response');
        }
      }
    },
    loadMoreJobs: async function(page) {
      dispatch(feedsActions.loadMoreJobsStart());
      var response,
        responseErr;

      try {
        response = await upworkController.getFeeds(null, page);
      } catch (err) {
        responseErr = err;
      }

      dispatch(feedsActions.loadMoreJobsStop());

      if (response && response.jobs) {
        if (response.jobs.length) {
          dispatch(feedsActions.addMore(response.jobs));
        } else {
          dispatch(feedsActions.markAsFull());
        }
      } else {
        dispatch(errorActions.show(this.loadMoreJobs.bind(this)));
        if (responseErr) {
          logsController.captureError(responseErr);
        } else {
          logsController.captureMessage('Feeds list `loadMoreJobs` empty response');
        }
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
      dispatch(notificationsActions.hide());
      dispatch(errorActions.hide());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsListView);
