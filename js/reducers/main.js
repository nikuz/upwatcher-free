'use strict';

import { combineReducers } from 'redux';
import appState from './state';
import settings from './settings';
import overlay from './overlay';
import search from './search';
import feeds from './feeds';
import favorites from './favorites';
import tabs from './tabs';
import preview from './preview';
import error from './error';
import notifications from './notifications';

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay,
  search,
  feeds,
  favorites,
  tabs,
  preview,
  error,
  notifications
});

export default todoApp;
