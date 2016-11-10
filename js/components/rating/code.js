'use strict';

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Rating extends React.Component {
  render() {
    var props = this.props,
      text = 'No Ratings Yet',
      style = [styles.cont];

    if (props.feedback) {
      text = `${props.feedback.toFixed(1)} (${props.reviews_count})`;
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
          name="star"
          style={[styles.icon, !props.feedback && styles.icon_gray]}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

Rating.propTypes = {
  feedback: React.PropTypes.number,
  reviews_count: React.PropTypes.number,
  style: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.number
  ])
};

export default Rating;