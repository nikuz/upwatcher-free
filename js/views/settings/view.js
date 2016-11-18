'use strict';

import React from 'react';
import {
  ScrollView
} from 'react-native';
import List from './list/code';
import Switcher from './switcher/code';
import Slider from './slider/code';
import Time from './time/code';
import styles from './style';

class Settings extends React.Component {
  componentWillUnmount() {
    this.props.save(this.props.settings);
  };
  render() {
    var props = this.props,
      sData = props.settings;

    return (
      <ScrollView style={styles.wrap}>
        <List
          changeHandler={props.change}
          title="Category"
          name="category2"
          value={sData.category2.value}
          values={sData.category2.values}
          getCategories={props.getCategories}
        />
        <Slider
          changeHandler={props.change}
          title="Budget"
          name="budget"
          value={sData.budgetFrom.value}
        />
        <List
          changeHandler={props.change}
          title="Job type"
          name="jobType"
          value={sData.jobType.value}
          values={sData.jobType.values}
        />
        <List
          changeHandler={props.change}
          title="Duration"
          name="duration"
          value={sData.duration.value}
          values={sData.duration.values}
        />
        <List
          changeHandler={props.change}
          title="Workload"
          name="workload"
          value={sData.workload.value}
          values={sData.workload.values}
        />
        <Switcher
          changeHandler={props.changeNotifications}
          title="Notifications"
          name="notifyAllow"
          checked={sData.notifyAllow.value}
        />
        <List
          changeHandler={props.change}
          title="Notify every"
          name="notifyInterval"
          value={sData.notifyInterval.value}
          values={sData.notifyInterval.values}
          disabled={!sData.notifyAllow.value}
        />
        <Time
          changeHandler={props.change}
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
  change: React.PropTypes.func.isRequired,
  changeNotifications: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  getCategories: React.PropTypes.func.isRequired
};

export default Settings;
