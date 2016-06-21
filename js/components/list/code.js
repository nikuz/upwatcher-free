'use strict';

import React from 'react';
import {
  View,
  ListView,
  ScrollView,
  Text,
  RefreshControl,
  ActivityIndicatorIOS,
  Platform
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
import * as EventManager from '../../modules/events';
import * as navigatorHelpers from '../../modules/navigator';
import * as folders from '../../modules/folders';
import * as storage from '../../modules/storage';
import * as cache from '../../modules/cache';
import * as badge from '../../modules/badge';
import * as logs from '../../modules/logs';
import ListItem from './item-code';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class List extends React.Component {
  state = {
    curFolder: 'inbox',
    curPage: 1,
    full: false,
    empty: true,
    feeds: null,
    load: true,
    items: [],
    selectedCount: 0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return row1 !== row2
          || row1.selected !== row2.selected
          || row1.is_new !== row2.is_new;
      }
    }),
    isLoadingTail: false
  };
  cloneItems = () => {
    return JSON.parse(JSON.stringify(this.state.items));
  };
  getJobs = () => {
    var feeds = this.state.feeds,
      curFolder = this.state.curFolder,
      curPage = this.state.curPage;

    if (curFolder === 'inbox' && !feeds) {
      return;
    }
    this.setState({
      load: true
    });
    EventManager.trigger('listStartUpdate');

    folders.getJobs({
      folder: curFolder,
      page: curPage
    }, (err, response) => {
      var state = {
        load: false
      };
      if (err) {
        EventManager.trigger('inboxError');
        logs.captureMessage(err);
      } else {
        EventManager.trigger('jobsReceived');
        var jobs = response || [],
          listItems = this.state.items;

        if (jobs.length) {
          state.empty = false;
        } else if (listItems.length) {
          state.full = true;
          if (curFolder === 'inbox') {
            jobs.push({
              empty: true
            });
          }
        } else {
          state.empty = true;
          EventManager.trigger('listBecomeEmpty');
        }
        if(!state.empty || state.full) {
          if (curPage !== 1) {
            jobs = listItems.concat(jobs);
          }
          state.items = jobs;
          state.dataSource = this.state.dataSource.cloneWithRows(jobs);
        }
      }
      this.setState(state);
      this.onListUpdate();
    });
  };
  itemSelect = (item, isSelect, items) => {
    var curItems = items || this.cloneItems(),
      selectedItems = 0;

    if (item === 'all') {
      _.each(curItems, item => {
        if (!item.full) {
          item.selected = isSelect;
        }
      });
    } else {
      item = _.findWhere(curItems, {id: item});
      if (_.isUndefined(isSelect)) {
        isSelect = !item.selected;
      }
      item.selected = isSelect;
    }
    _.each(curItems, function(item) {
      if (item.selected) {
        selectedItems += 1;
      }
    });
    this.setState({
      items: curItems,
      selectedCount: selectedItems,
      dataSource: this.state.dataSource.cloneWithRows(curItems)
    });
    EventManager.trigger('jobsSelected', {
      amount: selectedItems
    });
  };
  itemRemove = (items, targetFolder = 'trash') => {
    var curItems = this.cloneItems(),
      hiddenItemsCount = 0;

    _.each(items, item => {
      if (item.full) {
        return;
      }
      item = _.findWhere(curItems, {id: item});
      if (item.selected) {
        this.state.selectedCount -= 1;
      }
      _.extend(item, {
        hidden: true,
        selected: false
      });
    });
    this.setState({
      items: curItems,
      dataSource: this.state.dataSource.cloneWithRows(curItems)
    });
    folders.moveJobs(items, this.state.curFolder, targetFolder);
    _.each(curItems, function(item) {
      if (item.hidden) {
        hiddenItemsCount += 1;
      }
    });
    if (hiddenItemsCount === curItems.length) {
      setTimeout(() => {
        var items = [];
        this.setState({
          curPage: 1,
          items: items,
          dataSource: this.state.dataSource.cloneWithRows(items)
        });
        this.getJobs();
      }, 500);
    }
    if (!this.state.selectedCount) {
      EventManager.trigger('jobsSelected', {
        amount: 0
      });
    }
    badge.update();
  };
  itemOpen = (itemId) => {
    if (this.state.selectedCount) {
      this.itemSelect(itemId);
    } else {
      let curItems = this.cloneItems(),
        item = _.findWhere(curItems, {id: itemId});

      cache.update(item.id, {
        is_new: false,
        watched: true
      });
      badge.update();

      EventManager.trigger('jobItemOpened', item);
      _.extend(item, {
        is_new: false,
        watched: true
      });
      this.setState({
        items: curItems,
        dataSource: this.state.dataSource.cloneWithRows(curItems)
      });
    }
  };
  itemRead = () => {
    var curItems = this.cloneItems(),
      itemsToUpdate = [];

    _.each(curItems, item => {
      if (item.selected) {
        item.is_new = false;
        itemsToUpdate.push({
          id: item.id,
          data: {
            is_new: false
          }
        });
      }
    });
    this.itemSelect('all', false, curItems);
    folders.updateItem({
      items: itemsToUpdate,
      folder: this.state.curFolder
    });
    badge.update();
  };
  scrollHandler = (e) => {
    e = e.nativeEvent;
    var state = this.state,
      scrollTarget = e.contentSize.height - e.layoutMeasurement.height,
      curScroll = e.contentOffset.y;

    if (scrollTarget > 0 && curScroll > scrollTarget && !state.isLoadingTail && !state.full) {
      this.setState({
        curPage: this.state.curPage + 1,
        isLoadingTail: true
      });
      this.getJobs();
    }
  };
  checkNewItems = () => {
    this.setState({
      load: true,
      checkNew: true
    });
    folders.checkNew({
      folder: 'inbox'
    }, (err, response) => {
      var state = {
        load: false,
        checkNew: false
      };
      if (err) {
        EventManager.trigger('inboxError');
      } else {
        state.curPage = response ? 1 : this.state.curPage;
        if (!response) {
          EventManager.trigger('jobsNotReceived');
        }
      }
      this.setState(state);
      if (!err && response) {
        this.getJobs();
      }
      badge.update();
    });
  };
  listManagerEventsHandler = (e) => {
    var curRoute = navigatorHelpers.getCurRoute(this.props.navigator);
    if (curRoute.id === 'job_view') {
      return;
    }
    if (!this.state.selectedCount) {
      EventManager.trigger('listHaventSelectedItems');
    } else {
      let selectedItems = [],
        targetFolder = 'trash';

      if (e.name === 'btnFavoritesClicked') {
        targetFolder = 'favorites';
      }
      _.each(this.state.items, item => {
        if (item.selected) {
          selectedItems.push(item.id);
        }
      });
      this.itemRemove(selectedItems, targetFolder);
    }
  };
  feedsAddedHandler = (options) => {
    var opts = options || {};
    this.setState({
      curPage: 1,
      items: [],
      feeds: opts.feeds
    });
    this.getJobs();
  };
  checkNewItemsHandler = () => {
    if (this.refs.listview) {
      this.refs.listview.getScrollResponder().scrollTo(0, 0);
    }
    this.checkNewItems();
  };
  folderChangeHandler = (options) => {
    if (this.refs.listview) {
      this.refs.listview.getScrollResponder().scrollTo(0, 0);
    }
    var opts = options || {};
    this.setState({
      curPage: 1,
      items: [],
      load: true,
      dataSource: this.state.dataSource.cloneWithRows([]),
      curFolder: opts.folder,
      full: false
    });
    this.getJobs();
  };
  selectAllHandler = (options) => {
    var opts = options || {};
    this.itemSelect('all', opts.select);
  };
  readHandler = () => {
    if (!this.state.selectedCount) {
      EventManager.trigger('listHaventSelectedItems');
    } else {
      this.itemRead();
    }
  };
  itemChangeFolderHandler = (options) => {
    var opts = options || {},
      id = opts.id,
      folder = opts.folder;

    if (id && folder) {
      this.itemRemove([id], folder);
    }
  };
  settingsChangedHandler = (options) => {
    var opts = options || {};
    if (opts.needToUpdateCache && this.state.feeds) {
      cache.flush();
      this.setState({
        curPage: 1,
        items: [],
        dataSource: this.state.dataSource.cloneWithRows([])
      });
      EventManager.trigger('folderChanged', {
        folder: 'inbox'
      });
    }
  };
  componentDidMount = () => {
    storage.get('feeds', (err, feeds) => {
      if (err) {
        logs.captureError(err);
      } else {
        this.setState({
          load: false,
          feeds: feeds ? feeds : null
        });
        if (feeds) {
          this.getJobs();
        }
      }
    });
    EventManager.on('feedsAdded', this.feedsAddedHandler);
    EventManager.on('feedsCheckNews notificationsClicked', this.checkNewItemsHandler);
    EventManager.on('folderChanged', this.folderChangeHandler);
    EventManager.on('btnSelectAllClicked', this.selectAllHandler);
    EventManager.on('btnFavoritesClicked btnTrashClicked', this.listManagerEventsHandler);
    EventManager.on('btnReadClicked', this.readHandler);
    EventManager.on('jobHasFolderChanged', this.itemChangeFolderHandler);
    EventManager.on('settingsSaved', this.settingsChangedHandler);
  };
  componentWillUnmount = () => {
    EventManager.off('feedsAdded', this.feedsAddedHandler);
    EventManager.off('feedsCheckNews notificationsClicked', this.checkNewItemsHandler);
    EventManager.off('folderChanged', this.folderChangeHandler);
    EventManager.off('btnSelectAllClicked', this.selectAllHandler);
    EventManager.off('btnReadClicked', this.readHandler);
    EventManager.off('jobHasFolderChanged', this.itemChangeFolderHandler);
    EventManager.off('settingsSaved', this.settingsChangedHandler);
  };
  onListUpdate = () => {
    if (this.state.isLoadingTail) {
      setTimeout(() => {
        this.setState({
          isLoadingTail: false
        });
      }, 1500);
    }
  };
  renderScrollComponent = () => {
    var refreshControl = null;
    if (this.state.curFolder === 'inbox') {
      refreshControl = <RefreshControl
        tintColor="#43AC12"
        refreshing={this.state.load}
        onRefresh={this.checkNewItems}
      />;
    }
    return <ScrollView
      refreshControl={refreshControl}
      onScroll={this.scrollHandler}
      scrollEventThrottle={1}
      automaticallyAdjustContentInsets={true}
      directionalLockEnabled={true}
    />
  };
  renderRow = (item) => {
    if (item.empty) {
      return (
        <View style={styles.jl_response_empty}>
          <Text style={styles.jl_info_text}>No more jobs that match your search</Text>
        </View>
      );
    } else {
      return (
        <ListItem
          {...item}
          key={item.id}
          remove={this.itemRemove}
          select={this.itemSelect}
          open={this.itemOpen}
        />
      );
    }
  };
  renderFooter = () => {
    if (!this.state.isLoadingTail) {
      return null;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
    }
  };
  render() {
    var state = this.state;
    if ((!state.load || state.isLoadingTail || state.checkNew) && !state.empty) {
      return (
        <View style={styles.jobs_list_wrap}>
          <ListView
            ref="listview"
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderFooter={this.renderFooter}
            renderScrollComponent={this.renderScrollComponent}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps={true}
            automaticallyAdjustContentInsets={false}
            initialListSize={config.JOBS_PER_PAGE}
            pageSize={config.JOBS_PER_PAGE}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }
    if (!state.feeds && !state.load && state.curFolder === 'inbox') {
      return (
        <View style={styles.jl_info}>
          <View style={styles.jl_info_cont}>
            <Icon name="arrow-up" style={styles.jl_info_fa} />
            <Text style={styles.jl_info_text}>Please write your query</Text>
            <Text style={styles.jl_info_text}>to the field above</Text>
          </View>
        </View>
      );
    }
    if (state.empty && state.curFolder !== 'inbox') {
      let folderName = state.curFolder.charAt(0).toUpperCase() + state.curFolder.slice(1),
        icon = state.curFolder === 'favorites' ? 'star' : 'trash';

      return (
        <View style={styles.jl_info}>
          <View style={styles.jl_info_cont}>
            <Icon name="folder-open-o" style={[styles.jl_info_fa, styles.jl_info_fa_folder]} />
            <Text style={[styles.jl_info_title, styles.jl_info_text]}>{folderName} is empty</Text>
            <Text style={styles.jl_info_descr}>Do a long press on specific job and</Text>
            <Text style={styles.jl_info_descr}>
              do a short tap on <Icon name={icon} style={styles.jl_info_text_icon} /> button
            </Text>
            <Text style={styles.jl_info_descr}>to add job here</Text>
          </View>
        </View>
      );
    }
    if (state.feeds && !state.load && state.empty && state.curFolder === 'inbox') {
      return (
        <View style={styles.jl_response_empty}>
          <Text style={styles.jl_info_text}>Upwork didn't find any jobs that match your search. Please modify your search to expand it.</Text>
        </View>
      );
    }
    if (state.load) {
      return (
        <View style={styles.jl_info}>
          <View style={styles.jl_info_cont}>
            <ActivityIndicatorIOS
              animating={true}
              size="large"
              color="#43AC12"
            />
          </View>
        </View>
      );
    }
  }
}

export default List;