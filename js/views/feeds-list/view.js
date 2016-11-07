'use strict';

import React from 'react';
import {
  View,
  Animated,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity
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
  }
  openHandler() {
    console.log(this.props);
  }
  onFavoriteClick() {
    console.log(this.props);
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
  render() {
    var props = this.props;
    console.log(props);
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={this.openHandler}
        underlayColor="#f9f9f9"
      >
        <View>
          <Text style={styles.row_title}>{props.title}</Text>
          <View style={styles.row_job_type_wrap}>
            <Text style={styles.row_job_type}>{props.job_type}</Text>
            <Text style={styles.row_job_posted} ref="date_created"> - {timeAgo(props.date_created)}</Text>
          </View>
          {props.budget ?
            <View style={styles.row_job_budget_wrap}>
              <Text style={styles.row_job_budget_title}>Budget: </Text>
              <Text style={styles.row_job_budget}>${props.budget}</Text>
            </View>
            : null
          }
          {props.skills ?
            <SkillsView items={props.skills} short={true} />
            : null
          }
          <View style={styles.row_footer}>
            <View style={styles.row_rating}>
              {this.getRating(props.client)}
            </View>
            <View style={styles.row_payment}>
              {this.getPaymentMethod(props.client)}
            </View>
            <View style={styles.row_favorite}>
              <TouchableOpacity
                style={styles.row_favorite_icon_wrap}
                onPress={this.onFavoriteClick}
              >
                <MaterialIcons
                  name="favorite-border"
                  style={styles.row_favorite_icon}
                />
              </TouchableOpacity>
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
  budget: React.PropTypes.number.isRequired,
  client: React.PropTypes.object.isRequired,
  skills: React.PropTypes.array.isRequired
};

class FeedsList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(props.data)
    };
    this.renderRow = this.renderRow.bind(this);
  }
  renderRow(item) {
    return <FeedsItem {...item} />;
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.list_container}
      />
    );
  }
}

FeedsList.propTypes = {
  data: React.PropTypes.array.isRequired
};

class FeedsListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: props.feeds.data
    };
  }
  componentDidMount = async () => {
    this.setState({
      feeds: await this.props.getStoredFeeds()
    });
  };
  render() {
    var state = this.state;
    return (
      <View style={styles.container}>
        {!state.feeds.length ?
          <FeedsListBlank />
          :
          <FeedsList data={state.feeds} />
        }
      </View>
    );
  }
}

FeedsListManager.propTypes = {
  feeds: React.PropTypes.object.isRequired,
  getStoredFeeds: React.PropTypes.func.isRequired
};

export default FeedsListManager;
