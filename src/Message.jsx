import React, { Component } from 'react';

export default class Message extends Component {
  render () {
    const userColor = {
      color: this.props.message.color,
    }

    return (
      <div
        className="message"
      >
        <span
          className="message-username"
          style={userColor}
        >
          {this.props.message.username}
        </span>

        <span
          className="message-content"
        >
          {this.props.message.content}
        </span>
      </div>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.object,
  user: React.PropTypes.object,
}