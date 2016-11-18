'use strict';

const DEFAULT = {
  visible: false
};

export default function adsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'ADS_SHOW':
      return Object.assign({}, state, {
        visible: true
      });

    case 'ADS_HIDE':
      return Object.assign({}, state, {
        visible: false
      });

    default:
      return state;
  }
};
