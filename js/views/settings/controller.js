'use strict';

import * as React from 'react';
import * as _ from 'underscore';
import { connect } from 'react-redux';
import * as settingsModel from '../../models/settings';
import * as settingsActions from '../../actions/settings';
import * as feedsActions from '../../actions/feeds';
import * as overlayActions from '../../actions/overlay';
import * as errorActions from '../../actions/error';
import * as upworkController from '../../controllers/upwork';
import * as logsController from '../../controllers/logs';
import SettingsView from './view';

const mapStateToProps = function(state) {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    change: function(name, value) {
      dispatch(settingsActions.change(name, value));
    },
    save: async function(sData) {
      var curSavedSettings = await settingsModel.get(),
        needToUpdateCache = false,
        changed = false;

      _.each(curSavedSettings, (item, key) => {
        if (item.value !== sData[key].value) {
          if (item.search) {
            needToUpdateCache = true;
          }
          changed = true;
        }
      });
      if (changed) {
        settingsModel.set(sData);
      }
      if (needToUpdateCache) {
        dispatch(feedsActions.refresh());
      }
    },
    getCategories: async function() {
      var response,
        categories = [{
          'All': 'All',
        }];

      try {
        response = await upworkController.getCategories();
      } catch (err) {
        appStore.dispatch(overlayActions.close());
        dispatch(errorActions.show(this.getCategories));
        logsController.captureError(err);
      }

      _.each(response.categories, item => {
        categories.push({
          [item.title]: item.title
        });
      });

      dispatch(settingsActions.updateCategories(categories));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
