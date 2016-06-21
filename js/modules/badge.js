'use strict';

import {
  PushNotificationIOS,
  Platform
} from 'react-native';
import * as _ from 'underscore';
import * as cache from './cache';
import * as logs from './logs';

// ----------------
// public methods
// ----------------

function update() {
  if (Platform.OS === 'android') {
    return;
  }
  PushNotificationIOS.checkPermissions(function(permissions) {
    if (!permissions.badge) {
      return;
    }

    cache.get(null, function(err, response) {
      if (err) {
        return logs.captureError(err);
      } if (response.length) {
        let newsCount = 0;
        _.each(response, item => {
          if (item.is_new) {
            newsCount += 1;
          }
        });
        PushNotificationIOS.setApplicationIconBadgeNumber(newsCount);
      }
    });
  });
}

// ---------
// interface
// ---------

export {
  update
};

