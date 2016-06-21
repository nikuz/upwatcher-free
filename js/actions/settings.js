'use strict';

import * as _ from 'underscore';

const OPEN = {
  type: 'OPEN',
  view: 'settings'
};

const CLOSE = {
  type: 'CLOSE',
  view: 'settings'
};

function open(activeView) {
  return _.extend(OPEN, {activeView});
}

function close() {
  return CLOSE;
}

export {
  open,
  close
};
