'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as SearchActions from '../../actions/search';
import * as storage from '../../modules/storage';
// import * as upworkController from '../../controllers/upwork';
import SearchView from './view';

const mapStateToProps = function(state) {
  return {
    search: state.search
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    addFeeds: function(value) {
      storage.set('feeds', value);
      dispatch(SearchActions.addFeeds(value));

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
    getStoredFeeds: async function() {
      return await storage.get('feeds');
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);
