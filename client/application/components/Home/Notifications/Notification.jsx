import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';

export default class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.dismissNotification = this.dismissNotification.bind(this);

    this.state = {
      title: this.props.title,
      message: this.props.message,
      keyIndex: this.props.keyIndex,
      className: this.props.className,
    };
  }

  /**
   * Removes the current notification from the firebase database and from redux
   */
  dismissNotification() {
    if (!this.props.exampleUser) {
      this.props.firebase.dismissNotification(this.state.keyIndex);
    }
    this.props.removeNotification(this.state.keyIndex);
  }

  render() {
    return (
      <pre className={this.state.className}>
        <h5>
          {this.state.title}
          <Button style={{ float: 'right' }} onClick={this.dismissNotification} className="pt-button pt-minimal pt-icon-small-cross" />
        </h5>
        <p dangerouslySetInnerHTML={{ __html: this.state.message }} />
      </pre>
    );
  }
}


Notification.propTypes = {
  title: PropTypes.string.isRequired,
  keyIndex: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  firebase: PropTypes.shape().isRequired,
  removeNotification: PropTypes.func.isRequired,
  exampleUser: PropTypes.bool,
  className: PropTypes.string,
};

Notification.defaultProps = {
  exampleUser: false,
  className: null,
};
