'use strict';

import React from 'react';
import {
  ScrollView
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
// import * as request from '../../modules/request';
import * as logs from '../../modules/logs';
import List from './list/code';
import Switcher from './switcher/code';
import Slider from './slider/code';
import Time from './time/code';
import styles from './style';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.categoriesRequest = null;
    // this.getCategoriesHandler = this.getCategoriesHandler.bind(this);
  }
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
  componentWillUnmount() {
    this.categoriesRequest = null;
    this.props.saveHandler(this.props.settings);
  };
  render() {
    var props = this.props,
      sData = props.settings;

    return (
      <ScrollView style={styles.wrap} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <List
          changeHandler={props.changeHandler}
          title="Category"
          name="category2"
          value={sData.category2.value}
          values={sData.category2.values}
          // openHandler={this.getCategoriesHandler}
        />
        <Slider
          changeHandler={props.changeHandler}
          title="Budget"
          name="budget"
          value={sData.budgetFrom.value}
        />
        <List
          changeHandler={props.changeHandler}
          title="Job type"
          name="jobType"
          value={sData.jobType.value}
          values={sData.jobType.values}
        />
        <List
          changeHandler={props.changeHandler}
          title="Duration"
          name="duration"
          value={sData.duration.value}
          values={sData.duration.values}
        />
        <List
          changeHandler={props.changeHandler}
          title="Workload"
          name="workload"
          value={sData.workload.value}
          values={sData.workload.values}
        />
        <Switcher
          changeHandler={props.changeHandler}
          title="Allow notifications"
          name="notifyAllow"
          checked={sData.notifyAllow.value}
        />
        <List
          changeHandler={props.changeHandler}
          title="Notify every"
          name="notifyInterval"
          value={sData.notifyInterval.value}
          values={sData.notifyInterval.values}
          disabled={!sData.notifyAllow.value}
        />
        <Time
          changeHandler={props.changeHandler}
          title="Do not disturb"
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
  settings: React.PropTypes.object.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
  saveHandler: React.PropTypes.func.isRequired
};

export default Settings;
