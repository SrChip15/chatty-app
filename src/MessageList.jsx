import React, { Component } from 'react';
import Message from './Message.jsx';


function MakeList (props) {
  const arr = props.data.map(message => {
    return (
      <Message
        key={message.id}
        message={message}
        user={props.user}
      />
    )
  });

  return (
    <div>
      {arr}
    </div>
  );
}
export default class MessageList extends Component {
  render () {
    return (
      <MakeList
        data={this.props.data}
        user={this.props.user}
      />
    );
  }
}

MessageList.propTypes = {
  data: React.PropTypes.array,
  user: React.PropTypes.object,
}