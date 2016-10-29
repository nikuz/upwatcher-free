'use strict';

import { combineReducers } from 'redux';
import appState from './state';
import settings from './settings';
import overlay from './overlay';

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay
});

export default todoApp;
