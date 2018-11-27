import React, { Component } from 'react';
import data from '../static/data.json';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import Message from './Message.jsx';

export default class App extends Component {
  render () {
    return (
      <main className="messages">
        <MessageList data={data.messages}/>
        <ChatBar user={data.currentUser.name} />
      </main>
    );
  }
}
