'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as AppStateActions from '../../actions/state';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import * as errorActions from '../../actions/error';
import * as notificationsActions from '../../actions/notifications';
import FavoritesView from './view';

const mapStateToProps = function(state) {
  return {
    favorites: state.favorites
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    removeFromFavorites: function(id) {
      dispatch(favoritesActions.remove(id));
      favoritesModel.remove(id);
    },
    pushState: function(id, data, onFavoriteHandler) {
      dispatch(AppStateActions.push({
        id,
        name: id,
        data,
        onFavoriteHandler
      }));
      dispatch(notificationsActions.hide());
      dispatch(errorActions.hide());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesView);
