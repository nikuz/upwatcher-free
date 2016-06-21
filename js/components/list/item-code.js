'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native';
import * as _ from 'underscore';
import Skills from '../skills/code';
import Icon from 'react-native-vector-icons/FontAwesome';
import timeAgo from '../../modules/timeAgo';
import styles from './style';

class ListItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    date_created: React.PropTypes.string.isRequired,
    remove: React.PropTypes.func.isRequired,
    open: React.PropTypes.func.isRequired,
    select: React.PropTypes.func.isRequired
  };
  state = {
    height: null
  };
  updateTimeAgo = () => {
    var newTimeAgo = timeAgo(this.props.date_created);
    if (newTimeAgo !== this.curTimeAgo) {
      this.curTimeAgo = newTimeAgo;
      let item = this.refs.date_created.getDOMNode();
      item.innerHTML = newTimeAgo;
      this.updateTimer = setTimeout(this.updateTimeAgo, 6e4 - new Date().getSeconds() * 1000);
    }
  };
  onPress = () => {
    this.props.open(this.props.id);
  };
  onLongPress = () => {
    this.props.select(this.props.id);
  };
  componentDidMount = () => {
    this.curTimeAgo = timeAgo(this.props.date_created);
    this.updateTimeAgo();
  };
  shouldComponentUpdate = (nextProps, nextState) => {
    var curProps = this.props;
    return curProps.selected !== nextProps.selected
      || curProps.hidden !== nextProps.hidden
      || curProps.is_new !== nextProps.is_new
      || curProps.watched !== nextProps.watched
      || nextState.height;
  };
  componentDidUpdate = () => {
    var curProps = this.props,
      curState = this.state;

    if (curProps.hidden && !curState.height) {
      this.refs.item.measure((ox, oy, width, height) => {
        this.setState({
          height: new Animated.Value(height)
        });
      });
    } else if (curState.height) {
      Animated.timing(curState.height, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.ease)
      }).start();
    }
  };
  componentWillUnmount = () => {
    clearTimeout(this.updateTimer);
  };
  render = () => {
    var props = this.props,
      contStyle = [styles.jl_item_cont],
      animateStyle = {};

    if (this.state.height) {
      animateStyle.height = this.state.height;
    }

    if (this.props.selected) {
      contStyle.push(styles.jl_item_cont_selected);
    }

    return (
      <Animated.View style={[animateStyle, {overflow: 'hidden'}]}>
        <TouchableHighlight ref="item" onPress={this.onPress} onLongPress={this.onLongPress} underlayColor="#DCDCDC">
          <View style={styles.jl_item}>
            <View style={contStyle}>
              <Text>
                {props.is_new ?
                  <Text>
                    <Text style={styles.jli_new}>&nbsp;NEW&nbsp;</Text>
                    <Text>&nbsp;</Text>
                  </Text>
                  : null
                }
                <Text style={[styles.jl_link, props.watched ? styles.jl_link_watched : null]}>{props.title}</Text>
              </Text>
              <Text style={styles.jli_params}>
                <Text style={styles.jli_type}>{props.job_type} - </Text>
                {props.duration ? <Text>Est. Time: {props.duration} - </Text> : null}
                {props.budget ? <Text>Est. Budget: {props.budget} - </Text> : null}
                <Text>Posted: <Text ref="date_created">{timeAgo(props.date_created)}</Text></Text>
              </Text>
              <Skills items={props.skills} short={true} />
            </View>
            <Icon name="trash" style={styles.jl_trash_i} />
            <View style={styles.jl_separator} />
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };
}

export default ListItem;