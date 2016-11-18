'use strict';

import * as storage from '../modules/storage';

const storageCollectionName = 'adsViews';

async function get() {
  return await storage.get(storageCollectionName);
}

async function increment() {
  var curValue = await get();
  if (!curValue) {
    curValue = 0;
  }
  curValue++;
  return await storage.set(storageCollectionName, curValue);
}

async function refresh() {
  return await storage.set(storageCollectionName, 0);
}

// ---------
// interface
// ---------

export {
  get,
  increment,
  refresh
};
