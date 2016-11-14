'use strict';

import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import * as _ from 'underscore';
import {deepClone} from '../../modules/object';
import * as device from '../../modules/device';
import styles from './style';

class PickerAndroid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var values = deepClone(props.values);
    _.each(values, function(item) {
      if (_.keys(item)[0] == props.value) {
        item.current = true;
      }
    });
    this.state = {
      values,
      curValue: props.value,
      dataSource: ds.cloneWithRows(values)
    };
    this.renderRow = this.renderRow.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }
  onValueChange(value) {
    this.props.onValueChange(value);
  }
  scrollTo() {
    var selectedItemIndex = _.findIndex(this.state.values, {
      current: true
    });
    var itemHeight = 45;

    this.refs.container.scrollTo({
      x: 0,
      y: selectedItemIndex * itemHeight - 9 * itemHeight,
      animated: false
    });
  }
  renderRow(item) {
    var key = _.keys(item)[0],
      value = _.values(item)[0];

    return (
      <TouchableHighlight
        style={styles.item}
        onPress={this.onValueChange.bind(null, key)}
        underlayColor="#f9f9f9"
      >
        <View style={styles.cont}>
          <Text style={[styles.text, item.current && styles.text_current]}>
            {value}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    var style = {
      maxHeight: device.dimensions().height - 200
    };

    return (
      <ListView
        onLayout={this.scrollTo}
        ref="container"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={[styles.wrap, style]}
      />
    );
  }
}

PickerAndroid.propTypes = {
  values: React.PropTypes.array.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  onValueChange: React.PropTypes.func.isRequired
};

export default PickerAndroid;
