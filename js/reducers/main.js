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

const todoApp = combineReducers({
  state: appState,
  settings,
  overlay,
  search,
  feeds,
  favorites,
  tabs,
  preview
});

export default todoApp;
