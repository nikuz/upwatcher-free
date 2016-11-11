'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';
import {ButtonBlue} from '../../components/buttons/code';
import styles from './style';

const positionOnScreen = 43,
  hiddenPosition = -100,
  animationDuration = 300;

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.error.visible,
      animTop: new Animated.Value(hiddenPosition),
      animOpacity: new Animated.Value(0)
    };
    this.onPressRetry = this.onPressRetry.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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
  };
  onPressRetry() {
    this.hide();
    if (this.props.error.retryHandler) {
      this.props.error.retryHandler();
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.error.visible,
    });
  }
  componentDidUpdate() {
    if (this.state.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
  render() {
    var state = this.state;
    return (
      <Animated.View
        style={[
          styles.wrap,
          {
            top: state.animTop,
            //opacity: state.animOpacity
          }
        ]}
      >
        <Text style={styles.text}>
          Something went wrong, please try again.
        </Text>
        <ButtonBlue
          text="Try again"
          onPress={this.onPressRetry}
        />
      </Animated.View>
    );
  }
}

Error.propTypes = {
  error: React.PropTypes.object.isRequired
};

export default Error;
