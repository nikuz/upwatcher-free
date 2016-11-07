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
  row: {
    padding: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  row_title: {
    marginBottom: 5,
    fontSize: 16,
    color: '#5bbc2e'
  },
  row_job_type_wrap: {
    flexDirection: 'row'
  },
  row_job_type: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 12
  },
  row_job_posted: {
    color: '#666',
    fontSize: 12
  },
  row_job_budget_wrap: {
    flexDirection: 'row',
    marginTop: 8
  },
  row_job_budget_title: {
    color: '#666'
  },
  row_job_budget: {
    color: '#494949'
  },

  row_footer: {
    flexDirection: 'row',
    marginTop: 10
  },

  row_rating: {
    flex: 3
  },
  row_rating_cont: {
    flexDirection: 'row'
  },
  row_rating_icon: {
    marginRight: 4,
    fontSize: 18,
    color: '#ffb000'
  },
  row_rating_icon_gray: {
    color: '#e0e0e0'
  },
  row_rating_text: {
    color: '#666',
    textAlignVertical: 'center',
    fontSize: 12
  },

  row_payment: {
    flex: 4
  },
  row_payment_cont: {
    flexDirection: 'row'
  },
  row_payment_icon: {
    marginRight: 4,
    fontSize: 18,
    color: '#14bff4'
  },
  row_payment_text: {
    color: '#666',
    textAlignVertical: 'center',
    fontSize: 12
  },
  row_payment_unverified: {
    color: '#CCC'
  },

  row_favorite: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0'
  },
  row_favorite_icon_wrap: {
    flex: 1,
    alignItems: 'center'
  },
  row_favorite_icon: {
    fontSize: 20,
    color: '#666'
  }
});
