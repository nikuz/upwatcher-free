'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as previewActions from '../../actions/preview';
import * as favoritesActions from '../../actions/favorites';
import * as favoritesModel from '../../models/favorites';
import * as overlayActions from '../../actions/overlay';
import * as errorActions from '../../actions/error';
import * as upworkController from '../../controllers/upwork';
import * as logsController from '../../controllers/logs';
import PreviewView from './view';

const mapStateToProps = function(state) {
  return {
    preview: state.preview
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getJobInfo: async function(id) {
      var response;
      try {
        response = await upworkController.getJobInfo(id);
      } catch (err) {
        dispatch(errorActions.show(this.getJobInfo));
        logsController.captureError(err);
      }
      if (response && response.profile) {
        dispatch(previewActions.update(response.profile));
      } else {
        dispatch(errorActions.show(this.getJobInfo));
        logsController.captureMessage('Preview Controller `getJobInfo` empty response');
      }
    },
    addToFavorites: function(item) {
      dispatch(favoritesActions.add(item));
      favoritesModel.add(item);
    },
    removeFromFavorites: function(id) {
      dispatch(favoritesActions.remove(id));
      favoritesModel.remove(id);
    },
    openFeedbackOverlay: function(title, cont) {
      dispatch(overlayActions.open({
        title: title,
        navigator: true,
        transparent: false,
        component: cont
      }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewView);
