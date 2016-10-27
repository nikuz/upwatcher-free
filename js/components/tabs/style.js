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
    paddingTop: 7
  },
  tab_cont: {
    alignItems: 'center'
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
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
    top: -5,
    left: 19,
    padding: 2,
    opacity: .5
  },
  tab_active_counter: {
    opacity: .9
  },
  counter_text: {
    fontSize: 10,
    backgroundColor: 'transparent'
  }
});
