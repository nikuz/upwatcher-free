'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as SearchActions from '../../actions/search';
import * as FeedsActions from '../../actions/feeds';
import * as storage from '../../modules/storage';
import * as upworkController from '../../controllers/upwork';
import SearchView from './view';

const mapStateToProps = function(state) {
  return {
    search: state.search
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    addFeedsRequest: async function(value) {
      var feedsName = 'feedsRequest',
        curFeedsValue = await storage.get(feedsName);

      if (curFeedsValue !== value) {
        await storage.set(feedsName, value);
        dispatch(SearchActions.addFeeds(value));
        var response;
        try {
          response = await upworkController.getFeeds(value);
        } catch (e) {
          console.log(e); // something wrong, need to handle
        }
        dispatch(SearchActions.feedsUpdateFinished());
        if (response && response.jobs) {
          await storage.set('feeds', response.jobs);
          dispatch(FeedsActions.update(response.jobs));
        } else {
          console.log(response); // something wrong, need to handle
        }
      }
    },
    getStoredFeedsRequest: async function() {
      return await storage.get('feedsRequest');
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
