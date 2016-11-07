'use strict';

function defaultSet(data) {
  return {
    type: 'SETTINGS_DEFAULT_SET',
    data
  };
}

function change(name, value) {
  return {
    type: 'SETTINGS_CHANGE',
    name,
    value
  };
}

export {
  defaultSet,
  change
};
