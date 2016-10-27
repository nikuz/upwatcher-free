'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as StateActions from '../../actions/state';
import FeedsView from './view';

const mapStateToProps = function(state) {
  return {
    state: state.state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedsView);
