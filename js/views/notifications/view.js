'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import * as config from '../../config';
import styles from './style';

import GooglePlayBadge from '../../../images/gpbadge.png';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.notifications.visible
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  show() {
    this.props.show(this.renderCont());
  }
  hide() {
    this.props.hide();
  }
  onPress() {
    this.props.onPress();
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
  renderCont() {
    var button = (
      <TouchableOpacity style={styles.badge} onPress={this.onPress}>
        <Image
          style={styles.badge_icon}
          source={GooglePlayBadge}
        />
      </TouchableOpacity>
    );
    switch (this.props.notifications.id) {
      case 'settings':
        return (
          <View style={styles.wrap}>
            <TouchableOpacity style={styles.overlay_gap} onPress={this.hide} />
            <View style={styles.cont}>
              <Text style={styles.text}>
                This option available only in the full version of&nbsp;
                <Text style={styles.link_text} onPress={this.onPress}>
                  {config.APP_NAME}
                </Text>
              </Text>
              {button}
            </View>
            <TouchableOpacity style={styles.overlay_gap} onPress={this.hide} />
          </View>
        );
      default:
        return (
          <View style={styles.wrap}>
            <TouchableOpacity style={styles.overlay_gap} onPress={this.hide} />
            <View style={styles.cont}>
              <Text style={styles.text}>
                Get the full version of&nbsp;
                <Text style={styles.link_text} onPress={this.onPress}>
                  {config.APP_NAME}
                </Text>
              </Text>
              <View style={styles.options}>
                <Text style={styles.options_text}> - notifications about new work</Text>
                <Text style={styles.options_text}> - no ads</Text>
              </View>
              {button}
            </View>
            <TouchableOpacity style={styles.overlay_gap} onPress={this.hide} />
          </View>
        );
    }
  }
  render() {
    return null;
  }
}

Notifications.propTypes = {
  notifications: React.PropTypes.object.isRequired,
  show: React.PropTypes.func.isRequired,
  hide: React.PropTypes.func.isRequired,
  onPress: React.PropTypes.func.isRequired
};

export default Notifications;
