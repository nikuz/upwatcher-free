'use strict';

import React from 'react';
import {
  View,
  Text
} from 'react-native';
import * as _ from 'underscore';

import styles from './style';

class Skills extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    short: React.PropTypes.bool
  };
  render() {
    var props = this.props,
      items = _.clone(props.items),
      isShortView = props.short,
      style = [styles.skills],
      styleSkill = [styles.skill];

    if (props.wrapped) {
      style.push(styles.skills_wrapped);
      styleSkill.push(styles.skill_wrapped);
    }

    if (items && items.length) {
      if (isShortView) {
        if (items.length > 4) {
          items[3] = '...';
        }
        items = items.splice(0, 4);
      }
      return (
        <View style={style} removeClippedSubviews={true}>
          {items.map((skill, key) => {
            return (
              <View key={key} style={styleSkill} numberOfLines={1}>
                <Text style={styles.skill_text}>{skill}</Text>
              </View>
            );
          })}
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Skills;