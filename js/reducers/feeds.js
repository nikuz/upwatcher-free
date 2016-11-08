'use strict';

import * as _ from 'underscore';
import {deepClone} from '../modules/object';

const DEFAULT = {
  data: [],
  filter: null,
  refreshing: false,
  loading_more: false
};

export default function feedsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'FEEDS_DEFAULT_SET':
      return Object.assign({}, state, {
        data: action.data
      });
    case 'FEEDS_UPDATE':
      return Object.assign({}, state, {
        data: action.data
      });
    case 'FEEDS_ADD_MORE':
      return Object.assign({}, state, {
        data: state.data.concat(action.data)
      });
    case 'FEEDS_FILTER':
      return Object.assign({}, state, {
        filter: action.value
      });
    case 'FEEDS_ADD_TO_FAVORITES': {
      let newState = deepClone(state);
      _.each(newState.data, function(item) {
        if (item.id === action.id) {
          item.favorite = true;
        }
      });
      return newState;
    }
    case 'FEEDS_REMOVE_FROM_FAVORITES': {
      let newState = deepClone(state);
      _.each(newState.data, function(item) {
        if (item.id === action.id) {
          item.favorite = false;
        }
      });
      return newState;
    }
    case 'FEEDS_REFRESH_START':
      return Object.assign({}, state, {
        refreshing: true
      });
    case 'FEEDS_REFRESH_STOP':
      return Object.assign({}, state, {
        refreshing: false
      });
    case 'FEEDS_LOAD_MORE_JOBS_START':
      return Object.assign({}, state, {
        loading_more: true
      });
    case 'FEEDS_LOAD_MORE_JOBS_STOP':
      return Object.assign({}, state, {
        loading_more: false
      });
    default:
      return state;
  }
};
