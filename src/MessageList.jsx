import React, { Component } from 'react';

function MakeList (props) {
  const arr = props.data.map(i => {
    return (
      <div className="message" key={i.id}>
        <span className="message-username"
        >{i.username}
        </span>
        <span className="message-content"
        >{i.content}</span>
      </div>
    );
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