'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 37,
    paddingTop: 5,
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    backgroundColor: '#0eb8f7',
    elevation: 3,
    shadowColor: '#333',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  text: {
    color: '#FFF',
    textAlignVertical: 'center'
  },
  icon: {
    marginRight: 5,
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#FFF'
  }
});

