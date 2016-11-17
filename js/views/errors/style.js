'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#f36200',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#666',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    color: '#FFF'
  },
  buttons: {
    flexDirection: 'row'
  },
  gap: {
    marginLeft: 10,
    marginRight: 10
  },
  button_small: {
    marginTop: 2
  }
});
