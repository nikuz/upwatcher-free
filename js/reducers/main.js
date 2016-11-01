'use strict';

import { combineReducers } from 'redux';
import appState from './state';
import settings from './settings';
import overlay from './overlay';
import search from './search';
import feeds from './feeds';

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay,
  search,
  feeds
});

export default todoApp;
