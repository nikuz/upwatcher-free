'use strict';

function show(handler) {
  return {
    type: 'ERROR_SHOW',
    handler
  };
}

function hide() {
  return {
    type: 'ERROR_HIDE'
  };
}

export {
  show,
  hide
};
