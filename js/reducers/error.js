'use strict';

const DEFAULT = {
  visible: false,
  type: null,
  retryHandler: null
};

export default function errorReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'ERROR_SHOW':
      return Object.assign({}, state, {
        visible: true,
        type: null,
        retryHandler: action.handler
      });

    case 'ERROR_SHOW_NETWORK':
      return Object.assign({}, state, {
        visible: true,
        type: 'network'
      });

    case 'ERROR_HIDE':
      if (state.visible === false) {
        return state;
      } else {
        return Object.assign({}, state, {
          visible: false,
          type: null,
          retryHandler: null
        });
      }

    default:
      return state;
  }
};
