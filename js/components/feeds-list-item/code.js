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
import RatingComponent from '../rating/code';
import PaymentComponent from '../payment/code';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class FeedsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animHeight: null,
      created_time: timeAgo(props.data.date_created),
    };

    this.componentUnmounted = false;
    this.updateTimer = null;

    this.onLayout = this.onLayout.bind(this);
    this.getFavoriteButton = this.getFavoriteButton.bind(this);
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.updateCreatedTime = this.updateCreatedTime.bind(this);
  }
  onLayout(e) {
    if (this.props.animatedAnnihilation && this.state.animHeight === null) {
      var layout = e.nativeEvent.layout;
      this.setState({
        animHeight: new Animated.Value(layout.height)
      });
    }
  }
  onFavoriteClick() {
    var props = this.props;
    if (props.animatedAnnihilation) {
      Animated.timing(
        this.state.animHeight,
        {toValue: 0}
      ).start(() => {
        if (!this.componentUnmounted) {
          props.onFavoriteClick(props.data);
        }
      });
    } else {
      props.onFavoriteClick(props.data);
    }
  }
  getFavoriteButton(data) {
    var icon = 'favorite-border';
    if (data.favorite) {
      icon = 'favorite';
    }
    return (
      <TouchableOpacity
        style={styles.favorite_icon_wrap}
        onPress={this.onFavoriteClick}
      >
        <MaterialIcons
          name={icon}
          style={[styles.favorite_icon, data.favorite && styles.favorite_icon_active]}
        />
      </TouchableOpacity>
    );
  }
  updateCreatedTime() {
    if (this.componentUnmounted) {
      return;
    }

    var newCreatedTime = timeAgo(this.props.data.date_created);
    if (newCreatedTime !== this.state.created_time) {
      this.setState({
        created_time: newCreatedTime
      });
    }
    this.updateTimer = setTimeout(this.updateCreatedTime, 6e4 - new Date().getSeconds() * 1000);
  }
  componentDidMount() {
    this.updateCreatedTime();
  }
  componentWillUnmount() {
    clearTimeout(this.updateTimer);
    this.componentUnmounted = true;
  }
  render() {
    var props = this.props,
      data = this.props.data,
      cont;

    cont = (
      <TouchableHighlight
        style={styles.container}
        onPress={this.props.openHandler.bind(null, data)}
        underlayColor="#f9f9f9"
        onLayout={this.onLayout}
      >
        <View>
          <View style={styles.body}>
            <Text style={styles.title}>{data.title}</Text>
            <View style={styles.job_header}>
              <View style={styles.job_type_wrap}>
                <Text style={styles.job_type}>{data.job_type}</Text>
                <Text style={styles.job_posted} ref="date_created"> - {this.state.created_time}</Text>
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
              <RatingComponent
                feedback={data.client.feedback}
                reviews_count={data.client.reviews_count}
              />
            </View>
            <View style={styles.payment}>
              <PaymentComponent
                status={data.client.payment_verification_status}
              />
            </View>
            <View style={styles.favorite}>
              {this.getFavoriteButton(data)}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
    if (props.animatedAnnihilation) {
      cont = (
        <Animated.View
          style={{
            height: this.state.animHeight
          }}
          renderToHardwareTextureAndroid={true}
        >
          {cont}
        </Animated.View>
      )
    }
    return cont;
  }
}

FeedsItem.propTypes = {
  data: React.PropTypes.object.isRequired,
  onFavoriteClick: React.PropTypes.func.isRequired,
  openHandler: React.PropTypes.func.isRequired,
  animatedAnnihilation: React.PropTypes.bool
};

export default FeedsItem;
