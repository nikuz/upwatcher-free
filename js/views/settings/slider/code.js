'use strict';

import React from 'react';
import {
  View,
  Text,
  Slider
} from 'react-native';
import commonStyles from '../style';

class SliderEl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      sliderStep: 100
    };
    this.changeHandler = this.changeHandler.bind(this);
  }
  changeHandler(value) {
    this.setState({
      value: value
    });
    this.props.handler([{
      name: 'budgetFrom',
      value: value
    }]);
  };
  render() {
    var value = this.state.value || this.props.value,
      valueStr = '',
      values = this.props.values,
      maxValue = Number(values[values.length - 1]);

    if (value !== 10000) {
      valueStr = <Text style={commonStyles.item_value}>{value} &mdash; 10&thinsp;000+</Text>;
    } else {
      valueStr = <Text style={commonStyles.item_value}>10&thinsp;000+</Text>;
    }

    return (
      <View style={commonStyles.item}>
        <Text style={commonStyles.item_title}>{this.props.title}</Text>
        {valueStr}
        <Slider
          value={value}
          minimumValue={0}
          maximumValue={maxValue}
          step={this.state.sliderStep}
          minimumTrackTintColor="#CCC"
          maximumTrackTintColor="#6fda44"
          onSlidingComplete={this.changeHandler}
        />
      </View>
    );
  }
}

SliderEl.propTypes = {
  handler: React.PropTypes.func.isRequired,
  values: React.PropTypes.array.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default SliderEl;
