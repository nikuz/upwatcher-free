'use strict';

// ----------------
// public methods
// ----------------

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getValueByPath(obj, path) {
  if (!obj) {
    return obj;
  }
  path = path.split('.');
  if (path.length > 1) {
    return getValueByPath(obj[path.shift()], path.join('.'));
  } else {
    return obj[path.shift()];
  }
}

// ---------
// interface
// ---------

export {
  deepClone,
  getValueByPath
};
