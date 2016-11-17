'use strict';

function push(options = {}) {
  return {
    type: 'APP_STATE_PUSH',
    id: options.id,
    name: options.name,
    data: options.data,
    rightButton: options.rightButton,
    onFavoriteHandler: options.onFavoriteHandler
  };
}

function pop(id) {
  return {
    type: 'APP_STATE_POP',
    id
  };
}

export {
  push,
  pop
};
