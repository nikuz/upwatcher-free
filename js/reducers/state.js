'use strict';

const DEFAULT_STATE = {
  name: 'inbox'
};

export default function appState(state, action) {
  switch (action.type) {
    case 'APP_STATE_CHANGE':
      return Object.assign({}, state, {
        name: action.state
      });
    default:
      return DEFAULT_STATE;
  }
};
