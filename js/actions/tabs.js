'use strict';

function change(id) {
  return {
    type: 'TABS_CHANGE',
    id
  };
}

export {
  change
};
