import React from 'react';
import PropTypes from 'prop-types';

import toaster from '../../utils/toaster';
import { Dialog } from '@blueprintjs/core';

import ProfileNavigation from './Navigation/ProfileNavigation';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import Tables from './ProfileTables/Tables';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.isNoLongerNew = this.isNoLongerNew.bind(this);
    this.newUserDialog = this.newUserDialog.bind(this);

    this.profile = this.props.profile;

    this.state = {
      isNew: this.profile.new,
      canEscapeKeyClose: true,
    };
  }


  isNoLongerNew(e) {
    e.preventDefault();
    this.setState({ isNew: false });
  }

  updateCourseTitle(change, firebase) {
    if (firebase) {
      this.props.firebase.updateProfileCourse(change)
        .catch(error => toaster.danger(error.message));
    } else {
      this.props.updateCourseName(change);
    }
  }

  newUserDialog() {
    return (
      <Dialog
        iconName="pt-icon-edit"
        title={`Welcome ${this.profile.name}`}
        isOpen={this.state.isNew}
        onClose={this.isNoLongerNew}
        canEscapeKeyClose={this.state.canEscapeKeyClose}
      >
        <div className="pt-dialog-body">
          Thank you for  using unistats-alpha! If you have any problems please email:
          UP840877@myport.ac.uk or click the little help box in the top right hand corner! <strong>
          This box will only ever show once!</strong>
          <br />
          <br />
          For the time being please may you update the content below.
          <br />
          <br />
          Thanks,
          <br />
          <br />
          thinknet.xyz
          <div>
            <label className="pt-label pt-inline">
              University course
              <input className="pt-input" style={{ width: '200px' }} type="text" placeholder="Text input" dir="auto" />
            </label>
          </div>
        </div>
      </Dialog>
    );
  }

  render() {
    return (
      <div>
        {this.newUserDialog()}
        <ProfileNavigation
          history={this.props.history}
          profile={this.profile}
          notifications={this.props.notifications}
          updateNotifications={this.props.updateNotifications}
          removeNotification={this.props.removeNotification}
          exampleUser={this.props.profile.exampleUser}
          firebase={this.props.firebase}
        />
        <ProfileSummary
          units={this.props.units}
          profile={this.profile}
        />
        <Tables
          insertUnitRow={this.props.insertUnitRow}
          updateUnits={this.props.updateUnits}
          updateRowContent={this.props.updateRowContent}
          removeUnitRow={this.props.removeUnitRow}
          updateUnitTitle={this.props.updateUnitTitle}
          addUnitTable={this.props.addUnitTable}
          removeUnitTable={this.props.removeUnitTable}
          firebase={this.props.firebase}
          exampleUser={this.props.profile.exampleUser}
          units={this.props.units}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  firebase: PropTypes.shape().isRequired,
  updateUnits: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  units: PropTypes.shape().isRequired,
  removeUnitRow: PropTypes.func.isRequired,
  insertUnitRow: PropTypes.func.isRequired,
  updateRowContent: PropTypes.func.isRequired,
  updateUnitTitle: PropTypes.func.isRequired,
  addUnitTable: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
  removeUnitTable: PropTypes.func.isRequired,
  updateCourseName: PropTypes.func.isRequired,
  notifications: PropTypes.shape().isRequired,
  profile: PropTypes.shape({
    email: PropTypes.string,
    isNew: PropTypes.bool,
    exampleUser: PropTypes.bool,
  }).isRequired,
};
