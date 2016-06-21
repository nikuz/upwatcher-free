'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  skills: {
    flexDirection: 'row',
    paddingTop: device.size(7)
  },
  skills_wrapped: {
    flexWrap: 'wrap'
  },
  skill: {
    paddingTop: device.size(3),
    paddingRight: device.size(7),
    paddingBottom: device.size(5),
    paddingLeft: device.size(7),
    marginRight: device.size(5),
    backgroundColor: '#E0E0E0',
    borderRadius: device.size(4)
  },
  skill_wrapped: {
    marginBottom: device.size(5)
  },
  skill_text: {
    fontSize: device.fontSize(11),
    color: '#494949'
  }
});

export default styles;