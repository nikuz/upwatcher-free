'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as OverlayActions from '../../actions/overlay';
import OverlayView from './view';

const mapStateToProps = function(state) {
  return {
    overlay: state.overlay
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayView);
