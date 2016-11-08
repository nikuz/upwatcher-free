'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import SkillsView from '../../components/skills/code';
import timeAgo from '../../modules/timeAgo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class FeedsItem extends React.Component {
  constructor(props) {
    super(props);
    this.getFavoriteButton = this.getFavoriteButton.bind(this);
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
      <View style={styles.rating_cont}>
        <MaterialIcons
          name="star"
          style={[styles.rating_icon, noRating && styles.rating_icon_gray]}
        />
        <Text style={styles.rating_text}>{text}</Text>
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
      <View style={styles.payment_cont}>
        <MaterialIcons
          name="verified-user"
          style={[styles.payment_icon, unverified && styles.payment_unverified]}
        />
        <Text
          style={[styles.payment_text, unverified && styles.payment_unverified]}
        >
          Payment {text}
        </Text>
      </View>
    );
  }
  getFavoriteButton(data) {
    var icon = 'favorite-border',
      inFavorite;

    if (data.favorite) {
      icon = 'favorite';
      inFavorite = true;
    }
    return (
      <TouchableOpacity
        style={styles.favorite_icon_wrap}
        onPress={this.props.onFavoriteClick.bind(null, data)}
      >
        <MaterialIcons
          name={icon}
          style={[styles.favorite_icon, inFavorite && styles.favorite_icon_active]}
        />
      </TouchableOpacity>
    );
  }
  render() {
    var data = this.props.data;
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.openHandler.bind(null, data)}
        underlayColor="#f9f9f9"
      >
        <View>
          <View style={styles.body}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.job_header}>
              <View style={styles.job_type_wrap}>
                <Text style={styles.job_type}>{data.job_type}</Text>
                <Text style={styles.job_posted} ref="date_created"> - {timeAgo(data.date_created)}</Text>
              </View>
              <View style={styles.job_budget_wrap}>
                {data.budget ?
                  <View style={styles.job_budget}>
                    <Text style={styles.job_budget_text}>${data.budget}</Text>
                  </View>
                  : null
                }
              </View>
            </View>
            {data.skills ?
              <View style={styles.job_skills}>
                <SkillsView items={data.skills} short={true} />
              </View>
              : null
            }
          </View>
          <View style={styles.footer}>
            <View style={styles.rating}>
              {this.getRating(data.client)}
            </View>
            <View style={styles.payment}>
              {this.getPaymentMethod(data.client)}
            </View>
            <View style={styles.favorite}>
              {this.getFavoriteButton(data)}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

FeedsItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onFavoriteClick: React.PropTypes.func.isRequired,
  openHandler: React.PropTypes.func.isRequired
};

export default FeedsItem;
