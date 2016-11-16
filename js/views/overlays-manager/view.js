'use strict';

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import * as _ from 'underscore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    var options = props.overlay;
    this.state = {
      animationType: options.animationType,
      navigator: options.navigator,
      visible: options.visible,
      transparent: options.transparent,
      title: options.title,
      component: null
    };
    this.onShow = this.onShow.bind(this);
    this.close = this.close.bind(this);
    this.openHandler = this.openHandler.bind(this);
  }
  onShow() {
    this.setState({
      component: this.props.overlay.component
    });
  }
  close() {
    this.setState({
      visible: false,
      component: null
    });
  }
  openHandler(options) {
    var opts = options || {};
    this.setState(_.extend(this.state, opts, {visible: true}));
  }
  componentWillReceiveProps(nextProps) {
    var props = nextProps.overlay;
    this.setState({
      visible: props.visible,
      navigator: props.navigator,
      transparent: props.transparent,
      title: props.title,
      animationType: props.animationType,
      component: (!props.visible || !this.state.visible) ? null : props.component
    });
  }
  render() {
    var state = this.state,
      loadingCont;

    loadingCont = (
      <View style={styles.loading_cont}>
        <ActivityIndicator size="large" style={styles.loading} />
      </View>
    );

    return (
      <Modal
        animationType={state.animationType}
        transparent={state.transparent}
        visible={state.visible}
        style={styles.wrap}
        onRequestClose={this.close}
        onShow={this.onShow}
      >
        {state.navigator ?
          <View style={styles.navigator}>
            <TouchableOpacity style={styles.navigator_icon_wrap} onPress={this.close}>
              <MaterialIcons name="arrow-back" style={styles.navigator_icon}/>
            </TouchableOpacity>
            <View style={styles.navigator_title}>
              <Text style={styles.navigator_title_text}>{this.state.title}</Text>
            </View>
            <TouchableOpacity style={styles.navigator_icon_wrap} onPress={this.close}>
              <MaterialIcons name="menu" style={[styles.navigator_icon, styles.navigator_icon_close]} />
            </TouchableOpacity>
          </View>
          : null
        }
        {this.state.component || loadingCont}
      </Modal>
    );
  }
}

Overlay.propTypes = {
  overlay: React.PropTypes.object.isRequired
};

export default Overlay;
