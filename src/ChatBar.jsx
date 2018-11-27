{/* <footer class="chatbar">
  <input class="chatbar-username" placeholder="Your Name (Optional)" />
  <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
</footer> */}

import React, { Component } from 'react';

export default class ChatBar extends Component {
  render () {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}