'use strict';

import React from 'react';
import {
  View,
  ViewPagerAndroid,
  ActivityIndicator
} from 'react-native';
import * as InteractionManager from '../../modules/interactions';
import Search from '../search/controller';
import FeedsList from '../feeds-list/controller';
import Favorites from '../favorites/controller';
import Tabs from '../tabs/controller';
import styles from './style';

class Feeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactionName: 'viewPager',
      contentSearch: <FeedsList />,
      contentFavorites: null
    };
    this.changePage = this.changePage.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.onPageSelected = this.onPageSelected.bind(this);
    this.onPageScrollStateChanged = this.onPageScrollStateChanged.bind(this);
  }
  changePage() {
    var activeTab = this.props.tabs.activeTab,
      page = 0;

    if (activeTab === 'favorites') {
      page = 1;
    }

    this.refs.viewPager.setPage(page);
  }
  updateContent() {
    var activeTab = this.props.tabs.activeTab;
    this.setState({
      contentSearch: activeTab === 'search' ? <FeedsList /> : null,
      contentFavorites: activeTab === 'favorites' ? <Favorites /> : null
    });
  }
  onPageSelected(event) {
    var curTab = event.nativeEvent.position;
    this.props.changeTab(curTab === 0 ? 'search' : 'favorites');
  }
  onPageScrollStateChanged(state) {
    if (state === 'idle') {
      InteractionManager.clearInteractionHandle(this.state.interactionName);
    }
  }
  componentDidUpdate() {
    var state = this.state,
      activeTab = this.props.tabs.activeTab;

    if ((activeTab === 'search' && state.contentSearch) || (activeTab === 'favorites' && state.contentFavorites)) {
      return;
    }

    this.changePage();
    InteractionManager.runAfterInteraction(state.interactionName, () => {
      this.updateContent();
    });
  }
  render() {
    var state = this.state,
      loadingCont;

    loadingCont = (
      <View style={styles.loading_cont}>
        <ActivityIndicator size="large" style={styles.loading} />
      </View>
    );

    return (
      <View style={styles.container}>
        <Search />
        <ViewPagerAndroid
          initialPage={0}
          keyboardDismissMode="on-drag"
          ref="viewPager"
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          onPageSelected={this.onPageSelected}
          style={styles.cont}
        >
          <View>
            {state.contentSearch || loadingCont}
          </View>
          <View>
            {state.contentFavorites || loadingCont}
          </View>
        </ViewPagerAndroid>
        <Tabs />
      </View>
    );
  }
}

Feeds.propTypes = {
  tabs: React.PropTypes.object.isRequired,
  changeTab: React.PropTypes.func.isRequired
};

export default Feeds;
