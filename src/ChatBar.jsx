import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onBlur={this.props.onBlur}
          defaultValue={this.props.user.name}
          placeholder="Your Name (Optional)"
        />
        <input
          className="chatbar-message"
          onKeyUp={this.props.onSubmit}
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  user: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
  onBlur: React.PropTypes.func,
}