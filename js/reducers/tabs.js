'use strict';

import * as _ from 'underscore';
import {deepClone} from '../modules/object';

const DEFAULT = {
  visible: true,
  items: [{
    id: 'search',
    name: 'Search',
    icon: 'search',
    active: true
  }, {
    id: 'favorites',
    name: 'Favorites',
    icon: 'favorite'
  }]
};

export default function tabsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'TABS_CHANGE': {
      let newState = deepClone(state);
      _.each(newState.items, function(item) {
        item.active = item.id === action.id;
      });
      return newState;
    }
    default:
      return state;
  }
};
