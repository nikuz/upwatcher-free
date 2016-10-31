'use strict';

import * as storage from '../modules/storage';

const DEFAULT = {
  feeds: ''
};

var savedFeeds;

(async function() {
  savedFeeds = await storage.get('feeds');
})();

export default function searchReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'SEARCH_ADD_FEEDS':
      return Object.assign({}, state, {
        feeds: action.value,
      });
    default:
      if (savedFeeds) {
        DEFAULT.feeds = savedFeeds;
        savedFeeds = null;
      }
      return state;
  }
};
