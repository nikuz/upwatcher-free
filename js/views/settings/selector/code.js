'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import * as device from '../../../modules/device';
import styles from './style';

class Selector extends React.Component {
  render() {
    var props = this.props;
    return (
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay_gap} onPress={props.cancelHandler} />
        <Text style={styles.overlay_title}>{props.title.toUpperCase()}</Text>
        <View style={styles.select}>
          {props.content}
        </View>
        {device.isAndroid() ?
          <TouchableOpacity style={styles.overlay_gap} onPress={props.cancelHandler} />
          : null
        }
        {device.isIos() ?
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.btn, styles.btn_save]} onPress={props.saveHandler}>
              <Text style={[styles.btn_text, styles.btn_text_save]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_cancel]} onPress={props.cancelHandler}>
              <Text style={styles.btn_text}>Cancel</Text>
            </TouchableOpacity>
          </View>
          : null
        }
      </View>
    );
  }
}

Selector.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.node.isRequired,
  saveHandler: React.PropTypes.func.isRequired,
  cancelHandler: React.PropTypes.func.isRequired
};

export default Selector;
