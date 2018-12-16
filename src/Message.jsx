import React, {Component} from 'react';

function GetImages(props) {
	// Prop data element type validation
	GetImages.propTypes = {
		message: React.PropTypes.object,
		user: React.PropTypes.object,
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

export default class Message extends Component {
	render() {
		const userColor = {
			color: this.props.message.color,
		}

		const htmlImage = GetImages(this.props);

		return (
			<div className = "message">
				<span
					className = "message-username"
					style = {userColor}
					>
						{this.props.message.username}
					</span>

				<p
					className = "message-content"
					>
						{this.props.message.content}
				</p>
				{htmlImage}
				</div>
		);
	}
}

/** Prop data element type validation */
Message.propTypes = {
	message: React.PropTypes.object,
	user: React.PropTypes.object,
}
