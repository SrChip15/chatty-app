import React, { Component } from 'react';

export default class Message extends Component {
  render () {
    return (
      <div className="message">
        <span className="message-username">{this.props.user.username}</span>
        <span className="message-content">{this.props.user.content}</span>
      </div>
    );
  }
}

Message.propTypes = {
  user: React.PropTypes.object
}