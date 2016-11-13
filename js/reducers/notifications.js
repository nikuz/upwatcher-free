'use strict';

const DEFAULT = {
  visible: false
};

export default function notificationsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_SHOW':
      return Object.assign({}, state, {
        visible: true
      });

    case 'NOTIFICATIONS_HIDE':
      if (state.visible === false) {
        return state;
      } else {
        return Object.assign({}, state, {
          visible: false
        });
      }

    default:
      return state;
  }
};
