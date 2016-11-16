'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/search';
import * as feedsActions from '../../actions/feeds';
import * as searchModel from '../../models/search';
import * as feedsModel from '../../models/feeds';
import * as errorActions from '../../actions/error';
import * as upworkController from '../../controllers/upwork';
import * as logsController from '../../controllers/logs';
import * as userController from '../../controllers/user';
import SearchView from './view';

const mapStateToProps = function(state) {
  return {
    search: state.search
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    addFeedsRequest: async function(value) {
      var curFeedsValue = await searchModel.get();

      if (curFeedsValue !== value) {
        userController.feedsSave(value); // save feeds value on backend

        await searchModel.set(value);
        dispatch(searchActions.addFeeds(value));

        let response,
          responseErr;

        try {
          response = await upworkController.getFeeds(value);
        } catch (err) {
          responseErr = err;
        }

        dispatch(searchActions.feedsUpdateFinished());

        if (response && response.jobs) {
          dispatch(feedsActions.update(response.jobs));
          feedsModel.set(response.jobs);
          if (response.jobs.length) {
            userController.lastJobDateSave(response.jobs[0].date_created)
          }
        } else {
          dispatch(errorActions.show(this.addFeedsRequest.bind(this)));
          if (responseErr) {
            logsController.captureError(responseErr);
          } else {
            logsController.captureMessage('Search controller `addFeedsRequest` empty response');
          }
        }
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
