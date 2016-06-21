'use strict';

import * as _ from 'underscore';

var vars = {
  UPWORK_KEY: '6892f6b7b2ad1170412588fad3762d21',
  UPWORK_SECRET: '886c89c899e1e1a8',
  LOGGLY_KEY: '22bb8008-2738-467b-96c0-9df8a1667ba0'
};

_.each(vars, function(value, key) {
  process.env[key] = value;
});
