'use strict';

import {
  NetInfo
} from 'react-native';

function check() {
  return new Promise(function(resolve, reject) {
    NetInfo.isConnected.fetch().done(function(isConnected) {
      if (isConnected) {
        resolve();
      } else {
        reject('Internet connection error');
      }
    });
  });
}

export {
  check
};
