'use strict';

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as _ from 'underscore';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: true,
      visible: false,
      transparent: false,
      title: '',
      component: null,
      orientation: null
    };
    this.close = this.close.bind(this);
    this.openHandler = this.openHandler.bind(this);
    this.orientationChangedHandler = this.orientationChangedHandler.bind(this);
  }
  close(orientation) {
    this.setState({
      visible: false,
      title: '',
      component: null,
      navigator: true,
      transparent: false,
      orientation
    });
  }
  openHandler(options) {
    var opts = options || {};
    this.setState(_.extend(this.state, opts, {visible: true}));
  }
  orientationChangedHandler(orientation) {
    if (orientation !== 'UNKNOWN' && this.state.transparent && orientation !== this.state.orientation) {
      this.close(orientation);
    }
  }
  componentWillReceiveProps(nextProps) {
    var props = nextProps.overlay;
    this.setState({
      visible: props.status === 'open',
      component: props.component,
      navigator: props.navigator,
      transparent: props.transparent,
      title: props.title
    });
  }
  componentDidMount() {
    Orientation.getOrientation((err, orientation) => {
      this.setState({orientation});
    });
    Orientation.addOrientationListener(this.orientationChangedHandler);
  }
  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationChangedHandler);
  }
  render() {
    var state = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={state.transparent}
        visible={state.visible}
        style={styles.wrap}
        onRequestClose={this.close}
      >
        {state.navigator ?
          <View style={styles.navigator}>
            <TouchableOpacity style={styles.navigator_icon_wrap} onPress={this.close}>
              <Icon name="arrow-left" style={styles.navigator_icon}/>
            </TouchableOpacity>
            <View style={styles.navigator_title}>
              <Text style={styles.navigator_title_text}>{this.state.title}</Text>
            </View>
            <TouchableOpacity style={styles.navigator_icon_wrap} onPress={this.close}>
              <Icon name="times" style={[styles.navigator_icon, styles.navigator_icon_close]} />
            </TouchableOpacity>
          </View>
          : null
        }
        {this.state.component}
      </Modal>
    );
  }
}

Overlay.propTypes = {
  overlay: React.PropTypes.object.isRequired
};

export default Overlay;
