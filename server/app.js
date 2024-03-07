const path = require("path");
const cors = require("cors");
const express = require("express");
const {sensorData} = require('./sht30')
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);


io.on('connection', (socket) => { 
  
  setInterval(async ()=>{
    socket.emit('data',await sensorData())
  },500)

  console.log('adsasd') });
// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', () => { /* … */ });
//server.listen(3000);

const port = 8000

app.use(cors());
app.use(express.static(path.join(__dirname + "/../app/", "build")));


app.get("/", async(req, res) => { 
  return res.send(await sensorData())
 });

app.get("/info", (req, res) => {
  res.sendFile(path.join(__dirname + "/../app/", "build", "index.html"));
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
