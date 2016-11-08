'use strict';

import { combineReducers } from 'redux';
import appState from './state';
import settings from './settings';
import overlay from './overlay';
import search from './search';
import feeds from './feeds';
import favorites from './favorites';

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay,
  search,
  feeds,
  favorites
});

export default todoApp;
