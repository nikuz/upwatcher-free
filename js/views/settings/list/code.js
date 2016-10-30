'use strict';

import React from 'react';
import {
  View,
  Text,
  Picker,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import * as _ from 'underscore';
import * as device from '../../../modules/device';
import Selector from '../selector/code';
import PickerAndroid from '../../../components/picker-android/code';
import * as overlayActions from '../../../actions/overlay';
import appStore from '../../../store';
import commonStyles from '../style';
import styles from './style';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
    this.openHandler = this.openHandler.bind(this);
    this.downloadAgainHandler = this.downloadAgainHandler.bind(this);
    this.pickerGenerator = this.pickerGenerator.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
  }
  pickerGenerator() {
    var props = this.props,
      value = props.value;

    if (device.isAndroid()) {
      return <PickerAndroid
        values={props.values}
        value={value}
        onValueChange={this.changeHandler}
      />
    } else {
      return (
        <Picker
          selectedValue={value}
          onValueChange={this.changeHandler}
        >
          {props.values.map(item => {
            var key = _.keys(item)[0],
              value = _.values(item)[0];

            return (
              <Picker.Item
                key={key}
                value={value}
                label={value}
              />
            );
          })}
        </Picker>
      );
    }
  }
  openHandler() {
    // if (this.state.opened) {
    //
    // } else {
    //   appStore.dispatch(overlayActions.close());
    // }
    let props = this.props,
      values = props.values,
      selectorContent;

    // if (this.state.err) {
    //   selectorContent = (
    //     <View style={styles.error}>
    //       <Text style={styles.error_text}>Something went wrong, please try again</Text>
    //       <TouchableHighlight style={styles.retry_btn} onPress={this.downloadAgainHandler} underlayColor="#69cb3c">
    //         <Text style={styles.retry_btn_text}>Try again</Text>
    //       </TouchableHighlight>
    //     </View>
    //   );
    // } else if (!values.length) {
    if (!values.length) {
      selectorContent = (
        <View style={styles.waiting}>
          <ActivityIndicator color="#43AC12" size="large" />
        </View>
      );
    } else {
      selectorContent = this.pickerGenerator();
    }

    appStore.dispatch(overlayActions.open({
      navigator: false,
      transparent: true,
      component: <Selector
        title={props.title}
        content={selectorContent}
        saveHandler={this.saveHandler}
        cancelHandler={this.cancelHandler}
      />
    }));

    // var openHandler = this.props.openHandler;
    // if (openHandler && !this.props.values.length) {
    //   openHandler((err, response) => {
    //     var state = {
    //       err: null
    //     };
    //     if (err) {
    //       state.err = err;
    //     } else {
    //       response = response || [];
    //       _.extend(state, {
    //         values: response,
    //         selectedValue: _.keys(response[0])[0]
    //       });
    //     }
    //     this.setState(state);
    //   });
    // }
  }
  downloadAgainHandler() {
    // this.setState({
    //   err: null,
    //   values: []
    // });
    // this.openHandler();
  }
  changeHandler(value) {
    if (device.isAndroid()) {
      this.props.changeHandler(this.props.name, value);
      appStore.dispatch(overlayActions.close());
    } else {
      this.setState({
        tempValue: value
      });
    }
  }
  saveHandler() {
    var value = this.state.tempValue;
    if (value) {
      this.props.changeHandler(this.props.name, value);
      appStore.dispatch(overlayActions.close());
    }
  }
  cancelHandler() {
    appStore.dispatch(overlayActions.close());
  }
  render() {
    var props = this.props,
      value = props.value,
      previewCont,
      disabled = this.props.disabled;

    previewCont = (
      <View style={disabled ? commonStyles.item_disabled : null}>
        <Text style={commonStyles.item_title}>{props.title}</Text>
        <Text style={commonStyles.item_value}>{value}</Text>
      </View>
    );

    return (
      <View>
        {disabled ?
          <View style={commonStyles.item}>{previewCont}</View>
          :
          <TouchableHighlight style={commonStyles.item} onPress={this.openHandler} underlayColor="#EDEDED">
            {previewCont}
          </TouchableHighlight>
        }
      </View>
    );
  }
}

List.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  values: React.PropTypes.array.isRequired,
  changeHandler: React.PropTypes.func.isRequired,
  openHandler: React.PropTypes.func
};

export default List;
