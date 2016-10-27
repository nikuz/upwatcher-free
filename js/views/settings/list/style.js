'use strict';

import stylesGenerator from '../../../../styles/generator';

export default stylesGenerator({
  waiting: {
    padding: 15
  },
  error: {
    padding: 10,
    alignItems: 'center'
  },
  error_text: {
    color: '#F00',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center'
  },
  retry_btn: {
    marginTop: 5,
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 3,
    backgroundColor: '#5bbc2e',
    alignItems: 'center'
  },
  retry_btn_text: {
    color: '#FFF'
  }
});
