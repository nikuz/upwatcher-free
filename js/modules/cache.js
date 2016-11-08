'use strict';

import * as _ from 'underscore';
import * as config from '../config';
import * as storage from './storage';
import * as settings from '../models/settings';
import * as upworkController from '../controllers/upwork';
import * as EventManager from './events';

function pick(jobs) {
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
    'is_new',
    'watched',
    'feed_id'
  ];
  _.each(jobs, (item, key) => {
    jobs[key] = _.pick(item, allowedFields);
  });
  return jobs;
}

async function getCache(id, callback = _.noop) {
  var curCache = await storage.get('cache') || [];
  if (id) {
    curCache.every(item => {
      if (item.id === id) {
        curCache = item;
        return false;
      } else {
        return true;
      }
    });
  }
  callback(null, curCache);
}

async function filter(jobs, searchValue) {
  asyncParallel([
    function(internalCallback) { // 0
      storage.get(['last_job_date', 'trash_extra'], internalCallback);
    },
    function(internalCallback) { // 1
      generateFeedSum(internalCallback);
    },
    function(internalCallback) { // 2
      getCashedJobs(internalCallback);
    }
  ], function(err, results) {
    if (err) {
      return cb(err);
    }
    var result = [],
      cacheTime = results[0].last_job_date,
      trashExtra = results[0].trash_extra || [],
      newFeedsSum = results[1],
      localJobs = results[2],
      localJobsIds = _.map(localJobs, item => item.id),
      trashExtraIds = _.map(trashExtra, item => item.id);

    if (cacheTime) {
      cacheTime = new Date(cacheTime);
    }
    // fast double response (less than 3 second between responses)
    // or background response may be delayed
    if ((cacheTime && Date.now() - cacheTime.getTime() < 3000) || newFeedsSum !== feedsSum) {
      return cb(null, result);
    }

    _.each(jobs, downloaded => {
      var jobDate = new Date(downloaded.date_created);
      // new job isn't contains in local jobs
      // and if it's update operation, date created of new job is higher than last_job_date
      // or if it's not the update operation
      if (!_.contains(localJobsIds, downloaded.id) && !_.contains(trashExtraIds, downloaded.id) && (!update || !cacheTime || jobDate > cacheTime)) {
        downloaded.cut_id = downloaded.id.replace(/^~+/, '_');
        downloaded.feeds = feedsSum;
        if (update && cacheTime) {
          downloaded.is_new = true;
        }
        result.push(downloaded);
      }
    });
    cb(null, result);
  });
}

function reqFieldPrepare(field) {
  field = field.toLowerCase();
  return field === 'all' ? '' : field.replace(/\s+/g, '_');
}

async function populate(options = {}, callback = _.noop) {
  var curSettings = await settings.get(),
    searchValue = await storage.get('search'),
    start = options.page ? options.page * config.JOBS_PER_PAGE : 0,
    curCache = await getCache();

  var requestData = {
    q: searchValue,
    budget: `[${curSettings.budgetFrom.value} TO ${curSettings.budgetTo.value}]`,
    days_posted: config.UPWORK_JOBS_DAYS_POSTED,
    duration: reqFieldPrepare(curSettings.duration.value),
    job_type: reqFieldPrepare(curSettings.jobType.value),
    workload: reqFieldPrepare(curSettings.workload.value),
    paging: `${start};${config.CACHE_PER_REQUEST}`, // API pager format is `$offset;$count`
    sort: 'create_time desc'
  };
  if (curSettings.category2.value !== 'All') {
    requestData.category2 = curSettings.category2.value;
  }
  upworkController.getFeeds(requestData, async (err, response) => {
    if (err) {
      return callback(err);
    } else if (!response) {
      return callback(null, null);
    }
    var jobsTotal = (response.paging && response.paging.total) || 0,
      jobs = await filter(response.jobs, searchValue);

    filter(feedsSum, response.jobs, update, function(err, response) {
      if (err) {
        return cb(err);
      }
      var loadedJobsCount = response.length;
      if (loadedJobsCount) {
        if (update || !curCache.length) {
          storage.set('cache_last_update', new Date());
        }
        if (update) {
          let newLastJobDate = response[0].date_created;
          storage.set('last_job_date', newLastJobDate);
          EventManager.trigger('cacheUpdated', {
            newLastJobDate
          });
          response = response.concat(curCache);
          if (response.length > config.CACHE_LIMIT) {
            response.length = config.CACHE_LIMIT;
          }
        } else {
          response = curCache.concat(response);
        }
        storage.set('cache', pick(response));
      }

      cb(null, loadedJobsCount);
    });
  });
}

// ----------------
// public methods
// ----------------

function request(options, callback) {
  var opts = options,
    cb = callback,
    curCache,
    cacheSlice,
    page = opts.page || 1,
    per_page = config.JOBS_PER_PAGE;

  function getMoreJobs() {
    checkInboxCacheLiveTime(function(err, response) {
      if (err) {
        return cb(err);
      }
      opts.update = response;
      populate(opts, (err, response) => {
        if (err) {
          return cb(err);
        }
        if (response > 0) {
          _getCache();
        } else {
          cb(null, cacheSlice);
        }
      });
    });
  }
  function getJobs() {
    var start = (page - 1) * per_page,
      end = page * per_page;

    cacheSlice = curCache.slice(start, end);

    if (cacheSlice.length === per_page) {
      cb(null, cacheSlice);
    } else {
      getMoreJobs();
    }
  }

  function _getCache() {
    getCache(null, function(err, response) {
      if (err) {
        return cb(err);
      }
      curCache = response;
      getJobs();
    });
  }

  _getCache();
}

function checkNew(callback) {
  var cb = callback || _.noop;
  checkInboxCacheLiveTime();
  populate({
    update: true
  }, cb);
}

function get(id, callback) {
  getCache(id, callback);
}

function set(data, callback) {
  var cb = callback || _.noop;
  storage.set('cache', pick(data), cb);
}

function update(id, data, callback) {
  var cb = callback || _.noop;
  getCache(null, function(err, curCache) {
    if (err) {
      return cb(err);
    }
    var item = _.findWhere(curCache, {id});
    if (item) {
      _.extend(item, data);
    }
    set(curCache, cb);
  });
}

function flush() {
  storage.remove(['cache', 'last_job_date']);
}

function isEmpty(callback) {
  var cb = callback || _.noop;
  getCache(null, function(err, response) {
    if (err) {
      return cb(err);
    }
    cb(response.length === 0);
  });
}

// ---------
// interface
// ---------

export {
  request,
  checkNew,
  get,
  set,
  update,
  flush,
  isEmpty
};
