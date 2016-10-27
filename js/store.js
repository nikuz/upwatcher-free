'use strict';

import { createStore } from 'redux';
import reducers from './reducers/main';

const store = createStore(reducers);

store.subscribe(function() {
  if (process.env.NODE_ENV !== 'production') {
    console.log(store.getState());
  }
});

export default store;
