'use strict';

const DEFAULT = {
  visible: false,
  retryHandler: null
};

export default function errorReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'ERROR_SHOW':
      return Object.assign({}, state, {
        visible: true,
        retryHandler: action.handler
      });

    case 'ERROR_HIDE':
      if (state.visible === false) {
        return state;
      } else {
        return Object.assign({}, state, {
          visible: false,
          retryHandler: null
        });
      }

    default:
      return state;
  }
};
