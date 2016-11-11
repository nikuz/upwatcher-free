'use strict';

import {
  Platform,
  AppStateIOS
} from 'react-native';
import * as _ from 'underscore';
import {
  series as asyncSeries,
} from 'async';
import * as config from '../config';
import * as settings from '../models/settings';
import * as storage from './storage';
import * as EventManager from './events';
import * as ajax from './ajax';
import * as logs from '../controllers/logs';

var activeRequests = {};

function settingsParse(sData) {
  var data = {};
  _.each(sData, (item, key) => {
    data[key] = item.value;
  });
  return data;
}

function register(options) {
  var opts = options || {};
  if (!opts.token || activeRequests.register) {
    return;
  }
  activeRequests.register = true;

  var alreadyRegistered,
    userid,
    sData;

  asyncSeries([
    function(internalCallback) {
      storage.get('userid', function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          alreadyRegistered = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (alreadyRegistered) {
        return internalCallback();
      }
      settings.get(null, function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          sData = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!sData) {
        return internalCallback();
      }

      ajax.post({
        url: config.PROXY_URL + '/accounts',
        data: _.extend(settingsParse(sData), {
          id: opts.token,
          os: Platform.OS,
          timezone: new Date().getTimezoneOffset()
        }),
        requestDataType: 'json',
        responseDataType: 'json',
        success: function(response) {
          activeRequests.register = null;
          userid = response.userid;
          internalCallback();
        },
        error: function(err) {
          activeRequests.register = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
    if (userid) {
      storage.set('userid', userid);
    }
  });
}

function login() {
  if (activeRequests.login || AppStateIOS.currentState !== 'active') {
    return;
  }

  var userid;
  asyncSeries([
    function(internalCallback) {
      storage.get('userid', function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          userid = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!userid) {
        return internalCallback();
      }

      activeRequests.login = ajax.put({
        url: config.PROXY_URL + `/accounts/${userid}/login`,
        data: {
          timezone: new Date().getTimezoneOffset()
        },
        requestDataType: 'json',
        success: function() {
          activeRequests.login = null;
          internalCallback();
        },
        error: function(err) {
          activeRequests.login = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
  });
}

function upworkTokenSave() {
  if (activeRequests.token_save) {
    return;
  }

  var userid,
    token, token_secret;

  asyncSeries([
    function(internalCallback) {
      storage.get(['userid', 'token', 'token_secret'], function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          userid = response.userid;
          token = response.token;
          token_secret = response.token_secret;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!userid || !token || !token_secret) {
        return internalCallback();
      }

      activeRequests.token_save = ajax.put({
        url: config.PROXY_URL + `/accounts/${userid}/token`,
        data: {
          token: token,
          token_secret: token_secret
        },
        requestDataType: 'json',
        success: function() {
          activeRequests.token_save = null;
          internalCallback();
        },
        error: function(err) {
          activeRequests.token_save = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
  });
}

function settingsSave(options) {
  var opts = options || {};
  if (!opts.changed) {
    return;
  }
  if (activeRequests.settings) {
    activeRequests.settings.abort();
  }

  var userid,
    sData;

  asyncSeries([
    function(internalCallback) {
      storage.get('userid', function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          userid = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!userid) {
        return internalCallback();
      }
      settings.get(null, function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          sData = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!sData) {
        return internalCallback();
      }

      activeRequests.settings = ajax.put({
        url: config.PROXY_URL + `/accounts/${userid}/settings`,
        data: settingsParse(sData),
        requestDataType: 'json',
        success: function() {
          activeRequests.settings = null;
          internalCallback();
        },
        error: function(err) {
          activeRequests.settings = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
  });
}

function feedsSave(options) {
  var opts = options || {};
  if (!opts.feeds) {
    return;
  }
  if (activeRequests.feeds) {
    activeRequests.feeds.abort();
  }

  var userid;
  asyncSeries([
    function(internalCallback) {
      storage.get('userid', function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          userid = response;
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!userid) {
        return internalCallback();
      }

      activeRequests.feeds = ajax.put({
        url: config.PROXY_URL + `/accounts/${userid}/feeds`,
        data: {
          feeds: opts.feeds
        },
        requestDataType: 'json',
        success: function() {
          activeRequests.feeds = null;
          internalCallback();
        },
        error: function(err) {
          activeRequests.feeds = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
  });
}

function lastJobDateSave(options) {
  var opts = options || {};
  if (!opts.newLastJobDate) {
    return;
  }
  if (activeRequests.last_job) {
    activeRequests.last_job.abort();
  }

  var userid,
    last_job_date;

  asyncSeries([
    function(internalCallback) {
      storage.get(['userid', 'last_job_date'], function(err, response) {
        if (err) {
          internalCallback(err);
        } else {
          userid = response.userid;
          last_job_date = response.last_job_date;
          if (last_job_date) {
            last_job_date = new Date(last_job_date);
          }
          internalCallback();
        }
      });
    },
    function(internalCallback) {
      if (!userid || !last_job_date || last_job_date >= opts.newLastJobDate) {
        return internalCallback();
      }

      activeRequests.last_job = ajax.put({
        url: config.PROXY_URL + `/accounts/${userid}/last_job_date`,
        data: {
          date: opts.newLastJobDate
        },
        requestDataType: 'json',
        success: function() {
          activeRequests.last_job = null;
          internalCallback();
        },
        error: function(err) {
          activeRequests.last_job = null;
          internalCallback(err);
        }
      });
    }
  ], function(err) {
    if (err) {
      return logs.captureError(err);
    }
  });
}

setTimeout(login, 1000);
