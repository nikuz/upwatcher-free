'use strict';

function show(id) {
  return {
    type: 'NOTIFICATIONS_SHOW',
    id
  };
}

function hide() {
  return {
    type: 'NOTIFICATIONS_HIDE'
  };
}

export {
  show,
  hide
};
