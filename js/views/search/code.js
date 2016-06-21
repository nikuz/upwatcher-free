'use strict';

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import * as EventManager from '../../modules/events';
import * as storage from '../../modules/storage';
import * as cache from '../../modules/cache';
import * as logs from '../../modules/logs';
import Loading from '../../components/loading/code';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

import * as upworkController from '../../controllers/upwork';

class Search extends React.Component {
  state = {
    searchValue: '',
    loading: false,
    trimReg: /\/|\"|\'|\`|\^|\&|\$|\%|\*|\(|\)|\[|\]|\{|\}|\?|\;|\:|<|>|\+|\=|\#|\@|\!/g
  };
  trim(value) {
    return value
      .trim()
      .replace(this.state.trimReg, '')
      .replace(/\s+/g, ' ');
  }
  onChangeText = (value) => {
    this.setState({
      searchValue: value
    });
  };
  submitHandler = async () => {
    var state = this.state,
      searchValue = this.trim(state.searchValue);

    if (searchValue !== '') {
      dismissKeyboard();
      await storage.set('search', searchValue);
      upworkController.getFeeds({
        q: searchValue,
        sort: 'create_time desc'
      }, function(err, response) {
        console.log(err);
        console.log(response);
      })
    }
  };
  componentDidMount = async () => {
    this.setState({
      searchValue: await storage.get('search')
    });
  };
  render() {
    var state = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          defaultValue={state.feedsValue}
          placeholder="Find Jobs"
          placeholderTextColor="#999"
          editable={!state.loading}
          style={styles.field}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.submitHandler}
          enablesReturnKeyAutomatically={true}
          returnKeyType="search"
        />
        {state.load ?
          <Loading size="small" />
          :
          <TouchableOpacity style={styles.submit_wrap} onPress={this.submitHandler}>
            <Icon name="search" style={styles.submit} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default Search;
