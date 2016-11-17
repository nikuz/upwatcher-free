'use strict';

import * as storage from '../modules/storage';

const storageCollectionName = 'await_verifier';

async function getVerifierWaiter() {
  return await storage.get(storageCollectionName);
}

async function setVerifierWaiter() {
  return await storage.set(storageCollectionName, true);
}

async function removeVerifierWaiter() {
  return await storage.remove(storageCollectionName);
}

// ---------
// interface
// ---------

export {
  getVerifierWaiter,
  setVerifierWaiter,
  removeVerifierWaiter
};
