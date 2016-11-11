'use strict';

const DEFAULT = {
  visible: true,
  activeTab: 'search',
  items: [{
    id: 'search',
    name: 'Search',
    icon: 'search'
  }, {
    id: 'favorites',
    name: 'Favorites',
    icon: 'favorite'
  }]
};

export default function tabsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'TABS_CHANGE':
      return Object.assign({}, state, {
        activeTab: action.id
      });

    default:
      return state;
  }
};
