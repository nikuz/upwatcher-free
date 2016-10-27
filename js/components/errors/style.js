'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#fde3e3',
    alignItems: 'center',
    shadowColor: '#666',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    color: '#333'
  }
});
