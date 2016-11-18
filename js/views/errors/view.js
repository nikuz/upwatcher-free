'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';
import {
  ButtonBlue,
  ButtonGray
} from '../../components/buttons/code';
import AppStore from '../../store';
import styles from './style';

const positionOnScreen = 43,
  positionOnScreenLow = 83,
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
    this.onPressOk = this.onPressOk.bind(this);
  }
  show() {
    var appState = AppStore.getState();
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: appState.state.id === 'inbox' ? positionOnScreenLow : positionOnScreen,
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
  onPressOk() {
    this.hide();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.error.visible
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
    var state = this.state,
      text,
      buttons;

    if (this.props.error.type === 'network') {
      text = 'Check your internet connection, then try again.';
      buttons = (
        <View style={styles.buttons}>
          <ButtonBlue
            text="Ok"
            onPress={this.onPressOk}
          />
        </View>
      );
    } else {
      text = 'Something went wrong, please try again.';
      buttons = (
        <View style={styles.buttons}>
          <ButtonBlue
            text="Try again"
            onPress={this.onPressRetry}
          />
          <View style={styles.gap} />
          <ButtonGray
            text="Cancel"
            onPress={this.hide}
          />
        </View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.wrap,
          {
            top: state.animTop,
            opacity: state.animOpacity
          }
        ]}
      >
        <Text style={styles.text}>{text}</Text>
        {buttons}
      </Animated.View>
    );
  }
}

Error.propTypes = {
  error: React.PropTypes.object.isRequired
};

export default Error;
