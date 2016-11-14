'use strict';

import constants from './constants';

const interactions = new Map();

// ----------------
// public methods
// ----------------

function runAfterInteraction(name, handler) {
  if (!name) {
    return new Error(constants.REQUIRED(name));
  }
  if (!handler) {
    return new Error(constants.REQUIRED(handler));
  }

  var batch = new Set();
  if (interactions.has(name)) {
    batch = interactions.get(name);
  }
  batch.add(handler);
  interactions.set(name, batch);
}

function clearInteractionHandle(interaction) {
  if (interaction && interactions.has(interaction)) {
    let batch = interactions.get(interaction);
    batch.forEach(function(handler) {
      handler();
    });
    interactions.delete(interaction);
  } else {
    return new Error(`Can't find ${interaction} interaction`);
  }
}

// ---------
// interface
// ---------

export {
  runAfterInteraction,
  clearInteractionHandle
};
