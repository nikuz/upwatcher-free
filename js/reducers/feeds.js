'use strict';

import * as storage from '../modules/storage';

const DEFAULT = [];

var savedFeeds;

(async function() {
  savedFeeds = await storage.get('feeds');
})();

export default function feedsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'FEEDS_SORT':
      return state;
    default:
      if (savedFeeds) {
        let newState = savedFeeds;
        savedFeeds = null;
        return newState;
      }
      return state;
  }
};
