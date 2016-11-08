'use strict';

import React from 'react';
import {
  View
} from 'react-native';
import Search from '../search/controller';
import FeedsList from '../feeds-list/controller';
import Favorites from '../favorites/controller';
import Tabs from '../tabs/controller';
import styles from './style';

class Feeds extends React.Component {
  render() {
    var activeTab = this.props.tabs.activeTab;
    return (
      <View style={styles.container}>
        <Search />
        {activeTab === 'search' ?
          <FeedsList />
          :
          <Favorites />
        }
        <Tabs />
      </View>
    );
  }
}

Feeds.propTypes = {
  tabs: React.PropTypes.object.isRequired
};

export default Feeds;
