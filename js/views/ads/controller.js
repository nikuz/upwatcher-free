'use strict';

import * as React from 'react';
import { connect } from 'react-redux';
import * as config from '../../config';
import * as adsModel from '../../models/ads';
import * as adsActions from '../../actions/ads';
import * as notificationsActions from '../../actions/notifications';
import * as logsController from '../../controllers/logs';
import AdsView from './view';

const mapStateToProps = function(state) {
  return {
    ads: state.ads
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    errorHandler: function(err) {
      logsController.captureError(err);
    },
    getPermit: async function() {
      var counter = await adsModel.get(),
        allow = counter < config.ADDS_LIMIT;

      if (!allow) {
        adsModel.refresh();
      }

      return allow;
    },
    incrementViewsCounter: function() {
      adsModel.increment();
    },
    openPromoOverlay: function() {
      dispatch(notificationsActions.show('preview'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdsView);
