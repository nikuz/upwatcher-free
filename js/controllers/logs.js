'use strict';

import * as _ from 'underscore';
import * as config from '../config';
import * as ajax from '../modules/ajax';

var session_id;

if (!session_id) {
  session_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r&0x3 | 0x8);
    return v.toString(16);
  });
}

function track(data, type) {
  if (_.isError(data)) {
    data = {
      text: data.toString(),
      type
    };
  } else if (_.isString(data)) {
    data = {
      text: data,
      type
    };
  }
  data.sessionId = session_id;
  ajax.post({
    url: `${config.LOGGLY_URL}/inputs/${process.env.LOGGLY_KEY}/tag/${config.LOGGLY_TAG}`,
    data: data,
    requestDataType: 'json'
  });
}

// ----------------
// public functions
// ----------------

function captureMessage(message) {
  if (process.env.NODE_ENV === 'production') {
    track(message, 'message');
  } else {
    console.log(message);
  }
}

function captureError(error) {
  if (process.env.NODE_ENV === 'production') {
    track(error, 'error');
  } else {
    console.error(error);
  }
}

// ---------
// interface
// ---------

export {
  captureMessage,
  captureError
};
