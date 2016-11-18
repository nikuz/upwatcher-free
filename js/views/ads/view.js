'use strict';

import React from 'react';
import { AdMobInterstitial } from 'react-native-admob';

AdMobInterstitial.setTestDeviceID('EMULATOR');
AdMobInterstitial.setAdUnitID(process.env.ADMOB_ID);

class Ads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.ads.visible
    };
    this.request = this.request.bind(this);
  }
  request() {
    AdMobInterstitial.requestAd((err) => {
      if (err && err.toString() !== 'Ad is already loaded.') { // most popular error
        this.props.errorHandler(err);
      }
    });
  }
  show = async () => {
    let props = this.props;
    if (await props.getPermit()) {
      AdMobInterstitial.showAd((err) => {
        if (err) {
          props.errorHandler(err);
        } else {
          props.incrementViewsCounter();
        }
      });
    } else {
      props.openPromoOverlay();
    }
  };
  hide() {
    // no method close in 'react-native-admob' :)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.ads.visible
    });
  }
  componentDidUpdate() {
    if (this.state.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
  componentDidMount() {
    this.request();
    AdMobInterstitial.addEventListener('interstitialDidClose', this.request);
  }
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }
  render() {
    return null;
  }
}

Ads.propTypes = {
  ads: React.PropTypes.object.isRequired,
  errorHandler: React.PropTypes.func.isRequired,
  getPermit: React.PropTypes.func.isRequired,
  incrementViewsCounter: React.PropTypes.func.isRequired,
  openPromoOverlay: React.PropTypes.func.isRequired
};

export default Ads;
