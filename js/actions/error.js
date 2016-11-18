'use strict';

function show(handler) {
  return {
    type: 'ERROR_SHOW',
    handler
  };
}

function showNetwork() {
  return {
    type: 'ERROR_SHOW_NETWORK'
  };
}

function hide() {
  return {
    type: 'ERROR_HIDE'
  };
}

export {
  show,
  showNetwork,
  hide
};
