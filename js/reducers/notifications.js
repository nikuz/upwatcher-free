'use strict';

const DEFAULT = {
  visible: false,
  should_be_shown: false
};

export default function notificationsReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'NOTIFICATIONS_SHOW':
      return Object.assign({}, state, {
        visible: true
      });

    case 'NOTIFICATIONS_SCHEDULE_A_SHOWING':
      return Object.assign({}, state, {
        should_be_shown: true
      });

    case 'NOTIFICATIONS_CHECK_RECEIVED':
      if (state.should_be_shown) {
        return Object.assign({}, state, {
          visible: true,
          should_be_shown: false
        });
      } else {
        return state;
      }

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
