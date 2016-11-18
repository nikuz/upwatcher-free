'use strict';

function show() {
  return {
    type: 'NOTIFICATIONS_SHOW'
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
