'use strict';

import * as _ from 'underscore';
import * as logs from './logs';

var events = [
  // search
  'feedsAdded',
  //
  'jobItemOpened',
  'jobItemShare',
  'jobsReceived',
  'jobsNotReceived',
  'btnBackClicked',
  'inboxError',
  'networkError',
  'listStartUpdate',
  'jobsSelected',
  'folderChanged',
  'cacheUpdated',
  'feedsCheckNews',
  'gotNewJobsCount',
  // list and list manager
  'btnSelectAllClicked',
  'btnFavoritesClicked',
  'btnTrashClicked',
  'btnReadClicked',
  'btnShareClicked',
  'listHaventSelectedItems',
  'listBecomeEmpty',
  'jobHasFolderChanged',
  'jobsMovedToFolder',
  // settings
  'stngSwitcherChange',
  'settingsHide',
  'settingsSaved',
  // overlay
  'overlayOpen',
  'overlayClose',
  // notifications
  'notificationsTokenAdded',
  'notificationsGot',
  'notificationsClicked',
  // token
  'upworkTokenAdded'
];

var _evs = events;
events = {};
_.each(_evs, function(event) {
  events[event] = {
    handlers: new Map()
  };
});
_evs = null;

var checkEventExists = function(eventName) {
  if (_.contains(_.keys(events), eventName)) {
    return true;
  } else {
    logs.captureError(`EventManager event ${eventName} not found`);
  }
};

// ----------------
// public methods
// ----------------

var pOn = function(eventName, handler) {
  eventName = eventName.split(' ');
  _.each(eventName, function(item) {
    if (checkEventExists(item)) {
      events[item].handlers.set(handler, handler);
    }
  });
};

var pOff = function(eventName, handler) {
  eventName = eventName.split(' ');
  _.each(eventName, function(item) {
    if (checkEventExists(item)) {
      events[item].handlers.delete(handler);
    }
  });
};

var pTrigger = function(eventName, values) {
  if (checkEventExists(eventName)) {
    let env = process.env.CURRENT_ENV;
    if (env !== 'PROD' && env !== 'TEST') {
      console.log(`'${eventName}' event is triggered`);
    }
    events[eventName].handlers.forEach(function(handler) {
      if (!values) {
        values = {
          name: eventName
        };
      }
      handler(values);
    });
  }
};

var pFlushEvents = function() {
  _.each(events, function(eventName, key) {
    events[key].handlers = new Map();
  });
};

// ---------
// interface
// ---------

export {
  pOn as on,
  pOff as off,
  pTrigger as trigger,
  pFlushEvents as flushEvents
};
