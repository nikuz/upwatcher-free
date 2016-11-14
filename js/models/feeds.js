'use strict';

import * as _ from 'underscore';
import * as storage from '../modules/storage';

const storageCollectionName = 'feeds';

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(data) {
  var allowedFields = [
    'id',
    'cut_id',
    'category2',
    'budget',
    'date_created',
    'date',
    'duration',
    'job_type',
    'skills',
    'title',
    'url',
    'workload',
    'client'
  ];
  _.each(data, (item, key) => {
    data[key] = _.pick(item, allowedFields);
  });
  return await storage.set(storageCollectionName, data);
}

// ---------
// interface
// ---------

export {
  get,
  set
}
