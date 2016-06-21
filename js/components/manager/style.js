'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFF'
  },
  cont: {
    padding: device.size(5),
    paddingLeft: device.size(13),
    flexDirection: 'row'
  },
  msiw: {
    marginRight: device.size(8),
    width: device.size(50),
    height: device.size(28),
    paddingTop: device.size(2),
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: 'rgba(51, 51, 51, .2)',
    borderRadius: device.size(2)
  },
  msiw_disabled: {
    opacity: .4
  },
  msitem: {
    fontSize: device.fontSize(20)
  },
  msiw_select_all: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  msiw_select_all_icon: {
    color: '#FFF'
  },
  separator: {
    height: 1,
    marginLeft: device.size(-8),
    marginRight: device.size(-8),
    backgroundColor: '#CCC'
  }
});

export default styles;
