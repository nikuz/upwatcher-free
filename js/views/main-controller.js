'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as AppStateActions from '../actions/state';
import View from './main-view';

const mapStateToProps = function(state) {
  return {
    state: state.state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    pushState: function(state) {
      dispatch(AppStateActions.push(state));
    },
    popState: function(state) {
      dispatch(AppStateActions.pop(state));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
