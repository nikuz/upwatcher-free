'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/search';
import * as feedsActions from '../../actions/feeds';
import * as searchModel from '../../models/search';
import * as feedsModel from '../../models/feeds';
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
        await searchModel.set(value);
        dispatch(searchActions.addFeeds(value));
        var response;
        try {
          response = await feedsModel.request(value);
        } catch (e) {
          console.log(e); // something wrong, need to handle
        }
        dispatch(searchActions.feedsUpdateFinished());
        if (response && response.jobs) {
          dispatch(feedsActions.update(response.jobs));
          feedsModel.set(response.jobs);
        } else {
          console.log(response); // something wrong, need to handle
        }
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
