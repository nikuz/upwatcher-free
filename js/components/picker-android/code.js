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
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class PickerAndroid extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var values = deepClone(props.values);
    _.each(values, function(item) {
      if (_.keys(item)[0] == props.value) {
        item.current = true;
      }
    });
    this.state = {
      values,
      curValue: props.value,
      dataSource: this.ds.cloneWithRows(values)
    };
    this.renderRow = this.renderRow.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(value) {
    this.props.onValueChange(value);
    var values = this.state.values;
    _.each(values, function(item) {
      item.current = _.keys(item)[0] === value;
    });
    this.setState({
      values,
      curValue: value,
      dataSource: this.ds.cloneWithRows(values)
    });
  }
  renderRow(item) {
    var key = _.keys(item)[0],
      value = _.values(item)[0];

    return (
      <View>
        <TouchableHighlight
          style={styles.item}
          onPress={this.onValueChange.bind(null, key)}
          underlayColor="#ddf3d3"
        >
          <View style={styles.item_cont}>
            <View style={styles.item_cont_text_wrap}>
              <Text style={styles.item_text}>{value}</Text>
            </View>
            <View style={styles.item_cont_icon}>
              {item.current ?
                <Icon name="check" style={styles.item_icon} />
                : null
              }
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    var style = {
      maxHeight: device.dimensions().height - 200
    };

    return (
      <ListView
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
