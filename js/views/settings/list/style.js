'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../../modules/device';

const styles = StyleSheet.create({
  waiting: {
    padding: device.size(15)
  },
  error: {
    padding: device.size(10),
    alignItems: 'center'
  },
  error_text: {
    color: '#F00',
    fontSize: device.fontSize(18),
    marginBottom: device.size(5),
    textAlign: 'center'
  },
  retry_btn: {
    marginTop: device.size(5),
    padding: device.size(8),
    paddingLeft: device.size(12),
    paddingRight: device.size(12),
    borderRadius: device.size(3),
    backgroundColor: '#5bbc2e',
    alignItems: 'center'
  },
  retry_btn_text: {
    color: '#FFF'
  }
});

export default styles;