'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/search';
import * as feedsActions from '../../actions/feeds';
import * as searchModel from '../../models/search';
import * as feedsModel from '../../models/feeds';
import * as upworkModel from '../../models/upwork';
import * as errorActions from '../../actions/error';
import * as upworkController from '../../controllers/upwork';
import * as logsController from '../../controllers/logs';
import SearchView from './view';

const mapStateToProps = function(state) {
  return {
    search: state.search
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    addFeedsRequest: async function(value) {
      let curFeedsValue = await searchModel.get();
      if (!value && !curFeedsValue) {
        return;
      }

      let isVerifierWaiterActive = await upworkModel.getVerifierWaiter();
      // for initial search, when user will get an upwork token
      // search request should be repeated
      if (!isVerifierWaiterActive && value) {
        await searchModel.set(value);
      }
      if (!value) {
        value = curFeedsValue;
      }
      dispatch(searchActions.addFeeds(value));

      let response,
        responseErr,
        networkError;

      try {
        response = await upworkController.getFeeds(value);
      } catch (err) {
        if (err === 'network') {
          networkError = err;
        } else {
          responseErr = err;
        }
      }

      dispatch(searchActions.feedsUpdateFinished());

      if (response === null) {
        return; // when user doesn't have an upwork token and upwork website was opened, controller will return null
      } else if (response && response.jobs) {
        dispatch(errorActions.hide());
        feedsModel.set(response.jobs);
        if (response.jobs.length) {
          dispatch(feedsActions.update(response.jobs));
        } else {
          dispatch(feedsActions.markAsEmpty());
        }
      } else {
        if (responseErr) {
          dispatch(errorActions.show(this.addFeedsRequest.bind(this, value)));
          logsController.captureError(responseErr);
        } else if (networkError) {
          dispatch(errorActions.showNetwork());
        } else {
          logsController.captureMessage('Search controller `addFeedsRequest` empty response');
        }
      }
    },
    checkPreviousRequest: async function() {
      return await upworkModel.getVerifierWaiter();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
