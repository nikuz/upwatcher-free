'use strict';

function sort(sortType) {
  return {
    type: 'FEEDS_SORT',
    sortType
  };
}

export {
  sort
};
