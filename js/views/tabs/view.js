'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.handlerClick = this.handlerClick.bind(this);
  }
  handlerClick(tabId) {
    if (tabId !== this.props.tabs.activeTab) {
      this.props.change(tabId);
    }
  }
  render() {
    var tabs = this.props.tabs;
    if (tabs.visible) {
      return (
        <View style={styles.tabs}>
          {tabs.items.map(tab => {
            let activeStyle = tab.id === tabs.activeTab && styles.tab_active_color,
              jobsCount;

            if (tab.id === 'favorites') {
              jobsCount = this.props.favorites.length;
            }

            return (
              <TouchableHighlight
                key={tab.id}
                underlayColor="#eee"
                style={styles.tab_item}
                onPress={this.handlerClick.bind(null, tab.id)}
              >
                <View style={styles.tab_cont}>
                  <MaterialIcons name={tab.icon} style={[styles.icon, activeStyle]} />
                  {jobsCount ?
                    <View style={[styles.counter, jobsCount > 9 && styles.counter_long]}>
                      <Text style={styles.counter_text}>
                        {jobsCount}
                      </Text>
                    </View>
                    : null
                  }
                  <Text style={[styles.name, activeStyle]}>{tab.name}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      );
    } else {
      return null;
    }
  }
}

Tabs.propTypes = {
  favorites: React.PropTypes.array.isRequired,
  tabs: React.PropTypes.object.isRequired,
  change: React.PropTypes.func.isRequired
};

export default Tabs;
