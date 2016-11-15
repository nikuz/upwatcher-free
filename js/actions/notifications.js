'use strict';

function show() {
  return {
    type: 'NOTIFICATIONS_SHOW'
  };
}

function scheduleAShowing() {
  return {
    type: 'NOTIFICATIONS_SCHEDULE_A_SHOWING'
  };
}

function checkReceived() {
  return {
    type: 'NOTIFICATIONS_CHECK_RECEIVED'
  };
}

function hide() {
  return {
    type: 'NOTIFICATIONS_HIDE'
  };
}

export {
  show,
  scheduleAShowing,
  checkReceived,
  hide
};
