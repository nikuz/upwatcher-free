'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  tabs: {
    height: device.size(50),
    paddingLeft: device.size(20),
    paddingRight: device.size(20),
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  },
  tab_item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: device.size(7)
  },
  tab_cont: {
    alignItems: 'center'
  },
  icon: {
    fontSize: device.fontSize(22),
    marginBottom: 2,
    color: '#585759'
  },
  name: {
    fontSize: device.fontSize(11),
    color: '#585759'
  },
  tab_active_color: {
    color: '#2a7d08'
  },
  counter: {
    position: 'absolute',
    top: -5,
    left: 19,
    padding: 2,
    opacity: .5
  },
  tab_active_counter: {
    opacity: .9
  },
  counter_text: {
    fontSize: 10,
    backgroundColor: 'transparent'
  }
});

export default styles;