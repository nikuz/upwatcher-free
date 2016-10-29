'use strict';

function open(props) {
  return {
    type: 'OVERLAY_OPEN',
    props
  };
}

function close() {
  return {
    type: 'OVERLAY_CLOSE'
  };
}

export {
  open,
  close
};
