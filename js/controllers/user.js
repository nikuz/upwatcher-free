'use strict';

import * as _ from 'underscore';
import * as config from '../config';
import * as userModel from '../models/user';
import * as settingsModel from '../models/settings';
import * as device from '../modules/device';
import * as ajax from '../modules/ajax';
import * as logs from './logs';

var activeRequests = {};

function settingsParse(sData) {
  var data = {};
  _.each(sData, (item, key) => {
    data[key] = item.value;
  });
  return data;
}

async function registration(options = {}) {
  if (!options.token || activeRequests.register) {
    return;
  }
  // if already registered
  if (await userModel.get()) {
    return;
  }

  activeRequests.register = true;
  var settings = await settingsModel.get();

  ajax.post({
    url: config.PROXY_URL + '/accounts',
    data: _.extend(settingsParse(settings), {
      id: opts.token,
      os: device.isAndroid() ? 'android' : 'ios',
      timezone: new Date().getTimezoneOffset()
    }),
    requestDataType: 'json',
    responseDataType: 'json',
    success: function(response) {
      activeRequests.register = null;
      userModel.set({
        id: response.userid
      });
    },
    error: function(err) {
      activeRequests.register = null;
      logs.captureError(err);
    }
  });
}

async function login() {
  if (activeRequests.login) {
    return;
  }

  var user = await userModel.get();
  if (!user.id) {
    return;
  }

  activeRequests.login = true;
  ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/login`,
    data: {
      timezone: new Date().getTimezoneOffset()
    },
    requestDataType: 'json',
    success: function() {
      activeRequests.login = null;
    },
    error: function(err) {
      activeRequests.login = null;
      logs.captureError(err);
    }
  });
}

async function settingsSave(options = {}) {
  if (!options.changed) {
    return;
  }
  if (activeRequests.settings) {
    activeRequests.settings.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return;
  }
  var settings = await settingsModel.get();


  activeRequests.settings = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/settings`,
    data: settingsParse(settings),
    requestDataType: 'json',
    success: function() {
      activeRequests.settings = null;
    },
    error: function(err) {
      activeRequests.settings = null;
      logs.captureError(err);
    }
  });
}

async function feedsSave(options = {}) {
  if (!options.feeds) {
    return;
  }
  if (activeRequests.feeds) {
    activeRequests.feeds.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return;
  }

  activeRequests.feeds = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/feeds`,
    data: {
      feeds: options.feeds
    },
    requestDataType: 'json',
    success: function() {
      activeRequests.feeds = null;
    },
    error: function(err) {
      activeRequests.feeds = null;
      logs.captureError(err);
    }
  });
}

async function lastJobDateSave(options = {}) {
  if (!options.date) {
    return;
  }
  if (activeRequests.last_job) {
    activeRequests.last_job.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return;
  }

  activeRequests.last_job = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/last_job_date`,
    data: {
      date: options.date
    },
    requestDataType: 'json',
    success: function() {
      activeRequests.last_job = null;
    },
    error: function(err) {
      activeRequests.last_job = null;
      logs.captureError(err);
    }
  });
}

async function upworkTokenSave(options = {}) {
  if (!options.token || !options.token_secret) {
    return;
  }

  if (activeRequests.token_save) {
    return;
  }

  var user = await userModel.get();
  if (!user.id) {
    return;
  }

  activeRequests.token_save = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/token`,
    data: {
      token: options.token,
      token_secret: options.token_secret
    },
    requestDataType: 'json',
    success: function() {
      activeRequests.token_save = null;
    },
    error: function(err) {
      activeRequests.token_save = null;
      logs.captureError(err);
    }
  });
}

// ---------
// interface
// ---------

export {
  registration,
  login,
  settingsSave,
  feedsSave,
  lastJobDateSave,
  upworkTokenSave
};
