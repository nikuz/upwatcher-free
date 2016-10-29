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
    this.state = {
      disabled: this.props.disabled || false,
      opened: false,
      activeType: null,
      from: '',
      to: ''
    };
    this.getId = this.getId.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
  }
  getId() {
    var type = this.state.activeType;
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return `${this.props.name}${type}`;
  }
  openHandler(type) {
    this.setState({
      opened: true,
      activeType: type
    });
  }
  cancelHandler() {
    this.setState({
      opened: false
    });
  }
  saveHandler(date) {
    var hour = date.getHours(),
      minutes = date.getMinutes(),
      value;

    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    value = `${hour}:${minutes}`;

    this.props.handler([{
      name: this.getId(),
      value: value
    }]);
    var state = {
      opened: false
    };
    state[this.state.activeType] = value;
    this.setState(state);
  }
  componentDidUpdate = async () => {
    if (this.state.opened) {
      let props = this.props,
        state = this.state,
        value = (state[state.activeType] || props[state.activeType]).split(':');

      if (device.isAndroid()) {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: parseInt(value[0]),
          minute: parseInt(value[1]),
          is24Hour: false
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          let d = new Date();
          this.saveHandler(new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute));
        }
      }
    }
  };
  render() {
    var props = this.props,
      state = this.state,
      disabled = this.state.disabled,
      fromCont,
      toCont;

    fromCont = <Text style={styles.time_text}>{state.from || props.from}</Text>;
    toCont = <Text style={styles.time_text}>{state.to || props.to}</Text>;

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
  handler: React.PropTypes.func.isRequired,
  from: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool.isRequired
};

export default Time;