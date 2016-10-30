'use strict';

import * as settingsModel from '../models/settings';
import {deepClone} from '../modules/object';

const DEFAULT = settingsModel.DEFAULT_DATA;
var savedSettings;

(async function() {
  savedSettings = await settingsModel.get();
})();

export default function settingsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'SETTINGS_CHANGE':
      let newState = deepClone(state);
      newState[action.name].value = action.value;
      return newState;
    default:
      if (savedSettings) {
        let newState = savedSettings;
        savedSettings = null;
        return newState;
      }
      return state;
  }
};
