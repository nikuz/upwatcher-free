'use strict';

function addFeeds(value) {
  return {
    type: 'SEARCH_ADD_FEEDS',
    value
  };
}

export {
  addFeeds
};
