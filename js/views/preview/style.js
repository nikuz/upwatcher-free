'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  cont: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    flex: 1
  },
  column: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20
  },
  column_item: {
    flex: 1
  },
  column_title: {
    marginBottom: 3
  },
  separator_wrap: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: -13,
    marginRight: -13,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    backgroundColor: '#f9f9f9'
  },
  separator: {
    fontSize: 15
  },
  margin: {
    marginTop: 5,
    marginBottom: 5
  },
  big: {
    fontSize: 17,
    lineHeight: 20
  },
  small: {
    fontSize: 11
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
    marginLeft: -13,
    marginRight: -13,
    paddingTop: 15,
    paddingLeft: 13,
    paddingRight: 13,
    paddingBottom: 10
  },
  description_text: {
    fontSize: 14,
    lineHeight: 20
  },
  apply: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 3,
    backgroundColor: '#5bbc2e',
    alignItems: 'center'
  },
  apply_text: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 18
  },
  attachment: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  },
  attachment_icon: {
    fontSize: 15
  },
  feedback: {
    backgroundColor: '#e9e9e9'
  },
  feedback_text: {
    color: '#222'
  },
  edur: {
    paddingTop: 10
  },
  edur_title: {
    color: '#919191',
    fontSize: 11
  },
  feedback_wrap: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFF'
  },
  feedback_item: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 13,
    paddingRight: 13,
    flexDirection: 'row'
  },
  fi_cont: {
    flex: 1,
    paddingRight: 20
  },
  nav_bar_button: {
    padding: 10,
    paddingTop: 5
  },
  nav_bar_button_icon: {
    fontSize: 32,
    color: '#FFF'
  },
  nav_bar_button_icon_active: {
    color: '#f36200'
  }
});
