'use strict';

import React from 'react';
import {
  View,
  Text,
  PickerIOS,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as _ from 'underscore';
import Selector from '../selector/code';
import * as EventManager from '../../../modules/events';
import commonStyles from '../style';
import styles from './style';

class List extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    values: React.PropTypes.array.isRequired,
    handler: React.PropTypes.func.isRequired,
    openHandler: React.PropTypes.func
  };
  state = {
    disabled: this.props.disabled || false,
    opened: false,
    err: null,
    values: [],
    selectedValue: null,
    tempValue: null
  };
  openHandler = () => {
    this.setState({
      opened: true
    });
    var openHandler = this.props.openHandler;
    if (openHandler && !this.props.values.length) {
      openHandler((err, response) => {
        var state = {
          err: null
        };
        if (err) {
          state.err = err;
        } else {
          response = response || [];
          _.extend(state, {
            values: response,
            selectedValue: _.keys(response[0])[0]
          });
        }
        this.setState(state);
      });
    }
  };
  downloadAgainHandler = () => {
    this.setState({
      err: null,
      values: []
    });
    this.openHandler();
  };
  changeHandler = (value) => {
    this.setState({
      tempValue: value
    });
  };
  saveHandler = () => {
    var value = this.state.tempValue;
    this.setState({
      selectedValue: value,
      tempValue: null,
      opened: false
    });
    if (value) {
      this.props.handler([{
        name: this.props.name,
        value: value
      }]);
    }
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
        values = props.values,
        value = this.state.selectedValue || props.value,
        selectorContent;

      if (!values.length) {
        values = this.state.values;
      }
      if (this.state.err) {
        selectorContent = (
          <View style={styles.error}>
            <Text style={styles.error_text}>Something went wrong, please try again</Text>
            <TouchableHighlight style={styles.retry_btn} onPress={this.downloadAgainHandler} underlayColor="#69cb3c">
              <Text style={styles.retry_btn_text}>Try again</Text>
            </TouchableHighlight>
          </View>
        );
      } else if (!values.length) {
        selectorContent = (
          <View style={styles.waiting}>
            <ActivityIndicator color="#43AC12" size="large" />
          </View>
        );
      } else if (this.state.opened) {
        selectorContent = (
          <PickerIOS selectedValue={this.state.tempValue || value} onValueChange={this.changeHandler}>
            {values.map(item => {
              var key = _.keys(item)[0],
                value = _.values(item)[0];

              return (
                <PickerIOS.Item
                  key={key}
                  value={value}
                  label={value}
                />
              );
            })}
          </PickerIOS>
        );
      }
      EventManager.trigger('overlayOpen', {
        navigator: false,
        transparent: true,
        component: <Selector
          title={props.title}
          content={selectorContent}
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
      value = this.state.selectedValue || props.value,
      previewCont,
      disabled = this.state.disabled;

    previewCont = (
      <View style={disabled ? commonStyles.item_disabled : null}>
        <Text style={commonStyles.item_title}>{props.title}</Text>
        <Text style={commonStyles.item_value}>{value}</Text>
      </View>
    );

    return (
      <View>
        {disabled ?
          <View style={commonStyles.item}>{previewCont}</View>
          :
          <TouchableHighlight style={commonStyles.item} onPress={this.openHandler} underlayColor="#EDEDED">
            {previewCont}
          </TouchableHighlight>
        }
      </View>
    );
  }
}

export default List;
