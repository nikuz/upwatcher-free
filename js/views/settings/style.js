'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    marginTop: 65,
    backgroundColor: '#FFF'
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13
  },
  item_disabled: {
    opacity: .4
  },
  item_title: {
    fontSize: 18,
    marginBottom: 3
  },
  item_value: {
    fontSize: 14,
    color: '#999'
  }
});
