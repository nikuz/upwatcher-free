'use strict';

import { combineReducers } from 'redux';
import appState from './state';
import settings from './settings';
import overlay from './overlay';
import search from './search';

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay,
  search
});

export default todoApp;
