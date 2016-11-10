'use strict';

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Payment extends React.Component {
  render() {
    var props = this.props,
      text = 'Unverified',
      unverified = true,
      style = [styles.cont];

    if (props.status === 'VERIFIED') {
      text = 'Verified';
      unverified = false;
    }

    if (props.style) {
      if (props.style instanceof Array) {
        style = style.concat(props.style);
      } else {
        style.push(props.style);
      }
    }

    return (
      <View style={style}>
        <MaterialIcons
          name="verified-user"
          style={[styles.icon, unverified && styles.unverified]}
        />
        <Text
          style={[styles.text, unverified && styles.unverified]}
        >
          Payment {text}
        </Text>
      </View>
    );
  }
}

Payment.propTypes = {
  status: React.PropTypes.string,
  style: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.number
  ])
};

export default Payment;