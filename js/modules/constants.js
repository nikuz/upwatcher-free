'use strict';

import * as _ from 'underscore';

var dictionary = {
  REQUIRED: '`%s` parameter is required'
};
var dictionaryActions;

const Parser = class {
  constructor(name) {
    this.name = name;
    return ((params) => this.action(params));
  }
  action(param) {
    if (_.isArray(param)) {
      var result = dictionary[this.name];
      _.each(param, function(str) {
        result = result.replace('%s', str);
      });
      return result;
    }
    return dictionary[this.name].replace('%s', param);
  }
};

if (!dictionaryActions) {
  dictionaryActions = {};
  _.each(dictionary, function(value, key) {
    dictionaryActions[key] = new Parser(key);
  });
  dictionaryActions.dictionary = dictionary;
}

export default dictionaryActions;
