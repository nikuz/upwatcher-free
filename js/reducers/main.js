'use strict';

import appStateReducer from './state';
import settingsReducers from './settings';

function appReducers(state = {}, action) {
  return {
    state: appStateReducer(state.state, action)
  }
}

export default appReducers;
