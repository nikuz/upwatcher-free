'use strict';

import * as _ from 'underscore';
import * as storage from '../modules/storage';
import * as config from '../config';
import * as settingsModel from './settings';
import * as searchModel from './search';
import * as upworkController from '../controllers/upwork';

const storageCollectionName = 'feeds';

function settingsFieldPrepare(field) {
  field = field.toLowerCase();
  return field === 'all' ? '' : field.replace(/\s+/g, '_');
}

// ----------------
// public methods
// ----------------

async function get() {
  return await storage.get(storageCollectionName);
}

async function set(data) {
  return await storage.set(storageCollectionName, data);
}

async function request(value, page) {
  if (!value) {
    value = await searchModel.get();
  }

  var sData = await settingsModel.get(),
    requestData = {
      q: value,
      budget: `[${sData.budgetFrom.value} TO ${sData.budgetTo.value}]`,
      days_posted: config.UPWORK_JOBS_DAYS_POSTED,
      duration: settingsFieldPrepare(sData.duration.value),
      job_type: settingsFieldPrepare(sData.jobType.value),
      workload: settingsFieldPrepare(sData.workload.value),
      sort: 'create_time desc'
    },
    pagerStart = 0,
    response;

  if (page) {
    pagerStart = page * config.CACHE_PER_REQUEST;
  }
  requestData.paging = `${pagerStart};${config.CACHE_PER_REQUEST}`; // API pager format is `$offset;$count`

  if (sData.category2.value !== 'All') {
    requestData.category2 = sData.category2.value;
  }

  try {
    response = await upworkController.getFeeds(requestData);
  } catch (e) {
    console.log(e);
  }
  return response;
}

// ---------
// interface
// ---------

export {
  get,
  set,
  request
}
