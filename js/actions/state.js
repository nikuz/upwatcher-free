'use strict';

function push(state) {
  return {
    type: 'APP_STATE_PUSH',
    state
  };
}

function pop(state) {
  return {
    type: 'APP_STATE_POP',
    state
  };
}

export {
  push,
  pop
};
