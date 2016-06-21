'use strict';

import React from 'react';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import * as EventManager from '../../modules/events';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class Manager extends React.Component {
  state = {
    allSelected: false
  };
  handlerClick(type) {
    switch (type) {
      case 'select':
        this.setState({
          allSelected: !this.state.allSelected
        });
        EventManager.trigger('btnSelectAllClicked', {
          select: this.state.allSelected
        });
        break;
      case 'favorites':
        EventManager.trigger('btnFavoritesClicked');
        break;
      case 'trash':
        EventManager.trigger('btnTrashClicked');
        break;
      case 'read':
        EventManager.trigger('btnReadClicked');
        break;
      case 'share':
        EventManager.trigger('btnShareClicked');
        break;
    }
  };
  renderTouchElement(exists, style, childs, type) {
    if (exists) {
      if (exists === 'disabled') {
        return (
          <View style={[style, styles.msiw_disabled]}>
            {childs}
          </View>
        );
      } else {
        return (
          <TouchableHighlight style={style} onPress={this.handlerClick.bind(this, type)} underlayColor="#E8E8E8">
            {childs}
          </TouchableHighlight>
        );
      }
    } else {
      return null;
    }
  }
  updateCheckbox = () => {
    this.setState({
      allSelected: false
    });
  };
  jobsSelectedHandler = (options) => {
    var opts = options || {};
    if (!opts.amount) {
      this.updateCheckbox();
    }
  };
  componentDidMount() {
    EventManager.on('btnFavoritesClicked btnTrashClicked btnReadClicked folderChanged', this.updateCheckbox);
    EventManager.on('jobsSelected', this.jobsSelectedHandler);
  }
  componentWillUnmount() {
    EventManager.off('btnFavoritesClicked btnTrashClicked btnReadClicked folderChanged', this.updateCheckbox);
    EventManager.off('jobsSelected', this.jobsSelectedHandler);
  }
  render() {
    var props = this.props,
      selectStyle,
      selectIconStyle;

    if (this.state.allSelected) {
      selectStyle = styles.msiw_select_all;
      selectIconStyle = styles.msiw_select_all_icon;
    }

    return (
      <View style={styles.wrapper}>
        <View style={styles.cont}>
          {this.renderTouchElement(
            props.select,
            [styles.msiw, selectStyle],
            <Icon name="check" style={[styles.msitem, selectIconStyle]} />,
            'select'
          )}
          {this.renderTouchElement(
            props.favorites,
            styles.msiw,
            <Icon name="star" style={styles.msitem} />,
            'favorites'
          )}
          {this.renderTouchElement(
            props.trash,
            styles.msiw,
            <Icon name="trash" style={styles.msitem} />,
            'trash'
          )}
          {this.renderTouchElement(
            props.read,
            styles.msiw,
            <Icon name="eye" style={styles.msitem} />,
            'read'
          )}
          {this.renderTouchElement(
            props.share,
            styles.msiw,
            <Icon name="share-alt" style={styles.msitem} />,
            'share'
          )}
        </View>
        <View style={styles.separator} />
      </View>
    );
  }
}

export default Manager;