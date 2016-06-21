'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: device.size(4),
    paddingBottom: device.size(4),
    paddingLeft: device.size(7),
    paddingRight: device.size(7),
    backgroundColor: '#fde3e3',
    alignItems: 'center',
    shadowColor: '#666',
    shadowOpacity: 0.8,
    shadowRadius: device.size(2),
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    color: '#333'
  }
});

export default styles;
