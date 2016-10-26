'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    padding: device.size(13)
  },
  cont: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    marginTop: device.size(5),
    fontSize: device.fontSize(18)
  }
});

export default styles;