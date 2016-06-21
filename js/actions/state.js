'use strict';

function change(state) {
  return {
    type: 'APP_STATE_CHANGE',
    state
  };
}

export {
  change
};
