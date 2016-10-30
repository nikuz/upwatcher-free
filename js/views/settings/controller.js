'use strict';

import * as React from 'react';
import * as _ from 'underscore';
import { connect } from 'react-redux';
import * as logs from '../../modules/logs';
import * as settingsModel from '../../models/settings';
import * as SettingsActions from '../../actions/settings';
import SettingsView from './view';

const mapStateToProps = function(state) {
  return {
    settings: state.settings
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    changeHandler: function(name, value) {
      dispatch(SettingsActions.change(name, value));
    },
    saveHandler: async function(sData) {
      var curSavedSettings = await settingsModel.get(),
        needToUpdateCache = false,
        changed = false;

      console.log(sData);
      console.log(curSavedSettings);

      _.each(curSavedSettings, (item, key) => {
        if (item.value !== sData[key].value) {
          if (item.search) {
            needToUpdateCache = true;
          }
          changed = true;
        }
      });
      console.log(changed);
      if (changed) {
        settingsModel.set(sData);
      }
      if (changed || needToUpdateCache) {
        // EventManager.trigger('settingsSaved', {
        //   changed,
        //   needToUpdateCache
        // });
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView);
