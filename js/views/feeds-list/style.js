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
    padding: 13,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  row_title: {
    fontSize: 16,
    color: '#5bbc2e'
  },
  row_job_header: {
    flexDirection: 'row',
  },
  row_job_type_wrap: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 2
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
    flex: 1,
    alignItems: 'flex-end'
  },
  row_job_budget: {
    position: 'absolute',
    right: 0,
    width: 50,
    marginTop: 7,
    alignItems: 'center'
  },
  row_job_budget_text: {
    color: '#494949'
  },

  row_job_skills: {
    marginTop: 6,
    marginBottom: 2,
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
  },
  row_favorite_icon_active: {
    color: '#f36200'
  }
});
