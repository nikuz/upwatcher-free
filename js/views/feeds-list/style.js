'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  blank_wrap: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  blank_icon: {
    fontSize: 70,
    color: '#BBB'
  },
  blank_text: {
    fontSize: 21
  },
  container: {
    flex: 1
  },
  list_container: {
    flex: 1
  },
  footer: {
    paddingTop: 5,
    paddingBottom: 5
  },
  footer_full: {
    paddingTop: 10,
    paddingBottom: 10
  },
  footer_full_text: {
    fontSize: 15,
    textAlign: 'center'
  },
  empty: {
    padding: 15
  },
  empty_text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
