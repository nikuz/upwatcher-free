'use strict';

import stylesGenerator from '../../../../styles/generator';

export default stylesGenerator({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    padding: 13
  },
  cont: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    fontSize: 18,
    marginTop: 3
  },
  time_wrap: {
    flexDirection: 'row'
  },
  time: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: '#EDEDED'
  },
  time_sep: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7
  },
  time_text: {
    fontSize: 16
  },
  datepicker_wrap: {
    alignItems: 'center'
  }
});
