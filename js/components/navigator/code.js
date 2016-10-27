'use strict';

import React from 'react';
import {
  Navigator,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
import * as EventManager from '../../modules/events';
import * as device from '../../modules/device';
import Search from '../search/code';
import List from '../list/code';
import ListManager from '../list/manager-code';
import Errors from '../errors/code';
import Notifications from '../notifications/code';
import Tabs from '../tabs/code';
import Settings from '../settings/code';
import JobView from '../job-item/code';
import Overlay from '../overlay/code';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import logo from '../../../images/logo.png';

class FoldersView extends React.Component {
  render() {
    return (
      <View style={styles.foldersContainer}>
        <View style={styles.gap} />
        <List navigator={this.props.navigator} />
        <Errors navigator={this.props.navigator} parent="list" />
        <Notifications />
        <ListManager />
        <Search />
        <Tabs />
      </View>
    );
  }
}

class appNavigator extends React.Component {
  settingsClickHandler = () => {
    var navigator = this.refs.nav,
      routes = navigator.getCurrentRoutes(),
      curRoute = routes[routes.length - 1];

    if (curRoute.id !== 'settings') {
      navigator.push({
        title: 'Settings',
        id: 'settings'
      });
    }
  };
  _navBarRouteMapper = () => {
    return {
      LeftButton: function(route, navigator) {
        return route.id === 'inbox' ? null :
          <TouchableOpacity style={styles.crumbIconPlaceholder} onPress={() => { navigator.pop(); }}>
            <Icon name="arrow-left" style={styles.crumbIcon} />
          </TouchableOpacity>
      },
      Title: (route) => {
        console.log(route.id);
        if (route.id === 'inbox') {
          return (
            <View style={styles.title}>
              <Text style={styles.title_blank}>&nbsp;</Text>
              <Text style={[styles.title_item, styles.title_logo]} ref={component => this.titleEl = component}>
                <Image
                  style={styles.logo}
                  source={logo}
                />
              </Text>
              <Text style={[styles.title_item, styles.title_folder]} ref={component => this.titleFavoritesEl = component}>
                Favorites
              </Text>
              <Text style={[styles.title_item, styles.title_folder]} ref={component => this.titleTrashEl = component}>
                Trash
              </Text>
            </View>
          );
        } else {
          return (
            <View style={styles.title}>
              <Text style={styles.title_plain}>{route.title}</Text>
            </View>
          );
        }
      },
      RightButton: (route) => {
        return route.id === 'settings' ? null : (
          <TouchableOpacity style={styles.crumbIconPlaceholder} onPress={this.settingsClickHandler}>
            <Icon name="sliders" style={styles.crumbIcon} />
          </TouchableOpacity>
        );
      }
    }
  };
  renderScene(route, navigator) {
    var component;
    switch (route.id) {
      case 'inbox':
        component = <FoldersView navigator={navigator} />;
        break;
      case 'job_view':
        component = <JobView {...route.job_data} navigator={navigator} />;
        break;
      case 'settings':
        component = <Settings />;
        break;
    }
    return component;
  }
  componentDidMount() {
    EventManager.on('folderChanged', (options) => {
      var opts = options || {},
        titles = [
          'titleEl',
          'titleFavoritesEl',
          'titleTrashEl'
        ],
        activeTitle;

      switch (opts.folder) {
        case 'inbox':
          activeTitle = 'titleEl';
          break;
        case 'favorites':
          activeTitle = 'titleFavoritesEl';
          break;
        case 'trash':
          activeTitle = 'titleTrashEl';
          break;
      }
      this[activeTitle].setNativeProps({
        style: {
          top: 6
        }
      });
      _.each(_.without(titles, activeTitle), (item) => {
        this[item].setNativeProps({
          style: {
            top: -100
          }
        });
      });
    });
    EventManager.on('jobItemOpened', (options) => {
      var opts = options || {},
        title = opts.title,
        maxTitleLength = device.isTablet() ? 40 : 20;

      if (title.length > maxTitleLength) {
        title = title.substring(0, maxTitleLength) + '...';
      }

      this.refs.nav.push({
        title: title,
        id: 'job_view',
        job_data: opts
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref="nav"
          initialRoute={{
            title: config.APP_NAME,
            type: 'tab',
            id: 'inbox'
          }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={this._navBarRouteMapper()}
            />
          }
          style={styles.navigator}
        />
        {Platform.OS === 'ios' ? <Overlay /> : null}
      </View>
    );
  }
}

export default appNavigator;
