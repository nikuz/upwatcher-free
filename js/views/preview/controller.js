'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as StateActions from '../../actions/state';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import PreviewView from './view';

const mapStateToProps = function(state) {
  return {
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    addToFavorites: function(item) {
      dispatch(favoritesActions.add(item));
      favoritesModel.add(item);
    },
    removeFromFavorites: function(id) {
      dispatch(favoritesActions.remove(id));
      favoritesModel.remove(id);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewView);
