'use strict';

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
  addFeeds,
  feedsUpdateFinished
};
