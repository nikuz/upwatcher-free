'use strict';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  Linking,
  InteractionManager
} from 'react-native';
import * as _ from 'underscore';
import * as config from '../../config';
import * as numberModule from '../../modules/number';
import timeAgo from '../../modules/timeAgo';
import Skills from '../../components/skills/code';
import Linkify from 'linkify-it';
import RatingComponent from '../../components/rating/code';
import PaymentComponent from '../../components/payment/code';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import styles from './style';

const linkify = Linkify();

class FeedbacksList extends React.Component {
  render() {
    var feedbacks = this.props.feedbacks || [];
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
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

FeedbacksList.propTypes = {
  feedbacks: React.PropTypes.array.isRequired
};

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.parseJobInfo = this.parseJobInfo.bind(this);

    var data = props.data;
    if (props.preview && props.preview.ciphertext === props.data.id) {
      data = this.parseJobInfo(props.preview, props.data);
    }
    this.state = {
      data: data,
      shortData: props.data,
      created_time: timeAgo(props.data.date_created),
      favorite: props.data.favorite
    };

    this.componentUnmounted = false;
    this.updateTimer = null;

    this.onFavoriteClick = this.onFavoriteClick.bind(this);
    this.onShareClick = this.onShareClick.bind(this);
    this.getNavigatorRightButton = this.getNavigatorRightButton.bind(this);
    this.updateNavBarRightButton = this.updateNavBarRightButton.bind(this);
    this.handlerApplyClick = this.handlerApplyClick.bind(this);
    this.handlerOpenAttachment = this.handlerOpenAttachment.bind(this);
    this.handlerOpenJobLink = this.handlerOpenJobLink.bind(this);
    this.handlerFeedbackClick = this.handlerFeedbackClick.bind(this);
    this.updateCreatedTime = this.updateCreatedTime.bind(this);
  }
  onFavoriteClick() {
    var props = this.props;

    if (props.onFavoriteHandler) {
      props.onFavoriteHandler();
    }

    this.setState({
      favorite: !this.state.favorite
    });
  }
  onShareClick() {
    var data = this.state.data,
      url = config.UPWORK_URL + '/job/' + data.id;

    Share.open({
      title: data.title,
      message: data.title,
      url: url,
      subject: data.title
    });
  }
  getNavigatorRightButton() {
    var icon = 'favorite-border',
      favorite = this.state.favorite;

    if (favorite) {
      icon = 'favorite';
    }

    return (
      <View style={styles.nav_bar_buttons}>
        <TouchableOpacity style={[styles.nav_bar_button, styles.nav_bar_button_share]} onPress={this.onShareClick}>
          <MaterialIcons
            name="share"
            style={styles.nav_bar_button_icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav_bar_button} onPress={this.onFavoriteClick}>
          <MaterialIcons
            name={icon}
            style={[styles.nav_bar_button_icon, favorite && styles.nav_bar_button_icon_active]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  updateNavBarRightButton() {
    this.props.navigator._navBar.update({
      id: 'preview',
      rightButton: this.getNavigatorRightButton()
    });
  }
  updateCreatedTime() {
    if (this.componentUnmounted) {
      return;
    }

    var newCreatedTime = timeAgo(this.props.data.date_created);
    if (newCreatedTime !== this.state.created_time) {
      this.setState({
        created_time: newCreatedTime
      });
    }
    this.updateTimer = setTimeout(this.updateCreatedTime, 6e4 - new Date().getSeconds() * 1000);
  }
  handlerFeedbackClick() {
    this.props.openFeedbackOverlay(
      'Feedback',
      <FeedbacksList feedbacks={this.state.data.assignments} />
    );
  };
  handlerApplyClick() {
    Linking.openURL(config.UPWORK_URL + '/job/' + this.props.data.id + '/apply');
  }
  handlerOpenJobLink() {
    Linking.openURL(config.UPWORK_URL + '/job/' + this.props.data.id);
  }
  getAttachment(url) {
    if (linkify.test(url)) {
      return url;
    } else if (url) {
      return config.UPWORK_URL + url;
    } else {
      return null;
    }
  }
  handlerOpenAttachment() {
    Linking.openURL(this.state.data.attachment);
  }
  handlerOpenLink(url) {
    Linking.openURL(url);
  }
  linkify(text) {
    text = text || '';
    var result = [],
      linksInText = linkify.match(text);

    if (linksInText && linksInText.length) {
      _.each(linksInText, (item, key) => {
        text = text.split(item.raw);
        result.push(
          <Text key={key + '_'}>{text.shift()}</Text>,
          <Text key={key} style={styles.text_link} onPress={this.handlerOpenLink.bind(null, item.url)}>{item.url}</Text>
        );
        text = text.join('');
      });
    } else {
      result.push(text);
    }
    return result;
  }
  getSkillLevel(level) {
    level = Number(level);
    switch (level) {
      case 2:
        return 'Intermediate';
      case 3:
        return 'Expert';
      default:
        return 'Entry';
    }
  }
  getEnglishLevel(level) {
    level = Number(level);
    switch (level) {
      case 1:
        return 'Elementary';
      case 2:
        return 'Conversational';
      case 3:
        return 'Fluent';
      default:
        return null;
    }
  }
  parseJobInfo(data, shortData) {
    var assignments = [],
      feedback,
      timezone,
      questions;

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

    if (data.op_additional_questions && data.op_additional_questions.op_additional_question) {
      questions = data.op_additional_questions.op_additional_question;
      if (questions instanceof Object) {
        questions = [questions];
      }
    }

    return _.extend({}, shortData || this.state.data, {
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
      buyer_paid_contracts: data.buyer && data.buyer.op_tot_asgs,
      buyer_country: data.buyer && data.buyer.op_country,
      buyer_contract_date: data.buyer && data.buyer.op_contract_date,
      buyer_timezone: timezone,
      assignments: assignments,
      total_charge: parseInt(data.buyer.op_tot_charge, 10),
      total_hours: parseInt(data.buyer.op_tot_hours, 10),
      attachment: this.getAttachment(data.op_attached_doc),
      skill_level: this.getSkillLevel(data.op_contractor_tier),
      additional_questions: questions,
      upwork_hours: Number(data.op_pref_odesk_hours),
      pref_loccation: data.op_pref_location,
      english_level: this.getEnglishLevel(data.op_pref_english_skill),
      candidates: (data.candidates && data.candidates.candidate.length) || 0
    });
  }
  componentWillReceiveProps(newProps) {
    if (newProps.preview) {
      this.setState({
        data: this.parseJobInfo(newProps.preview)
      });
    }
  }
  componentDidUpdate() {
    if (!this.componentUnmounted) {
      this.updateNavBarRightButton();
    }
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (!this.componentUnmounted) {
        this.props.showAdd();
        this.updateNavBarRightButton();
        if (!this.state.data.op_description) {
          this.props.getJobInfo(this.props.data.id);
        }
      }
    });
    this.updateCreatedTime();
  }
  componentWillUnmount() {
    clearTimeout(this.updateTimer);
    this.componentUnmounted = true;
  }
  render() {
    var data = this.state.data;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cont}>
            <TouchableOpacity onPress={this.handlerOpenJobLink}>
              <Text style={styles.title}>
                {data.title}&nbsp;
                <MaterialIcons name="open-in-new" style={styles.title_icon} />
              </Text>
            </TouchableOpacity>
            <Text style={[styles.small, styles.margin]}>
              <Text style={styles.gray}>Posted <Text>{this.state.created_time}</Text></Text>
            </Text>
            <TouchableHighlight style={styles.apply} onPress={this.handlerApplyClick} underlayColor="#69cb3c">
              <Text style={styles.apply_text}>SUBMIT PROPOSAL</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.attention}>
            <View style={styles.at_item}>
              {data.job_type === 'Fixed' ?
                <FontAwesomeIcons name="money" style={styles.at_item_icon} />
                :
                <MaterialIcons name="access-time" style={styles.at_item_icon} />
              }
              <Text style={styles.at_text}>{data.job_type} Price</Text>
            </View>
            {data.budget ?
              <View style={styles.at_item}>
                <MaterialIcons name="attach-money" style={styles.at_item_icon} />
                <Text style={styles.at_text}>{numberModule.parseBigNumber(data.budget)}</Text>
                <Text style={styles.at_label}>Budget</Text>
              </View>
              : null
            }
            <View style={styles.at_item}>
              <MaterialIcons name="equalizer" style={styles.at_item_icon} />
              <Text style={styles.at_text}>{data.skill_level || ' '}</Text>
              <Text style={styles.at_label}>Skill Level</Text>
            </View>
          </View>

          <View style={styles.description}>
            {data.description ?
              <Text style={styles.description_text}>{data.description}</Text>
              :
              <ActivityIndicator size="large" color="#43AC12" />
            }
          </View>
          {data.attachment ?
            <View style={styles.cont}>
              <TouchableOpacity style={styles.attachment} onPress={this.handlerOpenAttachment}>
                <MaterialIcons name="attach-file" style={styles.attachment_icon} />
                <Text style={styles.text_link}>Attachment</Text>
              </TouchableOpacity>
            </View>
            : null
          }
          {data.skills ?
            <View style={styles.cont}>
              <Skills items={data.skills} wrapped={true} />
            </View>
            : null
          }
          {data.engagement_weeks ?
            <View style={styles.cont}>
              <View style={styles.edur}>
                <Text style={styles.edur_title}>Estimated Duration</Text>
                <Text style={styles.big}>{data.engagement_weeks}</Text>
                <Text style={[styles.small, styles.margin]}>{data.op_engagement}</Text>
              </View>
            </View>
            : null
          }
          {data.additional_questions ?
            <View style={[styles.cont, styles.cont_sep]}>
              <Text style={[styles.normal, styles.gray, styles.margin]}>
                You will be asked to answer the following questions when applying:
              </Text>
              {data.additional_questions.map((item, key) => {
                var style = [styles.normal, styles.black];
                if (key !== data.additional_questions.length - 1) {
                  style.push(styles.margin_bottom);
                }
                return (
                  <Text key={key} style={style}>
                    {item.position}. {item.question}
                  </Text>
                );
              })}
            </View>
            : null
          }
          {data.upwork_hours || data.pref_loccation || data.english_level ?
            <View style={[styles.cont, styles.cont_sep]}>
              <Text style={[styles.normal, styles.gray, styles.margin]}>
                Preferred qualifications:
              </Text>
              {data.upwork_hours ?
                <Text style={(data.pref_loccation || data.english_level) && styles.margin_bottom}>
                  <Text style={[styles.normal, styles.gray]}>Upwork Hours: </Text>
                  <Text style={[styles.normal, styles.black]}>At least {data.upwork_hours} hour(s)</Text>
                </Text>
                : null
              }
              {data.pref_loccation ?
                <Text style={data.english_level && styles.margin_bottom}>
                  <Text style={[styles.normal, styles.gray]}>Preferred Location: </Text>
                  <Text style={[styles.normal, styles.black]}>{data.pref_loccation}</Text>
                </Text>
                : null
              }
              {data.english_level ?
                <Text>
                  <Text style={[styles.normal, styles.gray]}>English Level: </Text>
                  <Text style={[styles.normal, styles.black]}>{data.english_level}</Text>
                </Text>
                : null
              }
            </View>
            : null
          }

          <View style={[styles.cont, styles.cont_sep]}>
            <Text style={[styles.normal, styles.gray, styles.margin]}>
              Freelancers Activity on this Job
            </Text>
            <View style={styles.column}>
              <View style={styles.column_item}>
                <Text style={[styles.small, styles.gray]}>Proposals</Text>
                <Text style={[styles.normal, styles.black]}>
                  {data.candidates}
                </Text>
              </View>
              <View style={styles.column_item}>
                <Text style={[styles.small, styles.gray]}>Interviewing</Text>
                <Text style={[styles.normal, styles.black]}>
                  {data.interviewing}
                </Text>
              </View>
              <View style={styles.column_item}>
                <Text style={[styles.small, styles.gray]}>Hired</Text>
                <Text style={[styles.normal, styles.black]}>
                  {data.applicants}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.client}>
            <View style={styles.client_head}>
              <RatingComponent
                feedback={data.client.feedback}
                reviews_count={data.client.reviews_count}
                style={styles.client_rating}
              />
              <PaymentComponent
                status={data.client.payment_verification_status}
              />
            </View>
            <Text style={[styles.big, styles.black]}>
              {data.buyer_country} {data.buyer_timezone ? <Text>({data.buyer_timezone})</Text> : null}
            </Text>
            <Text style={[styles.small, styles.gray, styles.margin_bottom]}>
              Member since {data.buyer_contract_date}
            </Text>
            <View style={styles.column}>
              <View style={styles.column_item}>
                <Text style={[styles.gray, styles.small]}>Total Spent</Text>
                <Text style={[styles.big, styles.black]}>${numberModule.parseBigNumber(data.total_charge)}</Text>
              </View>
              <View style={styles.column_item}>
                <Text style={[styles.gray, styles.small]}>Hours Billed</Text>
                <Text style={[styles.big, styles.black]}>{numberModule.parseBigNumber(data.total_hours)}</Text>
              </View>
              <View style={styles.column_item}>
                <Text style={[styles.gray, styles.small]}>Paid Contracts</Text>
                <Text style={[styles.big, styles.black]}>{data.buyer_paid_contracts}</Text>
              </View>
            </View>
            {data.feedback_ppl ?
              <TouchableHighlight
                style={[styles.apply, styles.feedback]}
                onPress={this.handlerFeedbackClick}
                underlayColor="#dedddd"
              >
                <Text style={[styles.apply_text, styles.feedback_text]}>View all feedback</Text>
              </TouchableHighlight>
              : null
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

Preview.propTypes = {
  data: React.PropTypes.object.isRequired,
  preview: React.PropTypes.object.isRequired,
  navigator: React.PropTypes.object.isRequired,
  getJobInfo: React.PropTypes.func.isRequired,
  openFeedbackOverlay: React.PropTypes.func.isRequired,
  showAdd: React.PropTypes.func.isRequired
};

export default Preview;
