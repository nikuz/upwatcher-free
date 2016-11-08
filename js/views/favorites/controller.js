'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import FavoritesView from './view';

const mapStateToProps = function(state) {
  return {
    favorites: state.favorites
  };
};

const mapDispatchToProps = function(dispatch) {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesView);
