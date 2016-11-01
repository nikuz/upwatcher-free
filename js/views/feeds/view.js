'use strict';

import React from 'react';
import {
  View
} from 'react-native';
import Search from '../search/controller';
import FeedsList from '../feeds-list/controller';
import styles from './style';

class Feeds extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Search />
        <FeedsList />
      </View>
    );
  }
}

export default Feeds;
