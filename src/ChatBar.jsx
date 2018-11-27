{/* <footer class="chatbar">
  <input class="chatbar-username" placeholder="Your Name (Optional)" />
  <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer> */}

import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.user}placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  user: React.PropTypes.string,
}