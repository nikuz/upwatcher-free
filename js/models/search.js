'use strict';

import * as storage from '../modules/storage';

const name = 'feedsRequest';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(name);
}

async function set(value) {
  return await storage.set(name, value);
}

// ---------
// interface
// ---------

export {
  get,
  set
}
