const port = process.argv[2];
const strftime = require('strftime');
const net = require('net');

var server = net.createServer();
server.on('connection', (socket) => {
    socket.end(strftime('%F %R', new Date()) + '\n');
})

server.listen(port);