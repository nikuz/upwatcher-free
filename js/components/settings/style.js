'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    marginTop: device.size(65),
    backgroundColor: '#FFF'
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13)
  },
  item_disabled: {
    opacity: .4
  },
  item_title: {
    fontSize: device.fontSize(18),
    marginBottom: device.size(3)
  },
  item_value: {
    fontSize: device.fontSize(14),
    color: '#999'
  }
});

export default styles;