'use strict';

export default function settingsReducers(state, action) {
  switch (action.type) {
    case 'OPEN':
      return Object.assign({}, state, {
        activeView: action.view,
        prevView: action.activeView
      });
    case 'CLOSE':
      return Object.assign({}, state, {
        activeView: state.prevView,
        prevView: action.view
      });
    default:
      return state;
  }
};
