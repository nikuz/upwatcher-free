'use strict';

import React from 'react';
import {View} from 'react-native';
import * as _ from 'underscore';
import Search from '../search/code';
import styles from './style';

class Feeds extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Search />
      </View>
    );
  }
}

export default Feeds;
