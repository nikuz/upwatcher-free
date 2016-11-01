'use strict';

import React from 'react';
import {
  View,
  Animated,
  Text
} from 'react-native';
import * as _ from 'underscore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class FeedsListBlank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animShiftTopValue: 0,
      animShiftMax: -3,
      animShiftTop: new Animated.Value(0),
    };
    this.startAnimation = this.startAnimation.bind(this);
  }
  startAnimation() {
    var state = this.state,
      toValue = state.animShiftTopValue < 0 ? 0 : state.animShiftMax;

    Animated.timing(
      this.state.animShiftTop,
      {toValue}
    ).start(() => {
      this.startAnimation();
    });

    this.setState({
      animShiftTopValue: toValue
    });
  }
  shouldComponentUpdate = () => false;
  componentDidMount() {
    this.startAnimation();
  }
  render() {
    return (
      <View style={styles.blank_wrap}>
        <Animated.View
          style={{
            transform: [{
              translateY: this.state.animShiftTop
            }]
          }}
          renderToHardwareTextureAndroid={true}
        >
          <MaterialIcons name="arrow-upward" style={styles.blank_icon} />
        </Animated.View>
        <Text style={styles.blank_text}>Please write your query </Text>
        <Text style={styles.blank_text}>to the field above</Text>
      </View>
    );
  }
}

class FeedsListManager extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {!this.props.feeds.length ?
          <FeedsListBlank />
          :
          <View></View>
        }
      </View>
    );
  }
}

FeedsListManager.propTypes = {
  feeds: React.PropTypes.array.isRequired
};

export default FeedsListManager;
