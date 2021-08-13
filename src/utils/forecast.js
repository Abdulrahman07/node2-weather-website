const request = require('request')

const forecast = (lon, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ encodeURIComponent(lat) + '&lon='+ encodeURIComponent(lon) + '&appid=f8271bd5ed602123c0a2ab3d83dde3e1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect weather service!', undefined,)
        } else if (body.message){
            if (body.message === "wrong longitude"){
                callback('Wrong longitude. Try anthor one', undefined)
            } else if (body.message === "wrong latitude"){
                callback('Wrong latitude. Try anthor one', undefined)
            } else {
                callback('Unable to find location', undefined)
            }
        } else {
            callback(undefined, body.daily[0].weather[0].description + ' It\'s currently '+ body.current.temp + ' degrees out. The main weather will be ' + body.current.weather[0].main)
        }
    })
}
module.exports = forecast