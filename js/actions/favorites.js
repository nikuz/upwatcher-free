'use strict';

function defaultSet(data) {
  return {
    type: 'FAVORITES_DEFAULT_SET',
    data
  };
}

function add(item) {
  return {
    type: 'FAVORITES_ADD',
    item
  };
}

function remove(id) {
  return {
    type: 'FAVORITES_REMOVE',
    id
  };
}

export {
  defaultSet,
  add,
  remove
};
