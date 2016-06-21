'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gap: {
    height: device.size(38)
  },
  foldersContainer: {
    flex: 1,
    marginTop: device.size(65),
    backgroundColor: '#FFF'
  },
  navigator: {
    flex: 1,
    backgroundColor: '#6FDA44'
  },
  title: {
    backgroundColor: '#6FDA44',
    height: device.size(45)
  },
  title_blank: {
    width: 2000,
    fontSize: device.fontSize(18),
    lineHeight: device.fontSize(32)
  },
  title_plain: {
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(34)
  },
  title_item: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: device.size(6),
    fontSize: device.fontSize(18),
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: device.fontSize(27)
  },
  title_folder: {
    top: device.size(-100)
  },
  title_logo: {
    lineHeight: device.fontSize(32)
  },
  logo: {
    width: device.size(138),
    height: device.size(30)
  },
  crumbIconPlaceholder: {
    flex: 1,
    height: device.size(145),
    paddingTop: device.size(10),
    paddingRight: device.size(10),
    paddingLeft: device.size(10)
  },
  crumbIcon: {
    fontSize: device.fontSize(26),
    color: '#FFF'
  }
});

export default styles;
