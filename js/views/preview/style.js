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
    paddingRight: 13
  },
  cont_sep: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
  },
  title: {
    fontSize: 18,
    color: '#494949'
  },
  title_icon: {
    fontSize: 16
  },
  attention: {
    flexDirection: 'row'
  },
  at_item: {
    flex: 1,
    alignItems: 'center'
  },
  at_item_icon: {
    fontSize: 34,
    color: '#848484'
  },
  at_text: {
    fontSize: 15,
    color: '#383838'
  },
  at_label: {
    fontSize: 11,
    color: '#666'
  },
  column: {
    flexDirection: 'row',
    paddingTop: 10
  },
  column_item: {
    flex: 1
  },
  margin: {
    marginTop: 5,
    marginBottom: 5
  },
  margin_bottom: {
    marginBottom: 5
  },
  big: {
    fontSize: 15,
    lineHeight: 20
  },
  normal: {
    fontSize: 13
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
  black: {
    color: '#383838'
  },
  text_link: {
    color: '#6FDA44',
    textDecorationLine: 'underline'
  },
  description: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13
  },
  description_text: {
    fontSize: 14,
    lineHeight: 20
  },
  apply: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    backgroundColor: '#5bbc2e',
    alignItems: 'center'
  },
  apply_text: {
    color: '#FFF',
    fontSize: 16
  },
  attachment: {
    flexDirection: 'row'
  },
  attachment_icon: {
    marginRight: 4,
    fontSize: 15,
    textAlignVertical: 'center'
  },
  feedback: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#e9e9e9'
  },
  feedback_text: {
    color: '#222'
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
  nav_bar_buttons: {
    flexDirection: 'row'
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
  },
  nav_bar_button_share: {
    paddingRight: 5
  },
  client: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    paddingRight: 13,
    borderTopWidth: 1,
    borderTopColor: '#EDEDED',
    backgroundColor: '#f9f9f9'
  },
  client_head: {
    flexDirection: 'row',
    marginBottom: 5
  },
  client_rating: {
    marginRight: 20
  }
});
