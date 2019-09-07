const WebServer = require('./webServer');
const server = new WebServer(process.env.PORT);
server.start();

