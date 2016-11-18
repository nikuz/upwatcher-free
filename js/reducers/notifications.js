'use strict';

const DEFAULT = {
  visible: false,
  id: null
};

export default function notificationsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_SHOW':
      return Object.assign({}, state, {
        visible: true,
        id: action.id
      });

    case 'NOTIFICATIONS_HIDE':
      return Object.assign({}, state, {
        visible: false
      });

    default:
      return state;
  }
};
