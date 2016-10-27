'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrapper: {
    backgroundColor: '#FFF'
  },
  cont: {
    padding: 5,
    paddingLeft: 13,
    flexDirection: 'row'
  },
  msiw: {
    marginRight: 8,
    width: 50,
    height: 28,
    paddingTop: 2,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: 'rgba(51, 51, 51, .2)',
    borderRadius: 2
  },
  msiw_disabled: {
    opacity: .4
  },
  msitem: {
    fontSize: 20
  },
  msiw_select_all: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  msiw_select_all_icon: {
    color: '#FFF'
  },
  separator: {
    height: 1,
    marginLeft: -8,
    marginRight: -8,
    backgroundColor: '#CCC'
  }
});

