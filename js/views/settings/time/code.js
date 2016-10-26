'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  DatePickerIOS
} from 'react-native';
import Selector from '../selector/code';
import * as EventManager from '../../../modules/events';
import commonStyles from '../style';
import styles from './style';

class Time extends React.Component {
  state = {
    disabled: this.props.disabled || false,
    opened: false,
    activeType: null,
    from: '',
    to: '',
    tempValue: null
  };
  static propTypes = {
    handler: React.PropTypes.func.isRequired,
    from: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired
  };
  getDate = () => {
    if (this.state.tempValue) {
      return this.state.tempValue;
    } else {
      var type = this.state.activeType,
        value = this.state[type] || this.props[type],
        date = new Date();

      value = value.split(':');
      date = date.setHours(Number(value[0]), Number(value[1]));

      return new Date(date);
    }
  };
  getId = () => {
    var type = this.state.activeType;
    type = type.charAt(0).toUpperCase() + type.slice(1);
    return `${this.props.name}${type}`;
  };
  openHandler = (type) => {
    this.setState({
      opened: true,
      activeType: type
    });
  };
  changeHandler = (value) => {
    this.setState({
      tempValue: value
    });
  };
  saveHandler = () => {
    var date = this.state.tempValue,
      hour = date.getHours(),
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
      tempValue: null,
      opened: false
    };
    state[this.state.activeType] = value;
    this.setState(state);
  };
  cancelHandler = () => {
    this.setState({
      tempValue: null,
      opened: false
    });
  };
  relationCheckHandler = (options) => {
    var opts = options || {};
    if (this.props.relations && this.props.relations === opts.relations) {
      this.setState({
        disabled: !opts.checked
      });
    }
  };
  componentDidUpdate() {
    if (this.state.opened) {
      let props = this.props,
        content = (
          <View style={styles.datepicker_wrap}>
            <DatePickerIOS
              mode="time"
              date={this.getDate()}
              onDateChange={this.changeHandler}
            />
          </View>
        );

      EventManager.trigger('overlayOpen', {
        navigator: false,
        transparent: true,
        component: <Selector
          title={`${props.title} (${this.state.activeType})`}
          content={content}
          saveHandler={this.saveHandler}
          cancelHandler={this.cancelHandler}
        />
      });
    } else {
      EventManager.trigger('overlayClose');
    }
  }
  componentDidMount = () => {
    EventManager.on('stngSwitcherChange', this.relationCheckHandler);
  };
  componentWillUnmount = () => {
    EventManager.off('stngSwitcherChange', this.relationCheckHandler);
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
              <TouchableHighlight style={styles.time} onPress={this.openHandler.bind(null, 'from')} underlayColor="#EDEDED">
                {fromCont}
              </TouchableHighlight>
            }
            <Text style={styles.time_sep}>&mdash;</Text>
            {disabled ?
              <View style={styles.time}>
                {toCont}
              </View> :
              <TouchableHighlight style={styles.time} onPress={this.openHandler.bind(null, 'to')} underlayColor="#EDEDED">
                {toCont}
              </TouchableHighlight>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default Time;