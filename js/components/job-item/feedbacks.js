'use strict';

import React from 'react';
import {
  View,
  ScrollView,
  Text
} from 'react-native';
import * as _ from 'underscore';
import styles from './style';

class FeedbacksList extends React.Component {
  render() {
    var feedbacks = this.props.feedbacks || [];
    return (
      <ScrollView showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.feedback_wrap}
      >
        {feedbacks.map((item, key) => {
          return (
            <View key={key} style={styles.feedback_item}>
              <View style={styles.fi_cont}>
                <Text style={styles.big}>{item.as_engagement_title}</Text>
                <Text style={[styles.small, styles.margin]}>{item.as_from} - {item.as_to}</Text>
                {item.feedback.comment ? <Text>{item.feedback.comment}</Text> : null}
              </View>
              <Text style={styles.big}>{item.feedback.score}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

export default FeedbacksList;