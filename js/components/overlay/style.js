'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    flex: 1
  },
  navigator: {
    paddingTop: device.size(30),
    paddingBottom: device.size(10),
    flexDirection: 'row',
    backgroundColor: '#6FDA44'
  },
  navigator_icon_wrap: {
    width: device.size(50),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  navigator_icon: {
    fontSize: device.fontSize(26),
    color: '#FFF'
  },
  navigator_icon_close: {
    color: '#6FDA44'
  },
  navigator_title: {
    flex: 1,
    alignItems: 'center'
  },
  navigator_title_text: {
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(26)
  },
  cont: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

export default styles;