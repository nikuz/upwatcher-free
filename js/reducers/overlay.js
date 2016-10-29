'use strict';

export default function overlayReducers(state, action) {
  switch (action.type) {
    case 'OVERLAY_OPEN':
      action.props.status = 'open';
      return Object.assign({}, state, action.props);
    case 'OVERLAY_CLOSE':
      return {
        status: 'close'
      };
    default:
      return {
        status: 'close'
      };
  }
};
