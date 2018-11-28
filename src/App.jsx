import React, { Component } from 'react';
import data from '../static/data.json';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: data.currentUser.name,
      messages: [],
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.socket = null;
  }

  onSubmit (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      const messageIn = {
        username: this.state.user,
        content: evt.target.value
      }

      // const messages = [ ...this.state.messages, messageIn ];
      // this.setState({ messages });
      evt.target.value = '';

      //send to socket
      this.socket.send(JSON.stringify(messageIn));
      // evt.target.value = '';
    }
  }

  componentDidMount () {
    // web socket
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = function (event) {
      console.log(`Connection to socket is now ${event.type}`);
    };

    this.socket.onmessage = (event) => {
      const parsedAsObj = JSON.parse(event.data);
      // code to handle incoming message
      const oldMessages = this.state.messages.slice();
      const upMessages = oldMessages.concat([parsedAsObj]);
      this.setState({messages: upMessages});
    }
  }

  render () {
    return (
      <main className="messages">
        <MessageList data={this.state.messages} />
        <ChatBar user={this.state.user} onSubmit={this.onSubmit} />
      </main>
    );
  }
}
