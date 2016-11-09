'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  skills: {
    flexDirection: 'row',
    paddingTop: 7
  },
  skills_wrapped: {
    flexWrap: 'wrap'
  },
  skill: {
    height: 23,
    paddingTop: 3,
    paddingRight: 7,
    paddingBottom: 5,
    paddingLeft: 7,
    marginRight: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 4
  },
  skill_wrapped: {
    marginBottom: 5
  },
  skill_text: {
    fontSize: 11,
    color: '#494949'
  }
});
