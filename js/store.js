'use strict';

import { createStore } from 'redux';
import reducers from './reducers/main'

const store = createStore(reducers);

store.subscribe(function() {
  console.log(store.getState());
});

export default store;
