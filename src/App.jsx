import React, { Component } from 'react';
import data from '../static/data.json';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: data.currentUser.name,
      messages: data.messages,
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      let messageIn = {
        id: 4,
        username: data.currentUser.name,
        content: evt.target.value,
      }

      const messages = [ ...this.state.messages, messageIn ];
      this.setState({ messages });
      evt.target.value = '';
    }
  }

  componentDidMount () {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
      };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
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
