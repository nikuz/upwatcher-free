'use strict';

import React from 'react';
import {
  View,
  Text,
  Animated
} from 'react-native';
import * as EventManager from '../../modules/events';
import Manager from '../manager/code';
import * as device from '../../modules/device';
import styles from './style';

const positionOnScreen = 0,
  hiddenPositionOnScreen = -40,
  animationDuration = 300;

class ListManager extends React.Component {
  state = {
    curFolder: 'inbox',
    animTop: new Animated.Value(hiddenPositionOnScreen),
    animOpacity: new Animated.Value(0),
    animTooltipOpacity: new Animated.Value(0)
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
  jobsSelectHandler = (options) => {
    var opts = options || {};
    if (this.state.curFolder === 'inbox') {
      if (opts.amount) {
        this.show();
      } else {
        this.hide();
      }
    }
  };
  folderChangeHandler = (options) => {
    var opts = options || {};
    this.setState({
      curFolder: opts.folder
    });
    if (opts.folder === 'favorites' || opts.folder === 'trash') {
      this.show();
    } else {
      this.hide();
    }
  };
  unselectAllHandler = () => {
    Animated.timing(this.state.animTooltipOpacity, {
      toValue: 1
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.animTooltipOpacity, {
        toValue: 0
      }).start();
    }, 1500);
  };
  componentDidMount = () => {
    EventManager.on('jobsSelected', this.jobsSelectHandler);
    EventManager.on('folderChanged', this.folderChangeHandler);
    EventManager.on('listBecomeEmpty', this.hide);
    EventManager.on('listHaventSelectedItems', this.unselectAllHandler);
  };
  componentWillUnmount() {
    EventManager.off('jobsSelected', this.jobsSelectHandler);
    EventManager.off('folderChanged', this.folderChangeHandler);
    EventManager.off('listBecomeEmpty', this.hide);
    EventManager.off('listHaventSelectedItems', this.unselectAllHandler);
  };
  render() {
    var state = this.state,
      isFavoritesFolder = state.curFolder === 'favorites',
      buttons = {
        select: true,
        favorites: isFavoritesFolder ? 'disabled' : true,
        trash: true
      };

    if (state.curFolder === 'inbox') {
      buttons.read = true;
    }

    return (
      <Animated.View style={[styles.manager, {top: state.animTop, opacity: state.animOpacity}]}>
        <Manager {...buttons} />
        {state.curFolder !== 'inbox' ?
          <Animated.View style={[styles.manager_tooltip, {opacity: state.animTooltipOpacity}]}>
            <Text style={styles.manager_tooltip_text}>First select the job</Text>
          </Animated.View>
          : null
        }
      </Animated.View>
    );
  }
}

export default ListManager;