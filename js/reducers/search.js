'use strict';

const DEFAULT = {
  feeds: '',
  loading: false
};

export default function searchReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'SEARCH_DEFAULT_SET':
      return Object.assign({}, state, {
        feeds: action.value
      });
    case 'SEARCH_ADD_FEEDS':
      return Object.assign({}, state, {
        feeds: action.value,
        loading: true
      });
    case 'SEARCH_FEEDS_UPDATE_FINISHED':
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
};
