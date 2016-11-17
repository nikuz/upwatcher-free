'use strict';

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: props.search.feeds,
      trimReg: /\/|\"|\'|\`|\^|\&|\$|\%|\*|\(|\)|\[|\]|\{|\}|\?|\;|\:|<|>|\+|\=|\#|\@|\!/g
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  trim(value) {
    return value
      .trim()
      .replace(this.state.trimReg, '')
      .replace(/\s+/g, ' ');
  }
  onChangeText(value) {
    this.setState({
      feeds: this.trim(value)
    });
  }
  submitHandler() {
    dismissKeyboard();
    this.props.addFeedsRequest(this.state.feeds);
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      feeds: newProps.search.feeds
    });
  }
  componentDidMount = async () => {
    if (await this.props.checkPreviousRequest()) {
      this.props.addFeedsRequest(this.state.feeds);
    }
  };
  render() {
    var props = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          defaultValue={this.state.feeds}
          value={this.state.feeds}
          placeholder="Find Work"
          placeholderTextColor="#999"
          editable={!props.search.loading}
          style={styles.field}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.submitHandler}
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid="transparent"
          returnKeyType="search"
        />
        {props.search.loading ?
          <ActivityIndicator size="small" style={styles.submit_loader} />
          :
          <TouchableOpacity style={styles.submit_wrap} onPress={this.submitHandler}>
            <MaterialIcons name="search" style={styles.submit_icon} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

Search.propTypes = {
  search: React.PropTypes.object.isRequired,
  addFeedsRequest: React.PropTypes.func.isRequired,
  checkPreviousRequest: React.PropTypes.func.isRequired
};

export default Search;
