const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Send data to all clients
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

  // Make data packet with updated connected clients info
  console.log(`Clients: ${wss.clients.size}`)
  const payload = {
  	type: 'numberOfClients',
  	clients: wss.clients.size
  }
	
	// Inform all clients
	sendToClients(wss, payload);

  /*
  Handle data received from clients
   */
	ws.on('message', function incoming(data) {
		const parsed = JSON.parse(data);
  	let broadcastMsg;

		if (parsed.type === 'postNotification') {
			// notification broadcast
			parsed.type = 'incomingNotification';
			broadcastMsg = parsed;
		} else {
			// message broadcast
			parsed.type = 'incomingMessage';
			broadcastMsg = Object.assign({id:uuidv1()}, parsed);
		}

		// Send modified payload
		sendToClients(wss, broadcastMsg);

	});

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
  	console.log('Client disconnected')

  	// clients connected info updates w/o refresh
		const payload = {
			type: 'numberOfClients',
			clients: wss.clients.size
		}

		// send client info to client
		sendToClients(wss, payload);

  });

});