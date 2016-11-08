'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  tabs: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  },
  tab_item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 7,
    // borderWidth: 1
  },
  tab_cont: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  icon: {
    fontSize: 24,
    marginBottom: -3,
    color: '#585759'
  },
  name: {
    fontSize: 11,
    color: '#585759'
  },
  tab_active_color: {
    color: '#2a7d08'
  },
  counter: {
    position: 'absolute',
    top: 3,
    right: 10,
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: '#f36200',
    borderRadius: 10,
  },
  counter_long: {
    paddingLeft: 4,
    paddingRight: 4
  },
  counter_text: {
    fontSize: 10,
    color: '#FFF',
    backgroundColor: 'transparent'
  }
});
