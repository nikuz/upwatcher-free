'use strict';

const DEFAULT = {};

export default function previewReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'PREVIEW_UPDATE':
      return action.data;
    default:
      return state;
  }
};
