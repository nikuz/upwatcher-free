'use strict';

// ----------------
// public methods
// ----------------

function parseBigNumber(value){
  if (!value) {
    return;
  }
  return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u2009');
}

// ---------
// interface
// ---------

export {
  parseBigNumber
};
