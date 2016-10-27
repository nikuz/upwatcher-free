'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  jobs_list_wrap: {
    flex: 1
  },
  manager: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  manager_tooltip: {
    position: 'absolute',
    top: 5,
    left: 185,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ffeb99',
    borderRadius: 5
  },
  manager_tooltip_text: {
    fontSize: 14
  },

  jl_response_empty: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  jl_info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  jl_info_cont: {
    flex: 1,
    alignItems: 'center'
  },
  jl_info_text: {
    fontSize: 21,
    textAlign: 'center',
    color: '#7c7c7a'
  },
  jl_info_title: {
    marginBottom: 5
  },
  jl_info_descr: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#7c7c7a'
  },
  jl_info_text_icon: {
    fontSize: 14
  },
  jl_info_fa: {
    fontSize: 84,
    color: '#7c7c7a'
  },
  jl_info_fa_folder: {
    color: '#CCC'
  },
  jl_separator: {
    height: 1,
    backgroundColor: '#e5e5e5'
  },
  jl_item: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0b8043'
  },
  jl_item_cont: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: '#fff'
  },
  jl_item_cont_selected: {
    backgroundColor: '#ffffcc'
  },
  jl_trash_i: {
    position: 'absolute',
    left: 50,
    fontSize: 30,
    color: '#f00'
  },
  jl_link: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#43AC12'
  },
  jl_link_watched: {
    color: '#999'
  },
  jli_params: {
    color: '#494949',
    fontSize: 13,
    marginTop: 3
  },
  jli_new: {
    backgroundColor: '#fc4f4f',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10
  },
  jli_type: {
    fontWeight: 'bold'
  },
  jli_separator: {
    height: 3
  },
  scrollSpinner: {
    marginVertical: 20
  }
});
