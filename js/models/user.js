'use strict';

import * as _ from 'underscore';
import constants from '../modules/constants';
import * as storage from '../modules/storage';

const storageCollectionName = 'user';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(data) {
  if (!_.isObject(data)) {
    return new Error(constants.REQUIRED('data'));
  }

  return await storage.set(storageCollectionName, data);
}

// ---------
// interface
// ---------

export {
  get,
  set
};
