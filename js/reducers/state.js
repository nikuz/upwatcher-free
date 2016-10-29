'use strict';

const DEFAULT_STATE = {
  name: 'inbox',
  type: null
};

export default function appStateReducers(state, action) {
  switch (action.type) {
    case 'APP_STATE_PUSH':
      return Object.assign({}, state, {
        name: action.state,
        type: 'push'
      });
    case 'APP_STATE_POP':
      return Object.assign({}, state, {
        name: action.state,
        type: 'pop'
      });
    default:
      return DEFAULT_STATE;
  }
};
