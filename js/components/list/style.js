'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
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
    top: device.size(5),
    left: device.size(185),
    paddingTop: device.size(5),
    paddingBottom: device.size(5),
    paddingLeft: device.size(5),
    paddingRight: device.size(5),
    backgroundColor: '#ffeb99',
    borderRadius: device.size(5)
  },
  manager_tooltip_text: {
    fontSize: device.fontSize(14)
  },

  jl_response_empty: {
    flex: 1,
    paddingTop: device.size(10),
    paddingRight: device.size(20),
    paddingBottom: device.size(10),
    paddingLeft: device.size(20)
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
    fontSize: device.fontSize(21),
    textAlign: 'center',
    color: '#7c7c7a'
  },
  jl_info_title: {
    marginBottom: device.size(5)
  },
  jl_info_descr: {
    fontSize: device.fontSize(12),
    lineHeight: device.fontSize(18),
    textAlign: 'center',
    color: '#7c7c7a'
  },
  jl_info_text_icon: {
    fontSize: device.fontSize(14)
  },
  jl_info_fa: {
    fontSize: device.fontSize(84),
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
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    backgroundColor: '#fff'
  },
  jl_item_cont_selected: {
    backgroundColor: '#ffffcc'
  },
  jl_trash_i: {
    position: 'absolute',
    left: device.size(50),
    fontSize: device.fontSize(30),
    color: '#f00'
  },
  jl_link: {
    fontSize: device.fontSize(15),
    fontWeight: 'bold',
    color: '#43AC12'
  },
  jl_link_watched: {
    color: '#999'
  },
  jli_params: {
    color: '#494949',
    fontSize: device.fontSize(13),
    marginTop: device.size(3)
  },
  jli_new: {
    backgroundColor: '#fc4f4f',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: device.fontSize(10)
  },
  jli_type: {
    fontWeight: 'bold'
  },
  jli_separator: {
    height: device.size(3)
  },
  scrollSpinner: {
    marginVertical: 20
  }
});

export default styles;