'use strict';

import * as storage from '../modules/storage';

const storageCollectionName = 'feeds';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(data) {
  // TODO: add trimmer for each job fields
  return await storage.set(storageCollectionName, data);
}

// ---------
// interface
// ---------

export {
  get,
  set
}
