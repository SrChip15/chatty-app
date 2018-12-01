import React, { Component } from 'react';
import data from '../static/data.json';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function Notification (props) {
  return (
    <div className="system">
      {props.data.content}
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {
        name: 'user',
        color: null,
      },
      users: 0,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.socket = null;
    this.onBlur = this.onBlur.bind(this);
  }

  onSubmit (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      const messageIn = {
        type: 'postMessage',
        username: this.state.user.name,
        content: evt.target.value
      }

      evt.target.value = '';

      //send to socket
      this.socket.send(JSON.stringify(messageIn));
    }
  }

  onBlur (evt) {
    evt.preventDefault();
    const newPersonName = evt.target.value;
    this.setState({
      user: {
        name: newPersonName
      }
    });

    const notfnObj = {
      type: 'postNotification',
      content: `${ this.state.user.name } has changed their name to ${ newPersonName }`
    }

    this.socket.send(JSON.stringify(notfnObj));
  }

  componentDidMount () {
    // web socket
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = function (event) {
      console.log(`Connection to socket is now ${ event.type }`);
    };

    this.socket.onmessage = (event) => {
      const dataFromServer = JSON.parse(event.data);
      // code to handle incoming message
      const messages = this.state.messages.slice();
      const upMessages = messages.concat(dataFromServer);

      switch (dataFromServer.type) {
        case 'incomingMessage':
          // handle incoming message
          this.setState({ messages: upMessages });
          break;
        case 'incomingNotification':
          // handle incoming notification
          this.setState({ messages: upMessages });
          break;
        case 'numberOfClients':
          this.setState(priorState => {
            const current = Object.create(priorState);
            current.users = dataFromServer.clients;
            return current;
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error(`Unknown event type ${ data.type }`);
      }
    }
  }

  render () {
    return (
      <main className="messages">
        <nav className="navbar">
          <a
            href="/"
            className="navbar-brand"
          >Chatty
          </a>
          <p>{this.state.users} Users Online</p>
        </nav>
        <MessageList
          data={this.state.messages}
          user={this.state.user}
        />
        <Notification data={this.state.messages} />
        <ChatBar
          user={this.state.user}
          onSubmit={this.onSubmit}
          onBlur={this.onBlur}
        />
      </main>
    );
  }
}
