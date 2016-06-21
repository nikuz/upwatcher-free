'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: device.size(37),
    paddingTop: device.size(5),
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  button: {
    alignSelf: 'center',
    paddingTop: device.size(4),
    paddingBottom: device.size(4),
    paddingLeft: device.size(7),
    paddingRight: device.size(7),
    borderRadius: device.size(4),
    backgroundColor: '#b1fb94',
    shadowColor: '#333',
    shadowOpacity: 0.8,
    shadowRadius: device.size(2),
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    color: '#30621b'
  },
  icon: {
    position: 'relative'
  }
});

export default styles;
