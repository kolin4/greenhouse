const { SHT31 } = require('sht31-node')
const SHT30 = require(`sht31`);
const sht30 = new SHT30(0x44, 1); 
const sht31 = new SHT31()


module.exports = {
    sensorData :  ()=>{
        return sht31.readSensorData().then(data => {
            // Temperature in Celsius
            const temperature = data.temperature.toFixed(2)
            const humidity =  data.humidity.toFixed(2)
            
        
          return {
            humidity:humidity,
            temperature:temperature
          }
        }).catch(()=>{
            return{
                humidity:'error',
                temperature:'error'
              }
        }) 
            
        
        
    },
    sensorData2:()=> sht30
    .init()
    .then(() => sht30.readSensorData())
    .then((data) => {
      // data object follows this format:
      // { temperature: Number, humidity: Number }
      // temperature is in celcius unit.
      return {
        ...data
      }
    })
    .catch((err) => {
      // Handle error here
      // ...
    })
}  