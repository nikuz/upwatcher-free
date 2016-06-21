'use strict';

import * as _ from 'underscore';
import * as config from '../config';
import * as storage from './storage';
import * as cache from './cache';
import * as logs from './logs';
import * as EventManager from './events';
import {
  parallel as asyncParallel
} from 'async';

// ----------------
// public methods
// ----------------

function getJobs(options, callback) {
  var opts = options || {},
    cb = callback || _.noop,
    folder = opts.folder,
    page = opts.page;

  if (folder === 'inbox') {
    cache.request({
      page: page
    }, cb);
  } else {
    storage.get(folder, function(err, jobs) {
      if (err) {
        cb(err);
      } else {
        jobs = jobs || [];
        var per_page = config.JOBS_PER_PAGE,
          start = (page - 1) * per_page,
          end = page * per_page;

        cb(null, jobs.slice(start, end));
      }
    });
  }
}

function moveJobs(jobs, sourceFolder, targetFolder) {
  asyncParallel([
    function(internalCallback) { // 0
      cache.get(null, internalCallback);
    },
    function(internalCallback) { // 1
      storage.get(targetFolder, internalCallback);
    },
    function(internalCallback) { // 2
      storage.get(sourceFolder, internalCallback);
    },
    function(internalCallback) { // 3
      storage.get('trash_extra', internalCallback);
    }
  ], function(err, results) {
    if (err) {
      return logs.captureError(err);
    }
    var curCache = results[0],
      targetFolderJobs = results[1] || [],
      sourceFolderJobs = results[2] || [],
      trashExtraJobs = results[3] || [];

    switch (sourceFolder) {
      case 'inbox':
        sourceFolder = 'cache';
        sourceFolderJobs = curCache;
        break;
      case 'trash':
        if (targetFolder === 'trash') {
          targetFolder = 'trash_extra';
          targetFolderJobs = trashExtraJobs;
        }
        break;
    }

    _.each(jobs, jobItem => {
      sourceFolderJobs.every((sourceItem, key) => {
        if (jobItem === sourceItem.id) {
          sourceItem = sourceFolderJobs.splice(key, 1)[0];
          _.extend(sourceItem, {
            checked: false,
            is_new: false
          });
          targetFolderJobs.unshift(sourceItem);
          return false;
        } else {
          return true;
        }
      });
    });

    if (targetFolder === 'trash') {
      let limitTrash = config.TRASH_LIMIT;
      if (targetFolderJobs.length > limitTrash) {
        let tail = targetFolderJobs.splice(limitTrash, targetFolderJobs.length),
          extra = [];

        targetFolderJobs.length = limitTrash;
        _.each(tail, item => {
          extra.push({
            id: item.id,
            feeds: item.feeds,
            date_created: item.date_created
          });
        });

        trashExtraJobs = trashExtraJobs.concat(extra);
        if (trashExtraJobs.length > config.TRASH_EXTRA_LIMIT) {
          trashExtraJobs.length = config.TRASH_EXTRA_LIMIT;
        }
        storage.set('trash_extra', trashExtraJobs);
      }
    }
    if (targetFolder === 'favorites') {
      let limitFavorites = config.FAVORITES_LIMIT;
      if (targetFolderJobs.length > limitFavorites) {
        targetFolderJobs.length = limitFavorites;
      }
    }
    console.log(targetFolderJobs.length);
    storage.set(targetFolder, targetFolderJobs);
    EventManager.trigger('jobsMovedToFolder', {
      targetFolder
    });
    if (sourceFolder === 'cache') {
      cache.set(sourceFolderJobs);
    } else {
      storage.set(sourceFolder, sourceFolderJobs);
    }
  });
}

function checkNew(options, callback) {
  var opts = options || {},
    cb = callback || _.noop;

  if (opts.folder === 'inbox') {
    cache.checkNew(cb);
  }
}

function updateItem(options, callback) {
  var opts = options || {},
    cb = callback || _.noop,
    items = opts.items,
    folder = opts.folder === 'inbox' ? 'cache' : opts.folder;

  storage.get(folder, function(err, storedItems) {
    if (err) {
      cb(err);
    }

    if (storedItems) {
      _.each(items, item => {
        var storedItem = _.findWhere(storedItems, {id: item.id});
        _.extend(storedItem, item.data);
      });
      storage.set(folder, storedItems);
    }
    cb();
  });
}

// ---------
// interface
// ---------

export {
  getJobs,
  moveJobs,
  checkNew,
  updateItem
};
