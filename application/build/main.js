document.addEventListener('DOMContentLoaded',()=>{
  console.log("READY")
  const socket = io.connect(':8000');

  const temp = document.getElementById('temp')
  const hum = document.getElementById('hum')

  socket.on("data", (arg) => {
    temp.innerText = arg.temperature
    hum.innerText = arg.humidity
  });


})
