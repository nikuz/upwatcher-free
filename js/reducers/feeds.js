'use strict';

const DEFAULT = {
  data: [],
  filter: null,
  refreshing: false,
  loading_more: false,
  shouldBeRefresh: false,
  full: false,
  empty: false
};

export default function feedsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'FEEDS_DEFAULT_SET':
      return Object.assign({}, state, {
        data: action.data || []
      });

    case 'FEEDS_UPDATE':
      return Object.assign({}, state, {
        data: action.data,
        full: false,
        empty: false
      });

    case 'FEEDS_ADD_MORE':
      return Object.assign({}, state, {
        data: state.data.concat(action.data)
      });

    case 'FEEDS_FILTER':
      return Object.assign({}, state, {
        filter: action.value
      });

    case 'FEEDS_REFRESH_START':
      return Object.assign({}, state, {
        refreshing: true,
        shouldBeRefresh: false,
        full: false
      });

    case 'FEEDS_REFRESH_STOP':
      return Object.assign({}, state, {
        refreshing: false
      });

    case 'FEEDS_REFRESH':
      return Object.assign({}, state, {
        shouldBeRefresh: true
      });

    case 'FEEDS_LOAD_MORE_JOBS_START':
      return Object.assign({}, state, {
        loading_more: true
      });

    case 'FEEDS_LOAD_MORE_JOBS_STOP':
      return Object.assign({}, state, {
        loading_more: false
      });

    case 'FEEDS_MARK_AS_FULL':
      return Object.assign({}, state, {
        full: true
      });

    case 'FEEDS_MARK_AS_EMPTY':
      return Object.assign({}, state, {
        data: [],
        empty: true
      });

    default:
      return state;
  }
};
