'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as StateActions from '../../actions/state';
import PreviewView from './view';

const mapStateToProps = function(state) {
  return {
  };
};

const mapDispatchToProps = function(dispatch) {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewView);
