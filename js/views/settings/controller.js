'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/settings';
import SettingsView from './view';

const mapStateToProps = function(state) {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
