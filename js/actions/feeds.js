'use strict';

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

export {
  update,
  filter
};
