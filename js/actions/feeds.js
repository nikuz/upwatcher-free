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

export {
  defaultSet,
  update,
  filter,
  addToFavorites,
  removeFromFavorites
};
