'use strict';

import * as config from '../config';
import * as _ from 'underscore';
import {deepClone} from '../modules/object';

const DEFAULT = [];

export default function favoritesReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'FAVORITES_DEFAULT_SET':
      return action.data || [];
    case 'FAVORITES_ADD': {
      let newState = deepClone(state);
      newState.unshift(action.item);
      if (newState.length > config.FAVORITES_LIMIT) {
        newState.length = config.FAVORITES_LIMIT;
      }
      return newState;
    }
    case 'FAVORITES_REMOVE': {
      let newState = deepClone(state);
      newState = _.filter(newState, function(item) {
        return item.id !== action.id;
      });
      return newState;
    }
    default:
      return state;
  }
};
