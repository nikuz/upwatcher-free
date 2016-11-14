'use strict';

import * as _ from 'underscore';
import * as storage from '../modules/storage';
import * as config from '../config';

const storageCollectionName = 'favorites';

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(data) {
  return await storage.set(storageCollectionName, data);
}

async function add(item) {
  var favorites = await get() || [];
  favorites.unshift(item);
  if (favorites.length > config.FAVORITES_LIMIT) {
    favorites.length = config.FAVORITES_LIMIT;
  }
  await set(favorites);
}

async function remove(id) {
  var favorites = await get();
  favorites = _.filter(favorites, function(item) {
    return item.id !== id;
  });
  await set(favorites);
}

// (async function() {
//   await storage.remove(storageCollectionName);
// })();

// ---------
// interface
// ---------

export {
  get,
  set,
  add,
  remove
};
