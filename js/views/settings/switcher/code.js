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
    var props = this.props;
    return (
      <TouchableHighlight style={styles.wrap} onPress={this.changeHandler} underlayColor="#EDEDED">
        <View style={styles.cont}>
          <Text style={styles.title}>{props.title}</Text>
          <Switch
            value={props.checked}
            onValueChange={this.changeHandler}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

Switcher.propTypes = {
  changeHandler: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  checked: React.PropTypes.bool.isRequired,
  relations: React.PropTypes.string
};

export default Switcher;
