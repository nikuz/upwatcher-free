'use strict';

import * as storage from '../modules/storage';

const DEFAULT = {
  data: [],
  filter: null
};

var savedFeeds;

(async function() {
  savedFeeds = await storage.get('feeds');
})();

export default function feedsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'FEEDS_UPDATE':
      return Object.assign({}, state, {
        data: action.data
      });
    case 'FEEDS_FILTER':
      return Object.assign({}, state, {
        filter: action.value
      });
    default:
      if (savedFeeds) {
        DEFAULT.data = savedFeeds;
        savedFeeds = null;
      }
      return state;
  }
};
