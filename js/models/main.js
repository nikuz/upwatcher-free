'use strict';

import store from '../store';

import * as settingsModel from './settings';
import * as searchModel from './search';
import * as feedsModel from './feeds';
import * as favoritesModel from './favorites';
import * as settingsActions from '../actions/settings';
import * as searchActions from '../actions/search';
import * as feedsActions from '../actions/feeds';
import * as favoritesActions from '../actions/favorites';

export default async function() {
  var settings = await settingsModel.get(),
    feedsRequest = await searchModel.get(),
    feeds = await feedsModel.get(),
    favorites = await favoritesModel.get();

  store.dispatch(settingsActions.defaultSet(settings));
  store.dispatch(searchActions.defaultSet(feedsRequest));
  store.dispatch(favoritesActions.defaultSet(favorites));
  store.dispatch(feedsActions.defaultSet(feeds));
}
