'use strict';

import React from 'react';
import {
  View,
  Text,
  ListView
} from 'react-native';
import * as _ from 'underscore';
import {deepClone} from '../../modules/object';
import FeedsItem from '../../components/feeds-list-item/code';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class FavoritesBlank extends React.Component {
  render() {
    return (
      <View style={styles.blank_wrap}>
        <View style={styles.blank_cont}>
          <Text style={styles.blank_text}>
            To add work here, choose a work offer
            which you like by <MaterialIcons name="favorite" style={styles.blank_icon} /> icon
          </Text>
        </View>
      </View>
    );
  }
}

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var favorites = this.makeFavorites(props.favorites);
    this.state = {
      dataSource: ds.cloneWithRows(favorites)
    };
    this.renderRow = this.renderRow.bind(this);
    this.openHandler = this.openHandler.bind(this);
    this.onFavoriteClick = this.onFavoriteClick.bind(this);
  }
  makeFavorites(favorites) {
    favorites = deepClone(favorites);
    _.each(favorites, function(item) {
      item.favorite = true;
    });
    return favorites;
  }
  openHandler(item) {
    this.props.pushState('preview', item);
  }
  onFavoriteClick(item) {
    this.props.removeFromFavorites(item.id);
  }
  shouldComponentUpdate = () => false;
  renderRow(item) {
    return (
      <FeedsItem
        data={item}
        openHandler={this.openHandler}
        onFavoriteClick={this.onFavoriteClick}
        animatedAnnihilation={true}
      />
    );
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.list_container}
      />
    );
  }
}

Favorites.propTypes = {
  favorites: React.PropTypes.array.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  pushState: React.PropTypes.func.isRequired
};

class FavoritesManager extends React.Component {
  render() {
    var props = this.props;
    return (
      <View style={styles.container}>
        {!props.favorites.length ?
          <FavoritesBlank />
          :
          <Favorites {...props} />
        }
      </View>
    );
  }
}

FavoritesManager.propTypes = {
  favorites: React.PropTypes.array.isRequired,
  removeFromFavorites: React.PropTypes.func.isRequired,
  pushState: React.PropTypes.func.isRequired
};

export default FavoritesManager;
