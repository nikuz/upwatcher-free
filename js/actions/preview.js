'use strict';

function update(data) {
  return {
    type: 'PREVIEW_UPDATE',
    data
  };
}

export {
  update
};
