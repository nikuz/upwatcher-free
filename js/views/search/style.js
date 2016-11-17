'use strict';

import stylesGenerator from '../../../styles/generator';
import * as device from '../../modules/device';

export default stylesGenerator({
  container: {
    backgroundColor: '#FFF',
    elevation: 1,
    borderBottomWidth: device.platformVersion() < 21 ? 1 : 0,
    borderBottomColor: '#e0e0e0'
  },
  field: {
    height: 40,
    padding: 0,
    paddingRight: 50,
    paddingLeft: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'center',
    color: '#333',
    fontSize: 15
  },
  submit_wrap: {
    position: 'absolute',
    right: 0,
    top: 1
  },
  submit_icon: {
    width: 50,
    height: 38,
    paddingTop: 8,
    fontSize: 24,
    color: '#999',
    textAlign: 'center'
  },
  submit_loader: {
    position: 'absolute',
    right: 16,
    top: 10
  }
});
