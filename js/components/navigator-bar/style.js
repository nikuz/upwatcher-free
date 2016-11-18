'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 43,
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
    padding: 10,
    paddingTop: 5
  },
  button_icon: {
    fontSize: 32,
    color: '#FFF'
  },
  right_button_container: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  title: {
    padding: 10,
    paddingTop: 7,
    alignSelf: 'center'
  },
  prev_title: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  title_text: {
    fontSize: 20,
    color: '#4c4b4d',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logo: {
    width: 138,
    height: 30
  },
  title_logo: {
    flexDirection: 'row'
  },
  free_text: {
    marginLeft: 6,
    fontSize: 14,
    color: '#FFF'
  }
});
