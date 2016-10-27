'use strict';

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Animated
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import * as EventManager from '../../modules/events';
import * as storage from '../../modules/storage';
import * as cache from '../../modules/cache';
import * as device from '../../modules/device';
import * as logs from '../../modules/logs';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

const positionOnScreen = 0,
  hiddenPositionOnScreen = -40,
  cancelPositionOnScreen = 0,
  cancelWidth = 80,
  cancelHiddenPositionOnScreen = -(cancelWidth + 1),
  animationDuration = 300;

var feedsValue = '';

class Search extends React.Component {
  state = {
    curFolder: 'inbox',
    feedsValue: '',
    load: false,
    animTop: new Animated.Value(positionOnScreen),
    animRight: new Animated.Value(0),
    cancelAnimRight: new Animated.Value(cancelHiddenPositionOnScreen),
    animOpacity: new Animated.Value(1)
  };
  trim(value) {
    var unallowedCharacters = /\/|\"|\'|\`|\^|\&|\$|\%|\*|\(|\)|\[|\]|\{|\}|\?|\;|\:|<|>|\+|\=|\#|\@|\!/g;
    value = value.trim().replace(unallowedCharacters, '').replace(/\s+/g, ' ');
    return value.length ? value : null;
  }
  valueChangedHandler = (text) => {
    feedsValue = this.trim(text);
  };
  submitHandler = () => {
    var value = feedsValue;
    if (!value) {
      return;
    }

    dismissKeyboard();
    var curFeeds = this.state.feedsValue;
    if (value !== curFeeds) {
      cache.flush();
      storage.set('feeds', value, err => {
        if (err) {
          return logs.captureError(err);
        }
        feedsValue = value;
        this.setState({
          feedsValue: value
        });
        EventManager.trigger('feedsAdded', {
          feeds: value
        });
      });
    } else {
      EventManager.trigger('feedsCheckNews');
    }
  };
  startLoadState = () => {
    this.setState({
      load: true
    });
  };
  stopLoadState = () => {
    this.setState({
      load: false
    });
  };
  show = () => {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: positionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 1
      })
    ]).start();
  };
  hide = () => {
    Animated.parallel([
      Animated.timing(this.state.animTop, {
        toValue: hiddenPositionOnScreen,
        duration: animationDuration
      }),
      Animated.timing(this.state.animOpacity, {
        toValue: 0
      })
    ]).start();
  };
  hideByListEvents = (options) => {
    var opts = options || {};
    if (opts.amount) {
      this.hide();
    } else if (this.state.curFolder === 'inbox') {
      this.show();
    }
  };
  folderChangeHandler = (options) => {
    var opts = options || {};
    this.setState({
      curFolder: opts.folder
    });
    if (opts.folder === 'favorites' || opts.folder === 'trash') {
      this.hide();
    } else {
      this.show();
    }
  };
  focusHandler = () => {
    Animated.parallel([
      Animated.timing(this.state.animRight, {
        toValue: cancelWidth,
        duration: animationDuration
      }),
      Animated.timing(this.state.cancelAnimRight, {
        toValue: cancelPositionOnScreen,
        duration: animationDuration
      })
    ]).start();
  };
  blurHandler = () => {
    Animated.parallel([
      Animated.timing(this.state.animRight, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(this.state.cancelAnimRight, {
        toValue: cancelHiddenPositionOnScreen,
        duration: animationDuration
      })
    ]).start();
  };
  cancelHandler = () => {
    dismissKeyboard();
  };
  componentDidMount = () => {
    storage.get('feeds', (err, feeds) => {
      if (err) {
        return logs.captureError(err);
      }
      feeds = feeds || '';
      if (feeds !== feedsValue) {
        feedsValue = feeds;
        this.setState({
          feedsValue: feeds
        });
        EventManager.trigger('feedsCheckNews');
      }
    });
    EventManager.on('feedsAdded feedsCheckNews notificationsClicked', this.startLoadState);
    EventManager.on('jobsReceived jobsNotReceived inboxError networkError', this.stopLoadState);
    EventManager.on('jobsSelected', this.hideByListEvents);
    EventManager.on('folderChanged', this.folderChangeHandler);
  };
  componentWillUnmount = () => {
    EventManager.off('feedsAdded feedsCheckNews notificationsClicked', this.startLoadState);
    EventManager.off('jobsReceived inboxError networkError', this.stopLoadState);
    EventManager.off('jobsSelected', this.hideByListEvents);
    EventManager.off('folderChanged', this.folderChangeHandler);
  };
  render() {
    var state = this.state,
      feeds = feedsValue || state.feedsValue;

    return (
      <Animated.View style={[styles.search, {top: state.animTop, opacity: this.state.animOpacity}]}>
        <Animated.View style={[styles.field_wrap, {marginRight: state.animRight}]}>
          <TextInput
            defaultValue={feeds}
            placeholder="Find Jobs"
            style={styles.searchField}
            onChangeText={this.valueChangedHandler}
            onFocus={this.focusHandler}
            onBlur={this.blurHandler}
            onSubmitEditing={this.submitHandler}
            enablesReturnKeyAutomatically={true}
            returnKeyType="search"
          />
          {state.load ?
            <ActivityIndicatorIOS
              animating={true}
              style={styles.submit_loader}
              color="#43AC12"
            /> :
            <TouchableOpacity style={styles.submit_wrap} onPress={this.submitHandler}>
              <Icon name="search" style={styles.submit} />
            </TouchableOpacity>
          }
        </Animated.View>
        <Animated.View style={[styles.cancel, {width: cancelWidth, right: state.cancelAnimRight}]}>
          <TouchableOpacity onPress={this.cancelHandler}>
            <Text style={styles.cancel_text}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.separator} />
      </Animated.View>
    );
  }
}

export default Search;