'use strict';

import * as _ from 'underscore';
import * as settingsModel from '../models/settings';
import {deepClone} from '../modules/object';

const DEFAULT = settingsModel.DEFAULT_DATA;

export default function settingsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'SETTINGS_DEFAULT_SET':
      return action.data;

    case 'SETTINGS_CHANGE': {
      let newState = deepClone(state);
      newState[action.name].value = action.value;
      return newState;
    }

    case 'SETTINGS_UPDATE_CATEGORIES': {
      let newState = deepClone(state);
      _.each(action.data, function(item) {
        newState.category2.values[item] = item;
      });
      return newState;
    }

    default:
      return state;
  }
};
