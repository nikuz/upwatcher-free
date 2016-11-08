'use strict';

import React from 'react';
import {
  View,
  Animated,
  Text,
  ListView,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import SkillsView from '../../components/skills/code';
import timeAgo from '../../modules/timeAgo';
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

class FeedsItem extends React.Component {
  constructor(props) {
    super(props);
    this.openHandler = this.openHandler.bind(this);
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.getFavoriteButton = this.getFavoriteButton.bind(this);
  }
  openHandler() {
    console.log(this.props);
  }
  onFavoriteClick() {
    var id = this.props.id;
    if (this.props.favorite) {
      this.props.removeFromFavorites(id);
    } else {
      this.props.addToFavorites(id);
    }
  }
  getRating(data) {
    var noRating = true,
      text;

    if (data.feedback) {
      noRating = false;
      text = `${data.feedback.toFixed(1)} (${data.reviews_count})`;
    } else {
      text = 'No Ratings Yet';
    }

    return (
      <View style={styles.row_rating_cont}>
        <MaterialIcons
          name="star"
          style={[styles.row_rating_icon, noRating && styles.row_rating_icon_gray]}
        />
        <Text style={styles.row_rating_text}>{text}</Text>
      </View>
    );
  }
  getPaymentMethod(data) {
    var text = 'Unverified',
      unverified = true;

    if (data.payment_verification_status === 'VERIFIED') {
      text = 'Verified';
      unverified = false;
    }
    return (
      <View style={styles.row_payment_cont}>
        <MaterialIcons
          name="verified-user"
          style={[styles.row_payment_icon, unverified && styles.row_payment_unverified]}
        />
        <Text
          style={[styles.row_payment_text, unverified && styles.row_payment_unverified]}
        >
          Payment {text}
        </Text>
      </View>
    );
  }
  getFavoriteButton() {
    var icon = 'favorite-border',
      inFavorite;

    if (this.props.favorite) {
      icon = 'favorite';
      inFavorite = true;
    }
    return (
      <TouchableOpacity
        style={styles.row_favorite_icon_wrap}
        onPress={this.onFavoriteClick}
      >
        <MaterialIcons
          name={icon}
          style={[styles.row_favorite_icon, inFavorite && styles.row_favorite_icon_active]}
        />
      </TouchableOpacity>
    );
  }
  render() {
    var props = this.props;
    // console.log(props);
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={this.openHandler}
        underlayColor="#f9f9f9"
      >
        <View>
          <View style={styles.row_body}>
            <Text style={styles.row_title}>{props.title}</Text>
            <View style={styles.row_job_header}>
              <View style={styles.row_job_type_wrap}>
                <Text style={styles.row_job_type}>{props.job_type}</Text>
                <Text style={styles.row_job_posted} ref="date_created"> - {timeAgo(props.date_created)}</Text>
              </View>
              <View style={styles.row_job_budget_wrap}>
                {props.budget ?
                  <View style={styles.row_job_budget}>
                    <Text style={styles.row_job_budget_text}>${props.budget}</Text>
                  </View>
                  : null
                }
              </View>
            </View>
            {props.skills ?
              <View style={styles.row_job_skills}>
                <SkillsView items={props.skills} short={true} />
              </View>
              : null
            }
          </View>
          <View style={styles.row_footer}>
            <View style={styles.row_rating}>
              {this.getRating(props.client)}
            </View>
            <View style={styles.row_payment}>
              {this.getPaymentMethod(props.client)}
            </View>
            <View style={styles.row_favorite}>
              {this.getFavoriteButton()}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

FeedsItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  job_type: React.PropTypes.string.isRequired,
  date_created: React.PropTypes.string.isRequired,
  budget: React.PropTypes.number,
  client: React.PropTypes.object.isRequired,
  skills: React.PropTypes.array.isRequired,
  addToFavorites: React.PropTypes.func.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired
};

class FeedsList extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.feeds.data),
      loading_more: props.feeds.loading_more,
      refreshing: props.feeds.refreshing,
      page: 0
    };
    this.refresh = this.refresh.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  refresh() {
    if (!this.state.refreshing) {
      this.props.refresh();
    }
  }
  onEndReached() {
    if (!this.state.loading_more) {
      let page = this.state.page + 1;
      this.setState({
        page
      });
      this.props.loadMoreJobs(page);
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.feeds.data),
      loading_more: newProps.feeds.loading_more,
      refreshing: newProps.feeds.refreshing
    });
  }
  shouldComponentUpdate(nextProps) {
    var props = this.props;

    return nextProps.feeds.data !== props.feeds.data
      || nextProps.feeds.refreshing !== props.feeds.refreshing
      || nextProps.feeds.loading_more !== props.feeds.loading_more;
  }
  renderRow(item) {
    return (
      <FeedsItem
        {...item}
        addToFavorites={this.props.addToFavorites}
        removeFromFavorites={this.props.removeFromFavorites}
      />
    );
  }
  renderFooter() {
    var content = null;
    if (this.state.loading_more) {
      content = (
        <View style={styles.footer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return content;
  }
  render() {
    var state = this.state;
    return (
      <ListView
        dataSource={state.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={20}
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
  addToFavorites: React.PropTypes.func.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  loadMoreJobs: React.PropTypes.func.isRequired
};

class FeedsListManager extends React.Component {
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
  addToFavorites: React.PropTypes.func.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  refresh: React.PropTypes.func.isRequired,
  loadMoreJobs: React.PropTypes.func.isRequired
};

export default FeedsListManager;
