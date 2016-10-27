'use strict';

import stylesGenerator from '../../styles/generator';

export default stylesGenerator({
  container: {
    flex: 1
  },
  navigator: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: '#6FDA44'
  },
  nav_bar: {
    height: 40
  },
  title: {
    height: 40,
    alignItems: 'center'
  },
  title_text: {
    fontSize: 18,
    color: '#4c4b4d',
    fontWeight: 'bold',
    lineHeight: 34
  },
  logo: {
    width: 138,
    height: 30
  },
  icon_wrap: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#000',
    height: 40,
    paddingTop: 2,
    paddingRight: 10,
    paddingLeft: 10
  },
  icon: {
    fontSize: 26,
    color: '#FFF'
  }
});
