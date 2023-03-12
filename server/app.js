const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const { SHT31 } = require('sht31-node')

const sht31 = new SHT31()
const {sensorData} = require('./sht30')
console.log('sensorData',sensorData)
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = 8000;

app.use(cors());
app.use(express.static(path.join(__dirname + "/../test/", "build")));



app.get("/", async(req, res) => { 
  //res.sendFile(path.join(__dirname + "/../test/", "build", "index.html"));
//   return sht31.readSensorData().then(data => {
//     // Temperature in Celsius
//     const temperature = data.temperature.toFixed(2)
//     const humidity =  data.humidity.toFixed(2)
    

//   res.send({
//     humidity:humidity,
//     temperature:temperature
//   })
// }).catch(console.log)
//   res.send({
//     humidity:'error',
//     temperature:'error'
//   })

  return res.send(await sensorData())
 });

app.get("/info", (req, res) => {
  res.send({
    temperature: 23,
    humidity: 60,
  });
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  const interval = setInterval(() => {
    socket.emit("basicData", {
      temperature: Math.floor(Math.random() * 100),
      humidity: Math.floor(Math.random() * 20),
    });
  }, 2000);

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
    clearInterval(interval);
  });
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
