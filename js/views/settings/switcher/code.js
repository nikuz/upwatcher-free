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
    this.state = {
      checked: null
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler() {
    var checked = this.state.checked;
    if (checked === null) {
      checked = !this.props.checked;
    } else {
      checked = !checked;
    }
    this.props.changeHandler(this.props.name, checked);
  }
  render() {
    var checked = this.state.checked !== null ? this.state.checked : this.props.checked;
    return (
      <TouchableHighlight style={styles.wrap} onPress={this.changeHandler} underlayColor="#EDEDED">
        <View style={styles.cont}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Switch value={checked} onValueChange={this.changeHandler} />
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
