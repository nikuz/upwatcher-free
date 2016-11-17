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
      if (name === 'notifyInterval') {
        value = Number(value);
      }
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
        responseErr,
        categories = [];

      try {
        response = await upworkController.getCategories();
      } catch (err) {
        responseErr = err;
      }

      if (response && response.categories) {
        _.each(response.categories, item => {
          categories.push({
            [item.title]: item.title
          });
        });
      }

      if (categories.length) {
        categories.unshift({
          'All': 'All',
        });
        dispatch(settingsActions.updateCategories(categories));
      } else {
        dispatch(overlayActions.close());
        dispatch(errorActions.show(this.getCategories.bind(this)));
        if (responseErr) {
          logsController.captureError(responseErr);
        } else {
          logsController.captureMessage('Settings `getCategories` empty response');
        }
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
