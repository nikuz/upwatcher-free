'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../modules/device';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    flex: 1,
    paddingTop: device.size(55),
    backgroundColor: '#6FDA44'
  },
  nav_bar: {
    height: device.size(40)
  },
  title: {
    height: device.size(40),
    alignItems: 'center'
  },
  title_text: {
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    fontWeight: 'bold',
    lineHeight: device.fontSize(34)
  },
  logo: {
    width: device.size(138),
    height: device.size(30)
  },
  icon_wrap: {
    flex: 1,
    height: device.size(40),
    paddingTop: device.size(10),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  icon: {
    fontSize: device.fontSize(26),
    color: '#FFF'
  }
});

export default styles;
