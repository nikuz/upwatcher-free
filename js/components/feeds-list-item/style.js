'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  container: {
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  body: {
    paddingLeft: 13,
    paddingRight: 13,
  },
  title: {
    fontSize: 16,
    color: '#5bbc2e'
  },
  job_header: {
    flexDirection: 'row',
  },
  job_type_wrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2
  },
  job_type: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 12
  },
  job_posted: {
    color: '#666',
    fontSize: 12
  },
  job_budget_wrap: {
    flex: 1,
    alignItems: 'flex-end'
  },
  job_budget: {
    position: 'absolute',
    right: 0,
    width: 50,
    marginTop: 7,
    alignItems: 'center'
  },
  job_budget_text: {
    color: '#494949'
  },

  job_skills: {
    marginTop: 6,
    marginBottom: 2,
  },

  footer: {
    flexDirection: 'row',
    marginTop: 10
  },

  rating: {
    flex: 3,
    paddingLeft: 13
  },
  rating_cont: {
    flexDirection: 'row'
  },
  rating_icon: {
    marginRight: 4,
    fontSize: 18,
    color: '#ffb000'
  },
  rating_icon_gray: {
    color: '#e0e0e0'
  },
  rating_text: {
    color: '#666',
    textAlignVertical: 'center',
    fontSize: 12
  },

  payment: {
    flex: 4
  },
  payment_cont: {
    flexDirection: 'row'
  },
  payment_icon: {
    marginRight: 4,
    fontSize: 18,
    color: '#14bff4'
  },
  payment_text: {
    color: '#666',
    textAlignVertical: 'center',
    fontSize: 12
  },
  payment_unverified: {
    color: '#CCC'
  },

  favorite: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0'
  },
  favorite_icon_wrap: {
    flex: 1,
    alignItems: 'center'
  },
  favorite_icon: {
    fontSize: 20,
    color: '#666'
  },
  favorite_icon_active: {
    color: '#f36200'
  }
});
