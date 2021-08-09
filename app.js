const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost:27017/chatAppDB', {useNewUrlParser: true, useUnifiedTopology: true});

const chatSchema = {
  message:String
}
const Chat = mongoose.model("Chat", chatSchema)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    const text =  new Chat({
      message:msg
    })
    text.save();
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});