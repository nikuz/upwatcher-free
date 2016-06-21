'use strict';

import {
  Linking,
  AppState
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../config';
import * as storage from '../modules/storage';
import * as OAuth from '../modules/oauth';
import constants from '../modules/constants';
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

  if (!url) {
    return callback(constants.REQUIRED('url'));
  }

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

  console.log(request_obj);
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

async function getToken() {
  return new Promise(async function(resolve) {
    var {
      token,
      token_secret,
      verifier,
      access,
      token_time
    } = await storage.get(['token', 'token_secret', 'verifier', 'access', 'token_time']);

    token_time = Number(token_time);

    if (token && token_secret && ((verifier && access) || (Date.now() - token_time) / 1000 / 60 < 4)) { // less than 4 min
      resolve();
    } else {
      await flushAccess();
      request({
        url: config.UPWORK_TOKEN_URL,
        method: 'POST',
        format: 'text',
        data: {
          oauth_callback: 'oauth2upwatcher://foo'
        }
      }, async function(err, response) {
        if (err) {
          resolve(err);
        } else {
          response = oauth.deParam(response);
          if (!response.oauth_token || !response.oauth_token_secret) {
            resolve(`Can't get Upwork token`);
          } else {
            await storage.set({
              token_time: Date.now(),
              token: response.oauth_token,
              token_secret: response.oauth_token_secret
            });
            resolve();
          }
        }
      });
    }
  });
}

async function getVerifier() {
  return new Promise(async function(resolve) {
    var {verifier, token} = await storage.get(['verifier', 'token']),
      gotVerifier;

    if (verifier) {
      return resolve();
    }

    var finish = async function(verifier) {
      Linking.removeEventListener('url', parseLoadedUrl);
      // AppState.removeEventListener('change', stateChanged);
      if (verifier) {
        await storage.set('verifier', verifier);
        resolve();
      } else {
        resolve(`Can't get Upwork verifier`);
      }
    };

    var stateChanged = function(state) {
      if (state === 'active') {
        setTimeout(() => !gotVerifier && finish(), 500);
      }
    };

    var parseLoadedUrl = function(event) {
      console.log(event);
      if (gotVerifier) {
        return;
      }
      var url = (event && event.url && event.url.split('&')) || [],
        verifier;

      console.log(url);

      _.each(url, function(item) {
        if (item.indexOf('oauth_verifier') !== -1) {
          item = item.split('=');
          verifier = item[1];
          gotVerifier = true;
        }
      });
      finish(verifier);
    };

    // AppState.addEventListener('change', stateChanged);
    let url = `${config.UPWORK_URL}${config.UPWORK_VERIFIER_URL}?oauth_token=${token}`;
    Linking.addEventListener('url', parseLoadedUrl);
    Linking.openURL(url);
  });
}

async function getAccess() {
  return new Promise(async function(resolve) {
    var {access, token, verifier} = await storage.get(['access', 'token', 'verifier']);
    if (access) {
      return resolve();
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
        resolve(err);
      } else {
        response = oauth.deParam(response);
        if (!response.oauth_token || !response.oauth_token_secret) {
          resolve(`Can't get Upwork access token`);
        } else {
          await storage.set({
            access: response.oauth_token,
            token: response.oauth_token,
            token_secret: response.oauth_token_secret
          });
          resolve();
        }
      }
    });
  });
}

async function login() {
  await init();

  var token = await getToken(),
    verifier, access;

  if (_.isUndefined(token)) {
    verifier = await getVerifier();
  } else {
    return token;
  }
  if (_.isUndefined(verifier)) {
    access = await getAccess();
  } else {
    return verifier;
  }
  if (_.isUndefined(access)) {
    return true;
  } else {
    return access;
  }
}

// ----------------
// public methods
// ----------------

async function getFeeds(options = {}, callback = _.noop) {
  var loginAttempt = await login();
  if (loginAttempt !== true) {
    return callback(loginAttempt);
  }

  request({
    url: config.UPWORK_JOBS_URL,
    method: 'GET',
    data: options
  }, callback);
}

// ---------
// interface
// ---------

(async function() {
  await flushAccess();
})();

export {
  getFeeds
};
