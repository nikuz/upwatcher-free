'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  BackAndroid
} from 'react-native';
import * as _ from 'underscore';
import * as device from '../../modules/device';
import * as InteractionManager from '../../modules/interactions';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import logo from '../../../images/logo.png';

class NavigatorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftButton: null,
      prevLeftButton: null,
      title: null,
      prevTitle: null,
      rightButton: null,
      prevRightButton: null,
      transitionDirection: null,
      animShiftHide: new Animated.Value(0),
      animShiftShow: null,
      animOpacityHide: new Animated.Value(1),
      animOpacityShow: new Animated.Value(0),
      shiftValue: 50,
      animDuration: 400
    };
    this.back = this.back.bind(this);
    this.leftButtonRender = this.leftButtonRender.bind(this);
    this.titleRender = this.titleRender.bind(this);
  }
  back() {
    if (this.state.leftButton) {
      this.props.navigator.pop();
      return true;
    }
  }
  leftButtonRender(route) {
    if (route.backButton) {
      return (
        <TouchableOpacity style={styles.button} onPress={this.back}>
          <Icon name="arrow-left" style={styles.button_icon} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
  titleRender(route) {
    if (route.id === 'inbox') {
      return (
        <View style={styles.title}>
          <Image
            style={styles.logo}
            source={logo}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.title}>
          <Text style={styles.title_text}>{route.title}</Text>
        </View>
      );
    }
  }
  rightButtonRender(route) {
    if (route.id !== 'settings') {
      return (
        <TouchableOpacity style={styles.button} onPress={route.onRightButtonClick}>
          <Icon name="sliders" style={styles.button_icon} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
  handleWillFocus(route) {
    var state = this.state,
      newState = {
        leftButton: this.leftButtonRender(route),
        prevLeftButton: state.leftButton,
        title: this.titleRender(route),
        prevTitle: state.title,
        rightButton: this.rightButtonRender(route),
        prevRightButton: state.rightButton
      };

    this.setState(newState);
  }
  onAnimationStart(fromIndex, toIndex) {
    var state = this.state,
      shiftValue = state.shiftValue,
      newState = {
        animOpacityShow: new Animated.Value(0),
        animOpacityHide: new Animated.Value(1)
      };

    if (fromIndex < toIndex) {
      _.extend(newState, {
        transitionDirection: 'left',
        animShiftShow: new Animated.Value(shiftValue),
        animShiftHide: new Animated.Value(0)
      });
    } else {
      _.extend(newState, {
        transitionDirection: 'right',
        animShiftShow: new Animated.Value(-shiftValue),
        animShiftHide: new Animated.Value(0)
      });
    }
    this.setState(newState);
  }
  updateProgress(progress) {
    var state = this.state,
      shiftValue = state.shiftValue,
      curShift = shiftValue - (shiftValue * (1 - progress));

    state.animOpacityShow.setValue(progress);
    state.animOpacityHide.setValue(1 - progress);
    if (state.transitionDirection === 'left') {
      state.animShiftHide.setValue(-curShift);
      state.animShiftShow.setValue(shiftValue * (1 - progress));
    } else {
      state.animShiftHide.setValue(curShift);
      state.animShiftShow.setValue(-(shiftValue * (1 - progress)));
    }
  }
  onAnimationEnd() {
    InteractionManager.clearInteractionHandle();
    this.setState({
      transitionDirection: null,
      prevTitle: null,
      prevLeftButton: null,
      prevRightButton: null
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    var state = this.state;
    return state.transitionDirection !== nextState.transitionDirection
      || state.title !== nextState.title
      || state.rightButton !== nextState.rightButton;
  }
  componentWillMount() {
    var props = this.props;
    this.setState({
      curRoute: props.route,
      leftButton: this.leftButtonRender(props.route),
      title: this.titleRender(props.route),
      rightButton: this.rightButtonRender(props.route)
    });
  }
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.back);
  }
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.back);
  }
  render() {
    var state = this.state,
      cont = (
        <View>
          {state.title}
          <View style={styles.left_button_container}>
            {state.leftButton}
          </View>
          <View style={styles.right_button_container}>
            {state.rightButton}
          </View>
        </View>
      ),
      contPrev,
      width;

    if (state.transitionDirection) {
      contPrev = (
        <View>
          {state.prevTitle}
          <View style={styles.left_button_container}>
            {state.prevLeftButton}
          </View>
          <View style={styles.right_button_container}>
            {state.prevRightButton}
          </View>
        </View>
      );
      width = device.dimensions().width;
    }

    return (
      <View style={styles.navbar}>
        {state.transitionDirection ?
          <View>
            <Animated.View
              style={[
                styles.navbar_animated,
                {
                  width: width,
                  left: state.animShiftHide,
                  opacity: state.animOpacityHide
                }
              ]}
              renderToHardwareTextureAndroid={true}
            >
              {contPrev}
            </Animated.View>
            <Animated.View
              style={[
                styles.navbar_animated,
                {
                  width: width,
                  left: state.animShiftShow,
                  opacity: state.animOpacityShow
                }
              ]}
              renderToHardwareTextureAndroid={true}
            >
              {cont}
            </Animated.View>
          </View>
          :
          cont
        }
      </View>
    );
  }
}

NavigatorBar.propTypes = {
  navigator: React.PropTypes.object,
  route: React.PropTypes.object.isRequired
};

export default NavigatorBar;
