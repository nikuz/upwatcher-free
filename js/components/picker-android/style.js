'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  wrap: {
    marginTop: 10,
    marginBottom: 10
  },
  item: {
    padding: 15,
    paddingTop: 7,
    paddingBottom: 7
  },
  item_cont: {
    flex: 1,
    flexDirection: 'row'
  },
  item_cont_text_wrap: {
    flex: 1
  },
  item_text: {
    fontSize: 20
  },
  item_cont_icon: {
    paddingTop: 3
  },
  item_icon: {
    fontSize: 20
  }
});
