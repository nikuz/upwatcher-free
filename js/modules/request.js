'use strict';

import * as upwork from './upwork';
import * as EventManager from './events';
import {NetInfo} from 'react-native';

// ----------------
// public methods
// ----------------

var pGet = function(options, callback) {
  var opts = options,
    cb = callback,
    requestBody = {
      url: opts.url,
      responseDataType: 'json'
    };

  NetInfo.isConnected.fetch().done(isConnected => {
    if (isConnected) {
      if (opts.data) {
        requestBody.data = opts.data;
      }

      upwork.request(requestBody, (err, response) => {
        if (err) {
          cb(err);
        } else {
          cb(null, response);
        }
      });
      return 'request emitted';
    } else {
      EventManager.trigger('networkError');
      cb(null, null);
    }
  });
};

// ---------
// interface
// ---------

export {
  pGet as get
};
