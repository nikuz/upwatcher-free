'use strict';

import React from 'react';
import {
  View,
  Text,
  Slider
} from 'react-native';
import commonStyles from '../style';
import styles from './style';

class SliderEl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      sliderStep: 100,
      maxValue: 10000
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.completeHandler = this.completeHandler.bind(this);
  }
  changeHandler(value) {
    this.setState({
      value: value
    });
  }
  completeHandler() {
    this.props.changeHandler('budgetFrom', this.state.value);
  }
  render() {
    var state = this.state,
      props = this.props,
      value = state.value || props.value;

    return (
      <View style={styles.wrapper}>
        <View style={styles.cont}>
          <Text style={commonStyles.item_title}>{props.title}</Text>
          <Text style={commonStyles.item_value}>{value}+</Text>
        </View>
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={state.maxValue}
          step={state.sliderStep}
          minimumTrackTintColor="#CCC"
          maximumTrackTintColor="#6fda44"
          onValueChange={this.changeHandler}
          onSlidingComplete={this.completeHandler}
        />
      </View>
    );
  }
}

SliderEl.propTypes = {
  changeHandler: React.PropTypes.func.isRequired,
  value: React.PropTypes.number.isRequired
};

export default SliderEl;
