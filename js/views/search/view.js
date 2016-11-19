'use strict';

import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

const animationDuration = 300;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.search.visible,
      feeds: props.search.feeds,
      trimReg: /\/|\"|\'|\`|\^|\&|\$|\%|\*|\(|\)|\[|\]|\{|\}|\?|\;|\:|<|>|\+|\=|\#|\@|\!/g,
      animTop: new Animated.Value(0)
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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
  show() {
    Animated.timing(this.state.animTop, {
      toValue: 0,
      duration: animationDuration
    }).start();
  }
  hide() {
    Animated.timing(this.state.animTop, {
      toValue: -50,
      duration: animationDuration
    }).start();
  };
  componentWillReceiveProps(newProps) {
    this.setState({
      visible: newProps.search.visible,
      feeds: newProps.search.feeds
    });
  }
  componentDidUpdate() {
    if (this.state.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
  componentDidMount = async () => {
    if (await this.props.checkPreviousRequest()) {
      this.props.addFeedsRequest(this.state.feeds);
    }
  };
  render() {
    var state = this.state,
      props = this.props;

    return (
      <View style={styles.wrap}>
        <Animated.View
          style={{
            marginTop: state.animTop
          }}
        >
          <TextInput
            defaultValue={state.feeds}
            value={state.feeds}
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
        </Animated.View>
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
