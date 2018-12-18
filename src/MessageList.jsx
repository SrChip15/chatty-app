import React, { Component } from 'react';
import Message from './Message.jsx';


export default class MessageList extends Component {
  makeList() {
    return this.props.data.map(message => {
      return (
        <Message
          key={this.props.data.id}
          message={message}
          user={this.props.user}
        />
      )
    });
  }

  render () {
    const arr = this.makeList();
    return (
      <div>
        {arr}
      </div>
    );
  }
}

/** Prop data element type validation */
MessageList.propTypes = {
  data: React.PropTypes.array,
  id: React.PropTypes.string,
  user: React.PropTypes.object,
}
