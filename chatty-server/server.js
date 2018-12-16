const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');
const colors = ['red', 'green', 'blue', 'violet', 'pink'];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
	// Make the express server serve static assets (html, javascript, css) from the /public folder
	.use(express.static('public'))
	.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({
	server
});

// Generic information sending method that is used by the server whenever
// information has to be sent over to the client
function sendToClients(wss, data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
	console.log('Client connected');
	const randColorSelector = Math.floor(Math.random() * 5);
	const color = colors[randColorSelector];

	// Make data packet with updated connected clients info
	const payload = {
		type: 'numberOfClients',
		clients: wss.clients.size,
		color: null
	}


	// Inform all clients
	sendToClients(wss, payload);

	/** Handle data received from clients */

	ws.on('message', function incoming(data) {
		const parsedData = JSON.parse(data);

		switch (parsedData.type) {
			case 'postNotification':
				parsedData.type = 'incomingNotification';
				break;

			case 'postMessage':
				parsedData.id = uuidv1();
				parsedData.type = 'incomingMessage';
				parsedData.color = color;

				const match = /https?:.*\.(png|jpeg|gif|jpg)/.exec(parsedData.content);
				if (match) {
					parsedData.content = parsedData.content.replace(match[0], '')
					parsedData.image = match[0];
				}

				break;

			default:
				throw new Error(`Unknown event type ${parsedData.type}`);
		}

		// Typically, data packets received from the client is saved onto a database
		// and the information from the content publishing client is pushed to all
		// connected clients, thereby synchronising clients with latest updates
		sendToClients(wss, parsedData);

	});

	// Set up a callback when a client closes the socket.
	// This usually means they closed their browser.
	ws.on('close', () => {
		console.log('Client disconnected')

		// Make a data packet with appropriate information to inform all other
		// connected clients about the revised number of active clients.
		const payload = {
			type: 'numberOfClients',
			clients: wss.clients.size
		}

		// Push to connected clients the information packet from above.
		// This ensures that the all connected clients have the correctly updated
		// number of clients information at all times without having to refresh their
		// current session
		sendToClients(wss, payload);

	});

});