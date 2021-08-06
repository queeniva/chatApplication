const express = require("express")
const app = express()
const http  = require("http")
const server = http.createServer(app)
const {server} = require("socket.io")
const io = new server(server);

const port = 3000




app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
});

io.on("connection", function(socket){
console.log("a user is connected")
})




app.listen(port, function(){
    console.log("app running on port 3000")
});