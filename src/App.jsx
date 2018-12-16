import React, {Component} from 'react';
import data from '../static/data.json';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

function Notification(props) {
	// Prop data element type validation
	Notification.propTypes = {
		data: React.PropTypes.array
	}

	return (
		<div
			className="message system"
		>
			{props.data.content}
		</div>
	);
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

	/** Click event handler for new messages */
	onSubmit(evt) {
		evt.preventDefault();
		if (evt.key === 'Enter') {
			const messageIn = {
				type: 'postMessage',
				username: this.state.user.name,
				content: evt.target.value
			}

			// Clear out text input area for successive messages
			evt.target.value = '';

			this.socket.send(JSON.stringify(messageIn));
		}
	}

	/** User name change detecttion handler */
	onBlur(evt) {
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

	componentDidMount() {
		// Open new connection to a WebSocket
		this.socket = new WebSocket('ws://localhost:3001');
		this.socket.onopen = function (event) {
			console.log(`Connection to socket is now ${ event.type }`);
		};

		this.socket.onmessage = (event) => {
			const dataFromServer = JSON.parse(event.data);
			const messages = this.state.messages.slice();
			const updatedMessages = messages.concat(dataFromServer);

			switch (dataFromServer.type) {
				case 'incomingMessage':
					this.setState({
						messages: updatedMessages
					});
					this.scroll
					break;

				case 'incomingNotification':
					this.setState({
						messages: updatedMessages
					});
					break;

				case 'numberOfClients':
					this.setState(priorState => {
						const current = Object.create(priorState);
						current.users = dataFromServer.clients;
						return current;
					});
					break;

				default:
					throw new Error(`Unknown event type ${ data.type }`);
			}
		}
	}

	/**
	Called whenever a component is updated. This callback is used
	to smoothly navigate the user to the most recent message in the app
	*/
	componentDidUpdate () {
		this.scrollToBottom();
	}

	scrollToBottom () {
		this.messagesEnd.scrollIntoView({behavior: 'smooth'});
	}

	render() {
		return (
			<main
				className = "messages"
			>
				<nav
					className = "navbar"
				>
					<a
						href = "/"
						className = "navbar-brand"
					>
						Chatty
					</a>
					<p>
						{this.state.users} Users Online
					</p>
				</nav>
			<MessageList
				data = {this.state.messages}
				user = {this.state.user}
				scrollToBottom = {this.scrollToBottom}
			/>
			<Notification	data = {this.state.messages} />
			<div
				ref={(el) => {this.messagesEnd = el}}>
			</div>
			<ChatBar
				user = {this.state.user}
				onSubmit = {this.onSubmit}
				onBlur = {this.onBlur}
			/>
			</main >
		);
	}
}
