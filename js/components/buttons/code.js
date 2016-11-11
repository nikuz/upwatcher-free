'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import * as _ from 'underscore';
import styles from './style';

class Button extends Component {
  render() {
    var props = this.props,
      buttonStyle = [
        styles.button,
        styles[props.type]
      ];

    return (
      <TouchableHighlight
        style={buttonStyle}
        onPress={props.onPress}
        underlayColor={props.underlayColor}
      >
        <Text style={styles.text}>{props.text}</Text>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  underlayColor: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  text: React.PropTypes.string.isRequired
};

class ButtonGreen extends Component {
  render() {
    var props = _.extend({
      type: 'green',
      underlayColor: '#69cb3c'
    }, this.props);

    return <Button {...props} />;
  }
}

class ButtonBlue extends Component {
  render() {
    var props = _.extend({
      type: 'blue',
      underlayColor: '#0eb8f7'
    }, this.props);

    return <Button {...props} />;
  }
}

class ButtonGray extends Component {
  render() {
    var props = _.extend({
      type: 'gray',
      underlayColor: '#CCC'
    }, this.props);

    return <Button {...props} />;
  }
}

export {
  ButtonGreen,
  ButtonBlue,
  ButtonGray
};
