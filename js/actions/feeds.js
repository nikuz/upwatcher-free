'use strict';

function defaultSet(data) {
  return {
    type: 'FEEDS_DEFAULT_SET',
    data
  };
}

function update(data) {
  return {
    type: 'FEEDS_UPDATE',
    data
  };
}

function addMore(data) {
  return {
    type: 'FEEDS_ADD_MORE',
    data
  };
}

function filter(value) {
  return {
    type: 'FEEDS_FILTER',
    value
  };
}

function addToFavorites(id) {
  return {
    type: 'FEEDS_ADD_TO_FAVORITES',
    id
  };
}

function removeFromFavorites(id) {
  return {
    type: 'FEEDS_REMOVE_FROM_FAVORITES',
    id
  };
}

function refreshStart() {
  return {
    type: 'FEEDS_REFRESH_START'
  };
}

function refreshStop() {
  return {
    type: 'FEEDS_REFRESH_STOP'
  };
}

function loadMoreJobsStart() {
  return {
    type: 'FEEDS_LOAD_MORE_JOBS_START'
  };
}

function loadMoreJobsStop() {
  return {
    type: 'FEEDS_LOAD_MORE_JOBS_STOP'
  };
}

export {
  defaultSet,
  update,
  addMore,
  filter,
  addToFavorites,
  removeFromFavorites,
  refreshStart,
  refreshStop,
  loadMoreJobsStart,
  loadMoreJobsStop
};
