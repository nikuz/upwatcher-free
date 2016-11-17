'use strict';

import stylesGenerator from '../../../../styles/generator';
import * as device from '../../../modules/device';

export default stylesGenerator({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    paddingTop: 10,
    paddingBottom: 10
  },
  cont: {
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 5
  },
  slider: {
    marginLeft: device.platformVersion() < 20 ? 7 : 0,
    marginRight: device.platformVersion() < 20 ? 7 : 0
  }
});
