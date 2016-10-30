'use strict';

function change(name, value) {
  return {
    type: 'SETTINGS_CHANGE',
    name,
    value
  };
}

export {
  change
};
