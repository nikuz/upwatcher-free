'use strict';

function defaultSet(value) {
  return {
    type: 'SEARCH_DEFAULT_SET',
    value
  };
}

function addFeeds(value) {
  return {
    type: 'SEARCH_ADD_FEEDS',
    value
  };
}

function feedsUpdateFinished() {
  return {
    type: 'SEARCH_FEEDS_UPDATE_FINISHED'
  };
}

export {
  defaultSet,
  addFeeds,
  feedsUpdateFinished
};
