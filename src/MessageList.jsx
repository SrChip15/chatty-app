import React, { Component } from 'react';
import Message from './Message.jsx';


function MakeList (props) {
  // Prop data element type validation
  MakeList.propTypes = {
    data: React.PropTypes.array,
    user: React.PropTypes.object,
  }

  const arr = props.data.map(message => {
    return (
      <Message
        key={props.data.id}
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

/** Prop data element type validation */
MessageList.propTypes = {
  data: React.PropTypes.array,
  id: React.PropTypes.string,
  user: React.PropTypes.object,
}
