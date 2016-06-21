'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: device.size(39),
    backgroundColor: '#FFF'
  },
  searchField: {
    height: device.size(38),
    paddingRight: device.size(50),
    paddingLeft: device.size(10),
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
  },
  cancel: {
    position: 'absolute',
    top: 0,
    height: device.size(39),
    paddingTop: device.size(5),
    paddingBottom: device.size(5),
    paddingLeft: device.size(10),
    paddingRight: device.size(10),
    borderLeftWidth: 1,
    borderLeftColor: '#CCC',
    backgroundColor: '#f9f9f9',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  cancel_text: {
    color: '#666',
    alignSelf: 'center',
    fontSize: device.fontSize(15)
  },
  separator: {
    backgroundColor: '#CCC',
    height: 1
  }
});

export default styles;