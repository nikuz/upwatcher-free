'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

const positionOnScreen = 43,
  hiddenPosition = -100,
  animationDuration = 300;

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.notifications.visible,
      animTop: new Animated.Value(hiddenPosition),
      animOpacity: new Animated.Value(0)
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  show() {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: positionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 1
      })
    ]).start();
  }
  hide() {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: hiddenPosition,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 0
      })
    ]).start();
  }
  onPress() {
    this.hide();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.notifications.visible
    });
  }
  componentDidUpdate() {
    if (this.state.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
  componentDidMount() {
    this.props.registration();
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.wrap,
          {
            top: this.state.animTop,
            opacity: this.state.animOpacity
          }
        ]}
      >
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text style={styles.text}>
            <MaterialIcons name="arrow-upward" style={styles.icon} /> Show new jobs
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.object.isRequired,
  registration: React.PropTypes.func.isRequired,
};

export default Notifications;
