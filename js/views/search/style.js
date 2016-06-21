'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  field: {
    height: device.size(device.isAndroid() ? 40 : 35),
    padding: 0,
    paddingRight: device.size(50),
    paddingLeft: device.size(10),
    backgroundColor: '#FFF',
    textAlignVertical: 'center',
    color: '#333',
    fontSize: device.size(15)
  },
  submit_wrap: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  submit: {
    width: device.size(50),
    height: device.size(38),
    paddingTop: device.size(8),
    fontSize: device.fontSize(20),
    color: '#999',
    textAlign: 'center'
  },
  submit_loader: {
    position: 'absolute',
    right: device.size(16),
    top: device.size(9)
  }
});

export default styles;