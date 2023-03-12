const { SHT31 } = require('sht31-node')

const sht31 = new SHT31()

module.exports = {
    sensorData : ()=>{
        return sht31.readSensorData().then(data => {
            // Temperature in Celsius
            const temperature = data.temperature.toFixed(2)
            const humidity =  data.humidity.toFixed(2)
            
        
          res.send({
            humidity:humidity,
            temperature:temperature
          })
        }).catch(console.log)
          res.send({
            humidity:'error',
            temperature:'error'
          }) 
    }
}  