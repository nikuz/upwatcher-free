'use strict';

import * as storage from '../modules/storage';
import * as userController from '../controllers/user';

const storageCollectionName = 'feedsRequest';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(value) {
  userController.feedsSave(value); // save feeds value on backend
  return await storage.set(storageCollectionName, value);
}

// ---------
// interface
// ---------

export {
  get,
  set
};
