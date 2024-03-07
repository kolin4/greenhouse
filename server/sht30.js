const { SHT31 } = require('sht31-node')

const sht31 = new SHT31()

module.exports = {
    sensorData :  ()=>{
        return sht31.readSensorData().then(data => {
            // Temperature in Celsius
            const temperature = data.temperature
            const humidity =  data.humidity
            
        
          return {
            humidity:humidity,
            temperature:temperature,
            adjustedTemp: temperature -1
          }
        }).catch(()=>{
            return{
                humidity:'error',
                temperature:'error'
              }
        }) 
            
        
        
    }
}  