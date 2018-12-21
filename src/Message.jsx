import React, {Component} from 'react';


function ParseIncomingMessage(props) {
	// Prop data element type validation
	ParseIncomingMessage.propTypes = {
		message: React.PropTypes.object,
	}

	// Look for image URL ONLY when the message DOES contain an image URL
	let imagesToDisplay = null;
	if (props.message.image) {
		const imageURLsAsArr = props.message.image.split(' ');

		imagesToDisplay = imageURLsAsArr.map((imageURL, idx) => {
			return <img key={idx} className="image" src={imageURL}	/>
		})
	}

	const messageType = props.message.type;
	if (messageType === 'incomingNotification') {
		return (
			<div className="message system">
				{props.message.content}
			</div>
		);
	} else {
		// Get & use user assigned color
		const userColor = {
			color: props.message.color,
		}

		return (
			<div className="message">
				<span	className = "message-username" style = {userColor}>
					{props.message.username}
				</span>

				<p className = "message-content">
					{props.message.content}
					<br></br>
					{imagesToDisplay}
				</p>
			</div>
		);
	}
}

export default class Message extends Component {
	render() {
		return (
			<div>
				<ParseIncomingMessage message={this.props.message}/>
			</div>
		);
	}
}

/** Prop data element type validation */
Message.propTypes = {
	message: React.PropTypes.array,
}
