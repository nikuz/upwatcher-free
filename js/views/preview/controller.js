'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as config from '../../config';
import * as adsModel from '../../models/ads';
import * as previewActions from '../../actions/preview';
import * as overlayActions from '../../actions/overlay';
import * as errorActions from '../../actions/error';
import * as notificationsActions from '../../actions/notifications';
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
      var response,
        responseErr,
        networkError;

      try {
        response = await upworkController.getJobInfo(id);
      } catch (err) {
        if (err === 'network') {
          networkError = err;
        } else {
          responseErr = err;
        }
      }

      if (response && response.profile) {
        dispatch(previewActions.update(response.profile));
      } else {
        if (responseErr) {
          dispatch(errorActions.show(this.getJobInfo.bind(this, id)));
          logsController.captureError(responseErr);
        } else if (networkError) {
          dispatch(errorActions.showNetwork());
        } else {
          logsController.captureMessage('Preview Controller `getJobInfo` empty response');
        }
      }
    },
    openFeedbackOverlay: function(title, cont) {
      dispatch(overlayActions.open({
        title: title,
        navigator: true,
        transparent: false,
        animationType: 'slide',
        component: cont
      }));
    },
    adsErrorHandler: function(err) {
      logsController.captureError(err);
    },
    adsGetPermit: async function() {
      var counter = await adsModel.get(),
        allow = counter < config.ADDS_LIMIT;

      if (!allow) {
        adsModel.refresh();
      }

      return allow;
    },
    adsIncrementViewsCounter: function() {
      adsModel.increment();
    },
    adsOpenPromoOverlay: function() {
      dispatch(notificationsActions.show('preview'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewView);
