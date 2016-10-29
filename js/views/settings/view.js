'use strict';

import React from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import * as _ from 'underscore';
import * as EventManager from '../../modules/events';
import * as config from '../../config';
import * as settings from '../../modules/settings';
// import * as request from '../../modules/request';
import * as logs from '../../modules/logs';
import Icon from 'react-native-vector-icons/FontAwesome';
import List from './list/controller';
import Switcher from './switcher/code';
import Slider from './slider/code';
import Time from './time/code';
import styles from './style';

class Settings extends React.Component {
  // getCategoriesHandler = (callback) => {
  //   var cb = callback || _.noop,
  //     sData = this.state.data;
  //
  //   if (!sData.category2.values.length) {
  //     this.categoriesRequest = true;
  //     request.get({
  //       url: config.UPWORK_JOBS_CATEGORIES
  //     }, (err, response) => {
  //       if (err) {
  //         cb(err);
  //         logs.captureError(err);
  //       } else if (!response) {
  //         cb(null, null);
  //       } else if (this.categoriesRequest) {
  //         this.categoriesRequest = null;
  //         var categories = _.pluck(response.categories, 'title');
  //         categories.unshift('All');
  //         _.each(categories, item => {
  //           let category = {};
  //           category[item] = item;
  //           sData.category2.values.push(category);
  //         });
  //         settings.set(sData);
  //         cb(null, sData.category2.values);
  //       }
  //     });
  //   }
  // };
  handlerChange = (values) => {
    // values = values || [];
    // _.each(values, item => {
    //   this.state.data[item.name].value = item.value;
    // });
  };
  componentWillUnmount = () => {
    /*this.categoriesRequest = null;
    settings.get(null, (err, cur_settings) => {
      if (err) {
        return logs.captureError(err);
      }

      var needToUpdateCache = false,
        changed = false;

      _.each(cur_settings, (item, key) => {
        if (item.value !== this.state.data[key].value) {
          if (item.search) {
            needToUpdateCache = true;
          }
          changed = true;
        }
      });
      if (changed) {
        settings.set(this.state.data);
      }
      if (changed || needToUpdateCache) {
        EventManager.trigger('settingsSaved', {
          changed,
          needToUpdateCache
        });
      }
    });*/
  };
  render() {
    // if (!this.state.data) {
    //   return <ActivityIndicator color="#43AC12" size="large" />;
    // }

    var sData = this.props.settings;
    return (
      <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <List
          handler={this.handlerChange}
          title="Category"
          name="category2"
          value={sData.category2.value}
          values={sData.category2.values}
          // openHandler={this.getCategoriesHandler}
        />
        <Slider
          handler={this.handlerChange}
          title="Budget"
          name="budget"
          value={sData.budgetFrom.value}
        />
        <List
          handler={this.handlerChange}
          title="Job type"
          name="jobType"
          value={sData.jobType.value}
          values={sData.jobType.values}
        />
        <List
          handler={this.handlerChange}
          title="Duration"
          name="duration"
          value={sData.duration.value}
          values={sData.duration.values}
        />
        <List
          handler={this.handlerChange}
          title="Workload"
          name="workload"
          value={sData.workload.value}
          values={sData.workload.values}
        />
        <Switcher
          handler={this.handlerChange}
          title="Allow notifications"
          relations="notifications"
          name="notifyAllow"
          checked={sData.notifyAllow.value}
        />
        <List
          handler={this.handlerChange}
          title="Notify every"
          relations="notifications"
          name="notifyInterval"
          value={sData.notifyInterval.value}
          values={sData.notifyInterval.values}
          disabled={!sData.notifyAllow.value}
        />
        <Time
          handler={this.handlerChange}
          title="Do not disturb"
          relations="notifications"
          name="dnd"
          from={sData.dndFrom.value}
          to={sData.dndTo.value}
          disabled={!sData.notifyAllow.value}
        />
      </ScrollView>
    );
  }
}

Settings.propTypes = {
  settings: React.PropTypes.object.isRequired
};

export default Settings;