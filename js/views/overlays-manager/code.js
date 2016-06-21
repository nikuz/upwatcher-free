'use strict';

import React from 'react';
import * as EventManager from '../../modules/events';
import Overlay from '../../components/overlay/code';

class OverlaysManager extends React.Component {
  state = {
    overlay: false,
    data: null
  };
  openHandler = (type, options) => {
    var newState = {
      data: options,
      [type]: true
    };
    this.setState(newState);
  };
  closeHandler = (type) => {
    this.setState({
      [type]: 'close'
    });
  };
  removeHandler = (type) => {
    this.setState({
      [type]: false
    });
  };
  //
  overlayOpenHandler = (options) => {
    this.openHandler('overlay', options);
  };
  overlayCloseHandler = () => {
    this.closeHandler('overlay');
  };
  //
  shouldComponentUpdate(nextProps, nextState) {
    var state = this.state;
    return state.data !== nextState.data
      || state.overlay !== nextState.overlay;
  }
  componentDidMount() {
    EventManager.on('overlayOpen', this.overlayOpenHandler);
    EventManager.on('overlayClose', this.overlayCloseHandler);
  }
  componentWillUnmount() {
    EventManager.off('overlayOpen', this.overlayOpenHandler);
    EventManager.off('overlayClose', this.overlayCloseHandler);
  }
  render() {
    var state = this.state;
    if (state.overlay) {
      return (
        <Overlay
          {...state.data}
          close={state.overlay === 'close'}
          afterClose={this.removeHandler.bind(null, 'overlay')}
        />
      );
    }
    return null;
  }
}

export default OverlaysManager;
