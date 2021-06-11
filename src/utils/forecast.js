const request = require('postman-request');



const api_key = '094309fd688efb4da95c17ada3111c42';

const forecast = (longitude, latitude, callback)  => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${longitude},${latitude}&units = m`;
    request(url,{},(error,{body} = {}) => {
        const parsedBody = JSON.parse(body);
        if(error){
            callback(error, undefined);
        }
        else if(parsedBody.error){
            callback(parsedBody.error.info, undefined);
        }
        else {
            callback(undefined, JSON.parse(body));
        }
    })
};

module.exports = forecast;
