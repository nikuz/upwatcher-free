'use strict';

const DEFAULT = {
  status: 'close'
};

export default function overlayReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'OVERLAY_OPEN':
      let newState = Object.assign({}, state, action.props);
      newState.status = 'open';
      return newState;

    case 'OVERLAY_CLOSE':
      return {
        status: 'close'
      };

    default:
      return state;
  }
};
