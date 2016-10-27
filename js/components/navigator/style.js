'use strict';

import stylesGenerator from '../../../styles/generator';

export default stylesGenerator({
  container: {
    flex: 1
  },
  gap: {
    height: 38
  },
  foldersContainer: {
    flex: 1,
    marginTop: 65,
    backgroundColor: '#FFF'
  },
  navigator: {
    flex: 1,
    backgroundColor: '#6FDA44'
  },
  title: {
    backgroundColor: '#6FDA44',
    height: 45
  },
  title_blank: {
    width: 2000,
    fontSize: 18,
    lineHeight: 32
  },
  title_plain: {
    fontSize: 18,
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 34
  },
  title_item: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    fontSize: 18,
    color: '#4c4b4d',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 27
  },
  title_folder: {
    top: -100
  },
  title_logo: {
    lineHeight: 32
  },
  logo: {
    width: 138,
    height: 30
  },
  crumbIconPlaceholder: {
    flex: 1,
    height: 145,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  crumbIcon: {
    fontSize: 26,
    color: '#FFF'
  }
});

