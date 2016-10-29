'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as SettingsActions from '../../../actions/settings';
import * as overlayActions from '../../../actions/overlay';
import View from './view';

const mapStateToProps = function(state) {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    overlayOpen: function(props) {
      dispatch(overlayActions.open(props));
    },
    overlayClose: function() {
      dispatch(overlayActions.close());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);
