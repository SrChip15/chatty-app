import React, { Component } from 'react';
import Message from './Message.jsx';


function MakeList (props) {
  const arr = props.data.map(message => {
    console.log(typeof message);
    return (
      <Message key={message.id} message={message} />
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
      <MakeList data={this.props.data} />
    );
  }
}

MessageList.propTypes = {
  data: React.PropTypes.array
}