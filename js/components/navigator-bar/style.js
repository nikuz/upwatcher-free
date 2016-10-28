'use strict';

import stylesGenerator from '../../../styles/generator';
import * as device from '../../modules/device';

export default stylesGenerator({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#6FDA44'
  },
  navbar_animated: {
    position: 'absolute',
    top: 0,
    height: 40,
    backgroundColor: 'transparent'
  },
  left_button_container: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  button: {
    padding: 10
  },
  button_icon: {
    fontSize: 26,
    color: '#FFF'
  },
  right_button_container: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  title: {
    padding: 10,
    paddingTop: device.isAndroid() ? 7 : 9,
    alignSelf: 'center'
  },
  prev_title: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  title_text: {
    fontSize: 18,
    color: '#4c4b4d',
    fontWeight: 'bold',
    textAlign: device.isIos() ? 'center' : 'left'
  },
  logo: {
    width: 138,
    height: 30
  }
});
