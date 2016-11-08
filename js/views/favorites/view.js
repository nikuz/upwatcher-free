'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  ListView
} from 'react-native';
import styles from './style';

class Favorites extends React.Component {
  render() {
    var props = this.props;
    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
      </View>
    );
  }
}

Favorites.propTypes = {

};

export default Favorites;
