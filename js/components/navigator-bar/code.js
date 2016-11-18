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
import AppStore from '../../store';
import * as _ from 'underscore';
import * as device from '../../modules/device';
import * as notificationsActions from '../../actions/notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

import logo from '../../../images/logo.png';

class NavigatorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
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
    this.update = this.update.bind(this);
  }
  back() {
    if (this.state.leftButton) {
      this.props.backHandler();
      return true;
    }
    return false;
  }
  logoOnPress() {
    AppStore.dispatch(notificationsActions.show());
  }
  leftButtonRender(route) {
    if (route.backButton) {
      return (
        <TouchableOpacity style={styles.button} onPress={this.back}>
          <MaterialIcons name="arrow-back" style={styles.button_icon} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }
  titlePrepare(title, length) {
    length = length || [40, 20];
    var maxLength = device.isTablet() ? length[0] : length[1];
    if (title.length > maxLength) {
      title = title.substring(0, maxLength) + '...';
    }
    return title;
  }
  titleRender(route) {
    if (route.id === 'inbox') {
      return (
        <View style={styles.title}>
          <TouchableOpacity onPress={this.logoOnPress} style={styles.title_logo}>
            <Image
              style={styles.logo}
              source={logo}
            />
            <Text style={styles.free_text}>FREE</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      let titleText = this.titlePrepare(route.title);
      return (
        <View style={styles.title}>
          <Text style={styles.title_text}>{titleText}</Text>
        </View>
      );
    }
  }
  rightButtonRender(route) {
    if (route.rightButton) {
      return route.rightButton;
    } else {
      return null;
    }
  }
  update(opts = {}) {
    if (opts.id !== this.state.id) {
      return;
    }

    var newState = {};
    if (opts.rightButton) {
      newState.rightButton = this.rightButtonRender(opts);
    }
    this.setState(newState);
  }
  handleWillFocus(route) {
    var state = this.state,
      newState = {
        id: route.id,
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
  route: React.PropTypes.object.isRequired,
  backHandler: React.PropTypes.func.isRequired
};

export default NavigatorBar;
