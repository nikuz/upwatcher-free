'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as SearchActions from '../../actions/search';
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
        try {
          let response = await upworkController.getFeeds(value);
          console.log(response);
          dispatch(SearchActions.feedsUpdateFinished());
        } catch (e) {
          console.log(e);
        }
      }
      // var state = this.state,
      //   searchValue = this.trim(state.searchValue);
      //
      // if (searchValue !== '') {
      //   dismissKeyboard();
      //   await storage.set('search', searchValue);
      //   upworkController.getFeeds({
      //     q: searchValue,
      //     sort: 'create_time desc'
      //   }, function(err, response) {
      //     console.log(err);
      //     console.log(response);
      //   })
      // }
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
