'use strict';

import * as storage from '../modules/storage';

const storageCollectionName = 'feedsRequest';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(value) {
  return await storage.set(storageCollectionName, value);
}

// ---------
// interface
// ---------

export {
  get,
  set
}
