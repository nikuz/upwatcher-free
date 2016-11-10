'use strict';

const DEFAULT = {
  loading: true,
  data: null
};

export default function previewReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'PREVIEW_UPDATE':
      return Object.assign({}, state, {
        loading: false,
        data: action.data
      });
    default:
      return Object.assign({}, state, {
        loading: true
      });
  }
};
