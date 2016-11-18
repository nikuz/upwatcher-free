'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as AppStateActions from '../actions/state';
import * as errorActions from '../actions/error';
import View from './main-view';

const mapStateToProps = function(state) {
  return {
    state: state.state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    pushState: function(id) {
      dispatch(AppStateActions.push({
        id,
        name: id
      }));
      dispatch(errorActions.hide());
    },
    popState: function(id) {
      dispatch(AppStateActions.pop(id));
      dispatch(errorActions.hide());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
