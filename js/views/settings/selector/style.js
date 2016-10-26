'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../../modules/device';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: device.size(8),
    paddingBottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  overlay_gap: {
    flex: 1
  },
  overlay_title: {
    marginBottom: device.size(10),
    fontSize: device.fontSize(18),
    color: '#FFF',
    textAlign: 'center'
  },
  select: {
    backgroundColor: '#FFF',
    borderRadius: device.size(6)
  },
  buttons: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    height: device.size(46),
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: device.size(6),
    paddingTop: device.size(5),
    paddingBottom: device.size(5),
    marginTop: device.size(10),
    marginBottom: device.size(10),
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btn_cancel: {
    marginLeft: device.size(5)
  },
  btn_save: {
    marginRight: device.size(5)
  },
  btn_text: {
    color: '#999',
    alignSelf: 'center',
    fontSize: device.fontSize(22)
  },
  btn_text_save: {
    color: '#5CA838'
  }
});

export default styles;