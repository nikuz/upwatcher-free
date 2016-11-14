'use strict';

import React from 'react';
import {
  View,
  Animated,
  Text,
  ListView,
  RefreshControl,
  ActivityIndicator,
  InteractionManager
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
import {deepClone} from '../../modules/object';
import FeedsItem from '../../components/feeds-list-item/code';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class FeedsListBlank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animShiftTopValue: 0,
      animShiftMax: -3,
      animShiftTop: new Animated.Value(0),
    };
    this.startAnimation = this.startAnimation.bind(this);
  }
  startAnimation() {
    var state = this.state,
      toValue = state.animShiftTopValue < 0 ? 0 : state.animShiftMax;

    Animated.timing(
      this.state.animShiftTop,
      {toValue}
    ).start(() => {
      if (!this.componentUnmounted) {
        this.startAnimation();
      }
    });

    this.setState({
      animShiftTopValue: toValue
    });
  }
  shouldComponentUpdate = () => false;
  componentDidMount() {
    this.startAnimation();
  }
  componentWillUnmount() {
    this.componentUnmounted = true;
  }
  render() {
    return (
      <View style={styles.blank_wrap}>
        <Animated.View
          style={{
            transform: [{
              translateY: this.state.animShiftTop
            }]
          }}
          renderToHardwareTextureAndroid={true}
        >
          <MaterialIcons name="arrow-upward" style={styles.blank_icon} />
        </Animated.View>
        <Text style={styles.blank_text}>Please write your query </Text>
        <Text style={styles.blank_text}>to the field above</Text>
      </View>
    );
  }
}

class FeedsList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var feeds = this.checkFavorites(props.feeds.data, props.favorites);
    this.state = {
      feeds_count: feeds.length,
      dataSource: ds.cloneWithRows(feeds),
      loading_more: props.feeds.loading_more,
      refreshing: props.feeds.refreshing,
      page: 0,
      full: props.feeds.full
    };
    this.openHandler = this.openHandler.bind(this);
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.refresh = this.refresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  checkFavorites(feeds, favorites) {
    feeds = deepClone(feeds);
    _.each(feeds, function(item) {
      item.favorite = !!_.findWhere(favorites, {id: item.id});
    });
    return feeds;
  }
  openHandler(item) {
    this.props.pushState('preview', item);
  }
  onFavoriteClick(item, toFavorite) {
    if (toFavorite) {
      this.props.addToFavorites(item);
    } else {
      this.props.removeFromFavorites(item.id);
    }
  }
  refresh() {
    if (!this.state.refreshing) {
      this.props.refresh();
    }
  }
  onEndReached() {
    var state = this.state;
    if (state.feeds_count >= config.JOBS_PER_PAGE && !state.full && !state.loading_more) {
      let page = this.state.page + 1;
      this.setState({
        page
      });
      this.props.loadMoreJobs(page);
    }
  }
  componentWillReceiveProps(newProps) {
    var feeds = this.checkFavorites(newProps.feeds.data, newProps.favorites);
    this.setState({
      feeds_count: feeds.length,
      dataSource: this.state.dataSource.cloneWithRows(feeds),
      loading_more: newProps.feeds.loading_more,
      refreshing: newProps.feeds.refreshing,
      full: newProps.feeds.full
    });
    if (newProps.feeds.shouldBeRefresh) {
      this.refs.contList.scrollTo({
        x: 0,
        y: 0,
        animated: true
      });
    }
  }
  renderRow(item) {
    return (
      <FeedsItem
        data={item}
        openHandler={this.openHandler}
        onFavoriteClick={this.onFavoriteClick}
      />
    );
  }
  renderFooter() {
    var content = null,
      state = this.state;

    if (state.loading_more) {
      content = (
        <View style={styles.footer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    if (state.full) {
      content = (
        <View style={styles.footer_full}>
          <Text style={styles.footer_full_text}>
            No more jobs that match your search
          </Text>
        </View>
      );
    }

    return content;
  }
  render() {
    var state = this.state;
    return (
      <ListView
        ref="contList"
        dataSource={state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
        refreshControl={
          <RefreshControl
            progressBackgroundColor="#6FDA44"
            colors={['#FFF']}
            tintColor="#6FDA44" // iOS
            refreshing={state.refreshing}
            onRefresh={this.refresh}
          />
        }
        style={styles.list_container}
      />
    );
  }
}

FeedsList.propTypes = {
  feeds: React.PropTypes.object.isRequired,
  favorites: React.PropTypes.array.isRequired,
  addToFavorites: React.PropTypes.func.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  loadMoreJobs: React.PropTypes.func.isRequired,
  pushState: React.PropTypes.func.isRequired
};

class FeedsListManager extends React.Component {
  componentWillReceiveProps(newProps) {
    if (newProps.feeds.shouldBeRefresh) {
      InteractionManager.runAfterInteractions(() => {
        this.props.refresh();
      });
    }
  }
  shouldComponentUpdate(newProps) {
    return !newProps.feeds.shouldBeRefresh
      && !_.isEqual(newProps.feeds, this.props.feeds);
  }
  render() {
    var props = this.props;
    return (
      <View style={styles.container}>
        {!props.feeds.data.length ?
          <FeedsListBlank />
          :
          <FeedsList {...props} />
        }
      </View>
    );
  }
}

FeedsListManager.propTypes = {
  feeds: React.PropTypes.object.isRequired,
  favorites: React.PropTypes.array.isRequired,
  addToFavorites: React.PropTypes.func.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  loadMoreJobs: React.PropTypes.func.isRequired,
  pushState: React.PropTypes.func.isRequired
};

export default FeedsListManager;
