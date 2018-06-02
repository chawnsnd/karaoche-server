var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var users = {};
var chatId  = 1;
server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  // console.log(socket.id);
  console.log("phone is connected");
  socket.on('message', (message) => _sendAndSaveMessage(message, socket));
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };
  console.log("from "+message.user._id+": "+message.text);
  var emitter = fromServer ? io : socket.broadcast;
  emitter.emit('message', [message]);
  
}

var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' }
  }, null /* no socket */, true /* send from server */);
});
