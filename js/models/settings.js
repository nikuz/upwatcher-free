'use strict';

import * as _ from 'underscore';
import constants from '../modules/constants';
import * as storage from '../modules/storage';
import {deepClone} from '../modules/object';

const settingsName = 'settings';

const DEFAULT = {
  category2: {
    values: [],
    value: 'All',
    search: true
  },
  budgetFrom: {
    value: 0,
    search: true
  },
  budgetTo: {
    value: 1000000,
    search: true // it is mean, that change this field will refresh search results
  },
  notifyInterval: {
    values: [
      {5: '5 minutes'},
      {10: '10 minutes'},
      {20: '20 minutes'},
      {30: '30 minutes'},
      {60: '1 hour'},
      {180: '3 hours'}
    ],
    value: 5
  },
  notifyAllow: {
    value: true
  },
  dndFrom: {
    value: '00:00'
  },
  dndTo: {
    value: '06:00'
  },
  duration: {
    values: [
      {'All': 'All'},
      {'Week': 'Week'},
      {'Month': 'Month'},
      {'Quarter': 'Quarter'},
      {'Semester': 'Semester'},
      {'Ongoing': 'Ongoing'}
    ],
    value: 'All',
    search: true
  },
  jobType: {
    values: [
      {'All': 'All'},
      {'Hourly': 'Hourly'},
      {'Fixed': 'Fixed'}
    ],
    value: 'All',
    search: true
  },
  workload: {
    values: [
      {'All': 'All'},
      {'As needed': 'As needed'},
      {'Part time': 'Part time'},
      {'Full time': 'Full time'}
    ],
    value: 'All',
    search: true
  },
  useProxy: {
    value: false
  }
};

(async function() {
  var settingsData = await storage.get(settingsName);
  if (settingsData && !_.isEqual(_.keys(settingsData), _.keys(DEFAULT))) {
    storage.remove(settingsName);
  }
})();

// ----------------
// public methods
// ----------------

async function get(field) {
  field = _.isString(field) ? field : null;
  var settings = await storage.get(settingsName);
  console.log(settings);
  if (!settings) {
    settings = deepClone(DEFAULT);
  }
  if (field) {
    settings = settings[field];
  }
  return settings;
}

async function set(field, data) {
  data = _.isObject(data) ? data : (_.isObject(field) ? field : null);
  field = _.isString(field) ? field : null;
  if (!data) {
    return new Error(constants.REQUIRED('data'));
  }
  if (field) {
    let settings = await get();
    _.each(settings, function(item, key) {
      if (key === field) {
        settings[key] = data;
      }
    });
    return await storage.set(settingsName, settings);
  } else {
    return await storage.set(settingsName, data);
  }
}

// ---------
// interface
// ---------

export {
  DEFAULT as DEFAULT_DATA,
  get,
  set
};
