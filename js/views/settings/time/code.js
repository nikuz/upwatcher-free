'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  DatePickerIOS,
  TimePickerAndroid
} from 'react-native';
import * as device from '../../../modules/device';
import commonStyles from '../style';
import styles from './style';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.getId = this.getId.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }
  getId(type) {
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return `${this.props.name}${type}`;
  }
  saveHandler(type, hour, minute) {
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }

    this.props.changeHandler(this.getId(type), `${hour}:${minute}`);
  }
  openHandler = async (type) => {
    let props = this.props,
      value = props[type].split(':');

    if (device.isAndroid()) {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: parseInt(value[0]),
        minute: parseInt(value[1]),
        is24Hour: false
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.saveHandler(type, hour, minute);
      }
    }
  };
  render() {
    var props = this.props,
      disabled = props.disabled,
      fromCont,
      toCont;

    fromCont = <Text style={styles.time_text}>{props.from}</Text>;
    toCont = <Text style={styles.time_text}>{props.to}</Text>;

    return (
      <View style={styles.wrap}>
        <View style={[styles.cont, disabled ? commonStyles.item_disabled : null]}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.time_wrap}>
            {disabled ?
              <View style={styles.time}>
                {fromCont}
              </View> :
              <TouchableHighlight style={styles.time} onPress={this.openHandler.bind(this, 'from')} underlayColor="#EDEDED">
                {fromCont}
              </TouchableHighlight>
            }
            <Text style={styles.time_sep}>&mdash;</Text>
            {disabled ?
              <View style={styles.time}>
                {toCont}
              </View> :
              <TouchableHighlight style={styles.time} onPress={this.openHandler.bind(this, 'to')} underlayColor="#EDEDED">
                {toCont}
              </TouchableHighlight>
            }
          </View>
        </View>
      </View>
    );
  }
}

Time.propTypes = {
  changeHandler: React.PropTypes.func.isRequired,
  from: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired
};

export default Time;