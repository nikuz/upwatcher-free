'use strict';

function show() {
  return {
    type: 'ADS_SHOW'
  };
}

function hide() {
  return {
    type: 'ADS_HIDE'
  };
}

export {
  show,
  hide
};
