import React, { Component } from 'react';

export default class Message extends Component {
  render () {
    const userColor = {
      color: this.props.message.color,
    }

    const msgImage = this.props.message.image;
    const htmlImage = msgImage ? <img className="image" src={msgImage} /> : null;

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

        <p className="message-content">{this.props.message.content}</p>
        {htmlImage}
      </div>
    );
  }
}

Message.propTypes = {
  message: React.PropTypes.object,
  user: React.PropTypes.object,
}