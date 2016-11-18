'use strict';

import {
  Linking
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../config';
import * as storage from '../modules/storage';
import * as OAuth from '../modules/oauth';
import * as settingsModel from '../models/settings';
import * as searchModel from '../models/search';
import * as upworkModel from '../models/upwork';
import * as network from '../modules/network';
import * as ajax from '../modules/ajax';

var oauth;

function init() {
  if (!oauth) {
    oauth = OAuth.init({
      consumer: {
        public: process.env.UPWORK_KEY,
        secret: process.env.UPWORK_SECRET
      }
    });
  }
}

async function request(options = {}, callback = _.noop) {
  var url = options.url,
    method = options.method || 'GET',
    format = options.format || 'json';

  var {token, token_secret} = await storage.get(['token', 'token_secret']),
    request_data = {
      url: config.UPWORK_URL + url,
      method: method,
      data: _.extend(options.data || {}, token && {oauth_token: token})
    },
    request_obj = {
      url: config.UPWORK_URL + url,
      responseDataType: format, // some responses will be in plain text
      success: function(data) {
        callback(null, data);
      },
      error: function(error) {
        callback(error);
      }
    };

  request_data = oauth.authorize(request_data, {
    secret: token_secret
  });
  request_obj.data = request_data;

  if (method === 'GET') {
    ajax.get(request_obj);
  } else {
    ajax.post(request_obj);
  }
}

async function flushAccess() {
  return await storage.remove([
    'token',
    'token_secret',
    'verifier',
    'access',
    'token_time'
  ]);
}

function getToken() {
  return new Promise(async function(resolve, reject) {
    var {
      token,
      token_secret,
      verifier,
      access,
      token_time
    } = await storage.get(['token', 'token_secret', 'verifier', 'access', 'token_time']);

    token_time = Number(token_time);

    if (token && token_secret && ((verifier && access) || (Date.now() - token_time) / 1000 / 60 < 4)) { // less than 4 min
      resolve(token);
    } else {
      await flushAccess();
      request({
        url: config.UPWORK_TOKEN_URL,
        method: 'POST',
        format: 'text',
        data: {
          oauth_callback: 'oauth2upwatcherfree://foo'
        }
      }, async function(err, response) {
        if (err) {
          reject(err);
        } else {
          response = oauth.deParam(response);
          if (!response.oauth_token || !response.oauth_token_secret) {
            reject(`Can't get Upwork token`);
          } else {
            await storage.set({
              token_time: Date.now(),
              token: response.oauth_token,
              token_secret: response.oauth_token_secret
            });
            resolve(response.oauth_token);
          }
        }
      });
    }
  });
}

function getVerifier() {
  return new Promise(async function(resolve, reject) {
    var {verifier, token} = await storage.get(['verifier', 'token']);

    if (verifier) {
      await upworkModel.removeVerifierWaiter();
      return resolve(verifier);
    }

    let initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      _.each(initialUrl.split('&'), function(item) {
        if (item.indexOf('oauth_verifier') !== -1) {
          item = item.split('=');
          verifier = item[1];
        }
      });
      if (verifier) {
        await storage.set('verifier', verifier);
        await upworkModel.removeVerifierWaiter();
        return resolve(verifier);
      }
    }

    await upworkModel.setVerifierWaiter();

    let url = `${config.UPWORK_URL}${config.UPWORK_VERIFIER_URL}?oauth_token=${token}`;
    Linking.openURL(url).catch(function(err) {
      reject(err);
    });
    resolve(null);
  });
}

function getAccess() {
  return new Promise(async function(resolve, reject) {
    var {access, token, verifier} = await storage.get(['access', 'token', 'verifier']);
    if (access) {
      return resolve(access);
    }

    request({
      url: config.UPWORK_ACCESS_URL,
      method: 'POST',
      format: 'text',
      data: {
        oauth_token: token,
        oauth_verifier: verifier
      }
    }, async function(err, response) {
      if (err) {
        reject(err);
      } else {
        response = oauth.deParam(response);
        if (!response.oauth_token || !response.oauth_token_secret) {
          reject(`Can't get Upwork access token`);
        } else {
          await storage.set({
            access: response.oauth_token,
            token: response.oauth_token,
            token_secret: response.oauth_token_secret
          });
          resolve(response.oauth_token);
        }
      }
    });
  });
}

function login() {
  return new Promise(async function(resolve, reject) {
    init();

    try {
      await getToken();
    } catch (err) {
      return reject(err);
    }

    let verifier;
    try {
      verifier = await getVerifier();
    } catch (err) {
      return reject(err);
    }

    if (verifier === null) {
      return resolve(null);
    }

    try {
      await getAccess();
    } catch (err) {
      return reject(err);
    }

    resolve();
  });
}

// if first response will return 401 or 403 error, try to flush upwork tokens and send new request
function loginHelper() {
  return new Promise(async function(resolve, reject) {
    var response,
      responseErr;

    try {
      response = await login();
    } catch (err) {
      responseErr = err;
    }
    if (responseErr == 401 || responseErr == 403) { // not strict comparison, because error can be string
      await flushAccess();
      try {
        response = await login();
      } catch (err) {
        return reject(err);
      }
    } else if (responseErr) {
      return reject(responseErr);
    }

    return resolve(response);
  });
}

function settingsFieldPrepare(field) {
  field = field.toLowerCase();
  return field === 'all' ? '' : field.replace(/\s+/g, '_');
}

// ----------------
// public methods
// ----------------

function getFeeds(value, page) {
  return new Promise(async function(resolve, reject) {
    var loginAttempt;

    try {
      await network.check();
      loginAttempt = await loginHelper();
    } catch (err) {
      return reject(err);
    }

    if (loginAttempt === null) {
      return resolve(null);
    }

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
      pagerStart = 0;

    if (page) {
      pagerStart = page * config.JOBS_PER_PAGE;
    }
    requestData.paging = `${pagerStart};${config.JOBS_PER_PAGE}`; // API pager format is `$offset;$count`

    if (sData.category2.value !== 'All') {
      requestData.category2 = sData.category2.value;
    }

    request({
      url: config.UPWORK_JOBS_URL,
      method: 'GET',
      data: requestData
    }, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function getJobInfo(id) {
  return new Promise(async function(resolve, reject) {
    try {
      await network.check();
      await loginHelper();
    } catch (err) {
      return reject(err);
    }

    request({
      url: config.UPWORK_JOB_URL.replace('{id}', id),
      method: 'GET'
    }, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

function getCategories() {
  return new Promise(async function(resolve, reject) {
    try {
      await network.check();
      await loginHelper();
    } catch (err) {
      return reject(err);
    }

    request({
      url: config.UPWORK_JOBS_CATEGORIES,
      method: 'GET'
    }, function(err, response) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

// ---------
// interface
// ---------

export {
  getFeeds,
  getJobInfo,
  getCategories
};
