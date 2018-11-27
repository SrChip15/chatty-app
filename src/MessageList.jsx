import React, { Component } from 'react';
import Message from './Message.jsx';


function MakeList (props) {
  const arr = props.data.map(i => {
    return (
      <Message key={i.id} user={i} />
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