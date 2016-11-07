'use strict';

import * as storage from '../modules/storage';

const DEFAULT = {
  feeds: '',
  loading: false
};

var savedFeedsRequest;

(async function() {
  savedFeedsRequest = await storage.get('feedsRequest');
})();

export default function searchReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'SEARCH_ADD_FEEDS':
      return Object.assign({}, state, {
        feeds: action.value,
        loading: true
      });
    case 'SEARCH_FEEDS_UPDATE_FINISHED':
      return Object.assign({}, state, {
        loading: false
      });
    default:
      if (savedFeedsRequest) {
        DEFAULT.feeds = savedFeedsRequest;
        savedFeedsRequest = null;
      }
      return state;
  }
};
