import React, {Component} from 'react';

function GetImages(props) {
	// Prop data element type validation
	GetImages.propTypes = {
		message: React.PropTypes.object,
	}

	// Look for image URL ONLY when the message DOES contain an image URL
	if (props.message.image) {
		const imageURLsAsArr = props.message.image.split(' ');

		const imagesToDisplay = imageURLsAsArr.map((imageURL, idx) => {
			return <img key={idx} className="image" src={imageURL}	/>
		})

		return (
			<div>
				{imagesToDisplay}
			</div>
		);
	}

	return false;
}

function ParseIncomingMessage(props) {
	// Prop data element type validation
	ParseIncomingMessage.propTypes = {
		message: React.PropTypes.object,
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

		// Get the stored image if any
		const htmlImage = GetImages(props);

		return (
			<div>
				<span	className = "message-username" style = {userColor}>
					{props.message.username}
				</span>

				<p className = "message-content">
					{props.message.content}
				</p>
				{htmlImage}
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
