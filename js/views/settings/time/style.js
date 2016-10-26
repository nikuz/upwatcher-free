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
    fontSize: device.fontSize(18),
    marginTop: device.size(3)
  },
  time_wrap: {
    flexDirection: 'row'
  },
  time: {
    paddingTop: device.size(5),
    paddingBottom: device.size(5),
    paddingLeft: device.size(8),
    paddingRight: device.size(8),
    borderWidth: 1,
    borderColor: '#EDEDED'
  },
  time_sep: {
    paddingTop: device.size(5),
    paddingBottom: device.size(5),
    paddingLeft: device.size(7),
    paddingRight: device.size(7)
  },
  time_text: {
    fontSize: device.fontSize(16)
  },
  datepicker_wrap: {
    alignItems: 'center'
  }
});

export default styles;