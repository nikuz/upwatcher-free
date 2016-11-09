'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView,
  LinkingIOS,
  RefreshControl,
  ActionSheetIOS
} from 'react-native';
import * as _ from 'underscore';
// import * as Linkify from 'linkifyjs';
import * as EventManager from '../../modules/events';
import * as config from '../../config';
import Skills from '../../components/skills/code';
import Errors from '../../components/errors/code';
import timeAgo from '../../modules/timeAgo';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

class FeedbacksList extends React.Component {
  render() {
    var feedbacks = this.props.feedbacks || [];
    return (
      <ScrollView showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={styles.feedback_wrap}
      >
        {feedbacks.map((item, key) => {
          return (
            <View key={key} style={styles.feedback_item}>
              <View style={styles.fi_cont}>
                <Text style={styles.big}>{item.as_engagement_title}</Text>
                <Text style={[styles.small, styles.margin]}>{item.as_from} - {item.as_to}</Text>
                {item.feedback.comment ? <Text>{item.feedback.comment}</Text> : null}
              </View>
              <Text style={styles.big}>{item.feedback.score}</Text>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

class JobView extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    date_created: React.PropTypes.string.isRequired
  };
  state = {
    loading: false,
    itemData: null,
    created_time: null
  };
  updateTimeAgo = () => {
    var newTimeAgo = timeAgo(this.props.date_created);
    if (newTimeAgo !== this.curTimeAgo) {
      this.curTimeAgo = newTimeAgo;
      this.setState({
        created_time: newTimeAgo
      });
    }
    this.updateTimer = setTimeout(this.updateTimeAgo, 6e4 - new Date().getSeconds() * 1000);
  };
  handlerFeedbackClick = () => {
    EventManager.trigger('overlayOpen', {
      title: 'Feedback',
      component: <FeedbacksList feedbacks={this.state.itemData.assignments} />
    });
  };
  handlerApplyClick = () => {
    LinkingIOS.openURL(config.UPWORK_URL + '/job/' + this.props.id + '/apply');
  };
  handlerOpenJobLink = () => {
    LinkingIOS.openURL(config.UPWORK_URL + '/job/' + this.props.id);
  };
  handlerOpenAttachment = () => {
    LinkingIOS.openURL(this.state.itemData.attachment);
  };
  handlerOpenLink = (url) => {
    LinkingIOS.openURL(url);
  };
  linkify(text) {
    text = text || '';
    var result = [],
      linksInText = Linkify.find(text);

    if (linksInText.length) {
      _.each(linksInText, (item, key) => {
        text = text.split(item.value);
        result.push(
          <Text key={key + '_'}>{text.shift()}</Text>,
          <Text key={key} style={styles.text_link} onPress={this.handlerOpenLink.bind(null, item.href)}>{item.value}</Text>
        );
        text = text.join('');
      });
    } else {
      result.push(text);
    }
    return result;
  }
  parseJobData = (data) => {
    var assignments = [],
      feedback,
      timezone,
      result;

    if (data.assignments && data.assignments.assignment) {
      _.each(data.assignments.assignment, item => {
        if (item.feedback && item.feedback.score) {
          item.feedback.score = Number(item.feedback.score).toFixed(1);
          assignments.push(item);
        }
      });
    }
    feedback = Number(data.buyer.op_adjusted_score).toFixed(1);
    if (data.buyer.op_timezone) {
      timezone = data.buyer.op_timezone.replace(/^(UTC(?:.\d+\:\d+)?).*$/, '$1');
    }

    result = _.extend({}, this.props, {
      extended: true,
      description: this.linkify(data.op_description),
      applicants: data.op_tot_cand,
      interviewing: data.interviewees_total_active,
      feedback: feedback > 0,
      adjusted_score: feedback,
      feedback_ppl: assignments.length || null,
      payment_verified: Number(data.op_cny_upm_verified) > 0,
      engagement_weeks: data.engagement_weeks,
      op_engagement: data.op_engagement,
      buyer: data.buyer,
      buyer_timezone: timezone,
      assignments: assignments,
      total_charge: parseInt(data.buyer.op_tot_charge, 10),
      total_hours: parseInt(data.buyer.op_tot_hours, 10),
      attachment: data.op_attached_doc
    });
    this.setState({
      itemData: result,
      loading: false
    });
  };
  requestJobData = () => {
    this.setState({
      loading: true
    });
    this.request = true;
    // request.get({
    //   url: config.UPWORK_JOB_URL.replace('{id}', this.props.id)
    // }, (err, response) => {
    //   if (err) {
    //     EventManager.trigger('inboxError');
    //     if (this.request) {
    //       this.setState({
    //         loading: false
    //       });
    //     }
    //   } else if(response && this.request) {
    //     this.request = null;
    //     this.parseJobData(response.profile);
    //   } else {
    //     if (this.request) {
    //       this.setState({
    //         loading: false
    //       });
    //     }
    //   }
    // });
  };
  managerEventsHandler = (e) => {
    var targetFolder = 'trash';
    if (e.name === 'btnFavoritesClicked') {
      targetFolder = 'favorites';
    }
    EventManager.trigger('jobHasFolderChanged', {
      id: this.props.id,
      folder: targetFolder
    });
    this.props.navigator.pop();
  };
  shareEventsHandler = () => {
    var props = this.props;
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: props.url,
      message: props.title + '\n\n' + props.url,
      subject: props.title
    }, (err) => {}, (success) => {});
  };
  handlerBackBtn = () => {
    this.props.navigator.pop();
  };
  settingsChangedHandler = (options) => {
    var opts = options || {};
    if (opts.needToUpdateCache) {
      this.props.navigator.pop();
    }
  };
  componentWillMount = () => {
    this.curTimeAgo = timeAgo(this.props.date_created);
  };
  componentDidMount = () => {
    this.requestJobData();
    this.updateTimeAgo();
    EventManager.on('btnFavoritesClicked btnTrashClicked', this.managerEventsHandler);
    EventManager.on('btnShareClicked', this.shareEventsHandler);
    EventManager.on('btnBackClicked', this.handlerBackBtn);
    EventManager.on('settingsSaved', this.settingsChangedHandler);
  };
  componentWillUnmount = () => {
    this.request = null;
    clearTimeout(this.updateTimer);
    EventManager.off('btnFavoritesClicked btnTrashClicked', this.managerEventsHandler);
    EventManager.off('btnShareClicked', this.shareEventsHandler);
    EventManager.off('btnBackClicked', this.handlerBackBtn);
    EventManager.off('settingsSaved', this.settingsChangedHandler);
  };
  render = () => {
    var data = this.state.itemData || this.props,
      refreshControl = <RefreshControl
        tintColor="#43AC12"
        refreshing={this.state.loading}
        onRefresh={this.requestJobData}
      />;

    return (
      <View style={styles.wrap}>
        <ScrollView style={styles.cont}
                    refreshControl={refreshControl}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity onPress={this.handlerOpenJobLink}>
            <Text style={styles.title}>{data.title}&nbsp;<Icon name="external-link" /></Text>
          </TouchableOpacity>
          <Text style={[styles.small, styles.margin]}>
            <Text style={styles.bold}>{data.job_type} - </Text>
            <Text style={styles.gray}>Posted <Text>{this.state.created_time || this.curTimeAgo}</Text></Text>
          </Text>
          <TouchableHighlight style={styles.apply} onPress={this.handlerApplyClick} underlayColor="#69cb3c">
            <Text style={styles.apply_text}>Apply to this job</Text>
          </TouchableHighlight>
          <View style={styles.column}>
            <View style={styles.column_item}>
              <Text style={styles.column_title}>Budget</Text>
              <Text style={styles.big}>${data.budget || ' - '}</Text>
            </View>
            <View style={styles.column_item}>
              <Text style={styles.column_title}>Client Feedback</Text>
              {data.extended ?
                <Text style={styles.big}>
                  {data.feedback_ppl ?
                    <Text>{data.adjusted_score} &nbsp; ({data.feedback_ppl} reviews)</Text> :
                    <Text>No Feedback</Text>
                  }
                </Text>
                : null
              }
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.column_item}>
              <Text style={styles.column_title}>Applicants:</Text>
              <Text style={styles.big}>{data.applicants}</Text>
            </View>
            <View style={styles.column_item}>
              <Text style={styles.column_title}>Interviewing</Text>
              <Text style={styles.big}>{data.interviewing}</Text>
            </View>
          </View>
          <View style={styles.description}>
            {data.description ?
              <Text style={styles.description_text}>{data.description}</Text>
              : null
            }
            {!data.description && this.state.loading ?
              <ActivityIndicatorIOS animating={true} size="large" color="#43AC12" />
              : null
            }
          </View>
          {data.attachment ?
            <TouchableOpacity style={styles.attachment} onPress={this.handlerOpenAttachment}>
              <Text>
                <Icon name="paperclip" style={styles.attachment_icon} />&nbsp;&nbsp;
                <Text style={styles.text_link}>Attachment</Text>
              </Text>
            </TouchableOpacity>
            : null
          }
          {data.skills ? <Skills items={data.skills} wrapped={true} /> : null}
          {data.engagement_weeks ?
            <View style={styles.edur}>
              <Text style={styles.edur_title}>Estimated Duration</Text>
              <Text style={styles.big}>{data.engagement_weeks}</Text>
              <Text style={[styles.small, styles.margin]}>{data.op_engagement}</Text>
            </View>
            : null
          }
          <View style={styles.separator_wrap}>
            <Text style={styles.separator}>Client</Text>
          </View>
          <Text style={styles.big}>
            {data.buyer && data.buyer.op_country} {data.buyer_timezone ? <Text>({data.buyer_timezone})</Text> : null}
          </Text>
          <Text style={[styles.small, styles.gray, styles.margin]}>Member since {data.buyer && data.buyer.op_contract_date}</Text>
          <View style={styles.column}>
            <View style={styles.column_item}>
              <Text style={[styles.column_title, styles.gray, styles.small]}>Total Spent</Text>
              <Text style={styles.big}>${data.total_charge}</Text>
            </View>
            <View style={styles.column_item}>
              <Text style={[styles.column_title, styles.gray, styles.small]}>Hours Billed</Text>
              <Text style={styles.big}>{data.total_hours}</Text>
            </View>
            <View style={styles.column_item}>
              <Text style={[styles.column_title, styles.gray, styles.small]}>Paid Contracts</Text>
              <Text style={styles.big}>{data.buyer && data.buyer.op_tot_asgs}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.column_item}>
              <Text>Payment method</Text>
            </View>
            {data.extended ?
              <Text style={styles.big}>
                {data.payment_verified ? <Text>Verified</Text> : <Text>Unverified</Text>}
              </Text>
              : null
            }
          </View>
          {data.feedback_ppl ?
            <TouchableHighlight style={[styles.apply, styles.feedback]}
                                onPress={this.handlerFeedbackClick}
                                underlayColor="#dedddd">
              <Text style={[styles.apply_text, styles.feedback_text]}>View all feedback</Text>
            </TouchableHighlight>
            : null
          }
        </ScrollView>
        <View style={styles.menu}>
          <Errors parent="job_view" navigator={this.props.navigator} />
          <Manager favorites trash share />
        </View>
      </View>
    );
  };
}

export default JobView;