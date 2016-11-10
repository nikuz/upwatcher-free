'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    flex: 1
  },
  navigator: {
    paddingTop: 7,
    paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#6FDA44'
  },
  navigator_icon_wrap: {
    width: 50,
    paddingRight: 10,
    paddingLeft: 10
  },
  navigator_icon: {
    fontSize: 32,
    color: '#FFF'
  },
  navigator_icon_close: {
    color: '#6FDA44'
  },
  navigator_title: {
    flex: 1,
    alignItems: 'center'
  },
  navigator_title_text: {
    fontSize: 18,
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 26
  },
  cont: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});
