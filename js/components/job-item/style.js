'use strict';

import {StyleSheet} from 'react-native';
import * as device from '../../modules/device';

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: device.size(65),
    backgroundColor: '#FFF'
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  cont: {
    marginTop: device.size(39),
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    flex: 1
  },
  title: {
    fontSize: device.fontSize(18),
    color: '#494949'
  },
  column: {
    flexDirection: 'row',
    paddingTop: device.size(10),
    paddingBottom: device.size(20)
  },
  column_item: {
    flex: 1
  },
  column_title: {
    marginBottom: device.size(3)
  },
  separator_wrap: {
    marginTop: device.size(15),
    marginBottom: device.size(15),
    marginLeft: device.size(-13),
    marginRight: device.size(-13),
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#f9f9f9'
  },
  separator: {
    fontSize: device.fontSize(15)
  },
  margin: {
    marginTop: device.size(5),
    marginBottom: device.size(5)
  },
  big: {
    fontSize: device.fontSize(17),
    lineHeight: device.fontSize(20)
  },
  small: {
    fontSize: device.fontSize(11)
  },
  bold: {
    fontWeight: 'bold'
  },
  gray: {
    color: '#999'
  },
  text_link: {
    color: '#6FDA44',
    textDecorationLine: 'underline'
  },
  description: {
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    marginLeft: device.size(-13),
    marginRight: device.size(-13),
    paddingTop: device.size(15),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    paddingBottom: device.size(10)
  },
  description_text: {
    fontSize: device.fontSize(14),
    lineHeight: device.fontSize(20)
  },
  apply: {
    marginTop: device.size(10),
    marginBottom: device.size(10),
    paddingTop: device.size(12),
    paddingBottom: device.size(12),
    borderRadius: device.size(3),
    backgroundColor: '#5bbc2e',
    alignItems: 'center'
  },
  apply_text: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: device.fontSize(18)
  },
  attachment: {
    alignSelf: 'flex-start',
    marginTop: device.size(10),
    marginBottom: device.size(10)
  },
  attachment_icon: {
    fontSize: device.fontSize(15)
  },
  feedback: {
    backgroundColor: '#e9e9e9'
  },
  feedback_text: {
    color: '#222'
  },
  edur: {
    paddingTop: device.size(10)
  },
  edur_title: {
    color: '#919191',
    fontSize: device.fontSize(11)
  },
  feedback_wrap: {
    flex: 1,
    paddingTop: device.size(10),
    paddingBottom: device.size(10),
    backgroundColor: '#FFF'
  },
  feedback_item: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingTop: device.size(16),
    paddingBottom: device.size(16),
    paddingLeft: device.size(13),
    paddingRight: device.size(13),
    flexDirection: 'row'
  },
  fi_cont: {
    flex: 1,
    paddingRight: device.size(20)
  }
});

export default styles;