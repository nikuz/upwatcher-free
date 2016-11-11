'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import ErrorView from './view';

const mapStateToProps = function(state) {
  return {
    error: state.error
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorView);
