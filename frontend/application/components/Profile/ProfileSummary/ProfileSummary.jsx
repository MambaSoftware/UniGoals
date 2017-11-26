import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ProfileUnitBarChart from '../ProfileUnitBarChart/ProfileUnitBarChart';
import AverageGrade from '../AverageGrade/AverageGrade';
import TotalGrade from '../AverageGrade/TotalGrade';

import style from '../profile.less';

export default class ProfileSummary extends React.Component {
  static getCurrentYearWeek() {
    const uniStartWeek = 38;
    let date = new Date();

    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));


    date.setUTCDate((date.getUTCDate() + 4) - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    const uniWeek = weekNo - uniStartWeek;

    return Math.abs(uniWeek);
  }

  constructor(props) {
    super(props);

    this.state = {
      isSummary: true,
      currentWeek: ProfileSummary.getCurrentYearWeek(),
    };
  }

  render() {
    return (
      <div style={{ minWidth: 75 * _.size(this.props.units) }} className={`pt-card pt-elevation-3 ${style.profileSummaryWrapper}`}>
        <div className={style.profileSummaryHeader}>Summary</div>
        <div className={style.profileSummaryHeader}>
          {_.defaultTo(this.props.profile.course_name, 'University Course')} - {this.props.profile.name} - Year: {_.defaultTo(this.props.profile.course_year, '1')}, week: {this.state.currentWeek}
        </div>
        <div className={style.profileSummaryAverageWrapper}>
          <ProfileUnitBarChart
            data={this.props.units}
            color="#621362"
            className={style.ProfileSummaryChart}
            isSummary={this.state.isSummary}
            displayText="Overall Process"
          />
          <AverageGrade
            summaryData={this.props.units}
            isSummary={this.state.isSummary}
            className={style.SummaryAverageGrade}
          />
          <TotalGrade
            data={this.props.units}
            className={style.SummaryAverageGrade}
          />
        </div>
      </div>
    );
  }
}

ProfileSummary.propTypes = {
  units: PropTypes.shape().isRequired,
  profile: PropTypes.shape({
    course_name: PropTypes.string,
    course_year: PropTypes.number,
    email: PropTypes.string,
    familyName: PropTypes.string,
    GivenName: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    isNew: PropTypes.bool,
    courseName: PropTypes.string,
  }).isRequired,
};
