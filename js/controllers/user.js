'use strict';

import * as _ from 'underscore';
import * as config from '../config';
import * as userModel from '../models/user';
import * as settingsModel from '../models/settings';
import * as device from '../modules/device';
import * as ajax from '../modules/ajax';
import constants from '../modules/constants';
import * as logs from './logs';

const activeRequests = {};

function settingsParse(sData) {
  let data = {};
  _.each(sData, (item, key) => {
    data[key] = item.value;
  });
  return data;
}

// ----------------
// public methods
// ----------------

async function registration(token) {
  if (!token) {
    return new Error(constants.REQUIRED('token'));
  }
  if (activeRequests.register) {
    activeRequests.register.abort();
  }

  var settings = await settingsModel.get();

  activeRequests.register = ajax.post({
    url: config.PROXY_URL + '/accounts',
    data: _.extend(settingsParse(settings), {
      id: token,
      os: device.isAndroid() ? 'android' : 'ios',
      timezone: new Date().getTimezoneOffset()
    }),
    requestDataType: 'json',
    responseDataType: 'json',
    success: function(response) {
      userModel.set({
        id: response.userid
      });
    },
    error: function(err) {
      logs.captureError(err);
    },
    final: function() {
      activeRequests.register = null;
    }
  });
}

async function settingsSave(settings) {
  if (!settings) {
    return new Error(constants.REQUIRED('settings'));
  }

  if (activeRequests.settings) {
    activeRequests.settings.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return new Error(constants.NOT_REGISTERED());
  }

  activeRequests.settings = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/settings`,
    data: settingsParse(settings),
    requestDataType: 'json',
    error: function(err) {
      logs.captureError(err);
    },
    final: function() {
      activeRequests.settings = null;
    }
  });
}

async function feedsSave(feedsValue) {
  if (!feedsValue) {
    return new Error(constants.REQUIRED('feedsValue'));
  }
  if (activeRequests.feeds) {
    activeRequests.feeds.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return new Error(constants.NOT_REGISTERED());
  }

  activeRequests.feeds = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/feeds`,
    data: {
      feeds: feedsValue
    },
    requestDataType: 'json',
    error: function(err) {
      logs.captureError(err);
    },
    final: function() {
      activeRequests.feeds = null;
    }
  });
}

async function lastJobDateSave(date) {
  if (!date) {
    return new Error(constants.REQUIRED('date'));
  }
  if (activeRequests.last_job) {
    activeRequests.last_job.abort();
  }

  var user = await userModel.get();
  if (!user.id) {
    return new Error(constants.NOT_REGISTERED());
  }

  activeRequests.last_job = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/last_job_date`,
    data: {
      date: date
    },
    requestDataType: 'json',
    error: function(err) {
      logs.captureError(err);
    },
    final: function() {
      activeRequests.last_job = null;
    }
  });
}

async function upworkTokenSave(token, token_secret) {
  if (!token) {
    return new Error(constants.REQUIRED('token'));
  }
  if (!token_secret) {
    return new Error(constants.REQUIRED('token_secret'));
  }
  if (activeRequests.token_save) {
    return;
  }

  var user = await userModel.get();
  if (!user.id) {
    return new Error(constants.NOT_REGISTERED());
  }

  activeRequests.token_save = ajax.put({
    url: config.PROXY_URL + `/accounts/${user.id}/token`,
    data: {
      token: token,
      token_secret: token_secret
    },
    requestDataType: 'json',
    error: function(err) {
      logs.captureError(err);
    },
    final: function() {
      activeRequests.token_save = null;
    }
  });
}

// ---------
// interface
// ---------

export {
  registration,
  settingsSave,
  feedsSave,
  lastJobDateSave,
  upworkTokenSave
};
