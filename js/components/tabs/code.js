'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
import * as EventManager from '../../modules/events';
import * as storage from '../../modules/storage';
import * as logs from '../../modules/logs';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

var activeTab = 'inbox';

class Tabs extends React.Component {
  state = {
    curTab: 'inbox',
    visible: false,
    tabs: [{
      name: 'Search',
      value: 'inbox',
      icon: 'search',
      jobs_count: 0
    }, {
      name: 'Favorites',
      value: 'favorites',
      icon: 'star',
      jobs_count: 0
    }, {
      name: 'Trash',
      value: 'trash',
      icon: 'trash',
      jobs_count: 0
    }]
  };
  changeFolderHandler = (options) => {
    var opts = options || {};
    activeTab = opts.folder;
    this.setState({
      curTab: opts.folder
    });
  };
  handlerClick = (tab, name) => {
    if (tab === activeTab) {
      return;
    }
    if (tab === 'inbox') {
      name = config.APP_NAME;
    }
    activeTab = tab;
    EventManager.trigger('folderChanged', {
      folder: tab,
      folderName: name
    });
    this.setState({
      curTab: tab
    });
  };
  show = () => {
    this.setState({
      visible: true
    });
  };
  hide = () => {
    if (activeTab === 'inbox') {
      this.setState({
        visible: false
      });
    }
  };
  updateCounters = () => {
    var tabs = this.state.tabs;
    storage.get(['favorites', 'trash', 'found_jobs'], (err, response) => {
      if (err) {
        return logs.captureError(err);
      }

      var favorites = response.favorites || [],
        trash = response.trash || [],
        found_jobs = response.found_jobs;

      var searchTab = tabs[0],
        favoritesTab = tabs[1],
        trashTab = tabs[2];

      searchTab.jobs_count = found_jobs;
      favoritesTab.jobs_count = favorites.length;
      trashTab.jobs_count = trash.length;
      this.setState({
        tabs
      });
    });
  };
  gotNewJobsCountHandler = (options) => {
    var opts = options || {},
      tabs = this.state.tabs,
      searchTab = tabs[0];

    searchTab.jobs_count = opts.count;
    this.setState({
      tabs
    });
  };
  componentDidMount = () => {
    this.updateCounters();
    EventManager.on('jobsReceived', this.show);
    // folder can be changed by other components, need to change active one
    EventManager.on('folderChanged', this.changeFolderHandler);
    EventManager.on('jobsMovedToFolder', this.updateCounters);
    EventManager.on('gotNewJobsCount', this.gotNewJobsCountHandler);
  };
  componentWillUnmount = () => {
    EventManager.off('jobsReceived', this.show);
    EventManager.off('folderChanged', this.changeFolderHandler);
    EventManager.off('jobsMovedToFolder', this.updateCounters);
    EventManager.off('gotNewJobsCount', this.gotNewJobsCountHandler);
  };
  render() {
    var state = this.state;
    if (state.visible) {
      return (
        <View style={styles.tabs}>
          {state.tabs.map(tab => {
            var activeStyle = tab.value === state.curTab ? styles.tab_active_color : null,
              activeStyleCounter = tab.value === state.curTab ? styles.tab_active_counter : null;

            return (
              <TouchableHighlight
                key={tab.value}
                underlayColor="#eee"
                style={styles.tab_item}
                onPress={this.handlerClick.bind(null, tab.value, tab.name)}
              >
                <View style={styles.tab_cont}>
                  <View>
                    <Icon name={tab.icon} style={[styles.icon, activeStyle]} />
                    {tab.jobs_count ?
                      <View style={[styles.counter, activeStyleCounter]}>
                        <Text style={[styles.counter_text, activeStyle]}>{tab.jobs_count}</Text>
                      </View>
                      : null
                    }
                  </View>
                  <Text style={[styles.name, activeStyle]}>{tab.name}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Tabs;
