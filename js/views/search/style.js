'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  container: {
    backgroundColor: '#FFF',
    elevation: 1
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
    top: 9
  }
});
