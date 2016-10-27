'use strict';

import stylesGenerator from '../../../../styles/generator';

export default stylesGenerator({
  overlay: {
    flex: 1,
    padding: 8,
    paddingBottom: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  overlay_gap: {
    flex: 1
  },
  overlay_title: {
    marginBottom: 10,
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center'
  },
  select: {
    backgroundColor: '#FFF',
    borderRadius: 6
  },
  buttons: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    height: 46,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  btn_cancel: {
    marginLeft: 5
  },
  btn_save: {
    marginRight: 5
  },
  btn_text: {
    color: '#999',
    alignSelf: 'center',
    fontSize: 22
  },
  btn_text_save: {
    color: '#5CA838'
  }
});
