'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  search: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 39,
    backgroundColor: '#FFF'
  },
  searchField: {
    height: 38,
    paddingRight: 50,
    paddingLeft: 10,
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
  },
  cancel: {
    position: 'absolute',
    top: 0,
    height: 39,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#CCC',
    backgroundColor: '#f9f9f9',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  cancel_text: {
    color: '#666',
    alignSelf: 'center',
    fontSize: 15
  },
  separator: {
    backgroundColor: '#CCC',
    height: 1
  }
});
