const http = require('http');
const WebSocketServer = require('websocket').server;
let connection = null; //since we are going to overwrite it

const httpServer = http.createServer((req, res) => {
    console.log("We have received a request");
});

const websocket = new WebSocketServer({
    "httpServer": httpServer
});

websocket.on("request", request => {
    connection = request.accept(null, request.origin); //null for accepting anything sent by client
    connection.on("open", () => console.log("Opened!"));
    connection.on("close", () => console.log("Closed!"));
    connection.on("message", message => {
        console.log(`Message received: ${message.utf8Data}`);
    });
    connection.send("Hello");
    sendEveryiveSecs();
});

function sendEveryiveSecs() {
    connection.send(`Message ${Math.random()}`);
    setTimeout(sendEveryiveSecs, 5000);
}

httpServer.listen(8080, () => console.log("Server started on PORT 8080"));