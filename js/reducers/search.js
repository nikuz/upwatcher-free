'use strict';

const DEFAULT = {
  visible: true,
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

    case 'SEARCH_SHOW':
      return Object.assign({}, state, {
        visible: true
      });

    case 'SEARCH_HIDE':
      return Object.assign({}, state, {
        visible: false
      });

    default:
      return state;
  }
};
