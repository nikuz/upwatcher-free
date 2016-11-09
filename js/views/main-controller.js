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
    pushState: function(id) {
      dispatch(AppStateActions.push({
        id,
        name: id
      }));
    },
    popState: function(id) {
      dispatch(AppStateActions.pop(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
