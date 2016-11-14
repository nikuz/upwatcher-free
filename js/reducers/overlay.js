'use strict';

const DEFAULT = {
  visible: false,
  title: '',
  navigator: false,
  transparent: true,
  animationType: 'slide',
  component: null
};

export default function overlayReducers(state = DEFAULT, action) {
  switch (action.type) {
    case 'OVERLAY_OPEN':
      return Object.assign({}, state, {
        visible: true,
        title: action.props.title,
        navigator: action.props.navigator,
        transparent: action.props.transparent,
        animationType: action.props.animationType || 'slide',
        component: action.props.component
      });

    case 'OVERLAY_CLOSE':
      return Object.assign({}, state, {
        visible: false,
      });

    default:
      return state;
  }
};
