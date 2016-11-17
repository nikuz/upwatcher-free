'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as previewActions from '../../actions/preview';
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
      var response,
        responseErr;

      try {
        response = await upworkController.getJobInfo(id);
      } catch (err) {
        responseErr = err;
      }

      if (response && response.profile) {
        dispatch(previewActions.update(response.profile));
      } else {
        dispatch(errorActions.show(this.getJobInfo.bind(this, id)));
        if (responseErr) {
          logsController.captureError(responseErr);
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewView);
