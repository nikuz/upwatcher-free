'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  container: {
    backgroundColor: '#FFF'
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
    top: 0
  },
  submit: {
    width: 50,
    height: 38,
    paddingTop: 8,
    fontSize: 20,
    color: '#999',
    textAlign: 'center'
  },
  submit_loader: {
    position: 'absolute',
    right: 16,
    top: 9
  }
});
