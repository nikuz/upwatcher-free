'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Switch
} from 'react-native';
import styles from './style';

class Switcher extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler() {
    var props = this.props;
    props.changeHandler(props.name, !props.checked);
  }
  render() {
    return (
      <TouchableHighlight style={styles.wrap} onPress={this.changeHandler} underlayColor="#EDEDED">
        <View style={styles.cont}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Switch value={this.props.checked} onValueChange={this.changeHandler} />
        </View>
      </TouchableHighlight>
    );
  }
}

Switcher.propTypes = {
  changeHandler: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  relations: React.PropTypes.string
};

export default Switcher;
