const request = require('postman-request');
const access_key = 'pk.eyJ1IjoiZHdhaW5yaWNoYXJkc29uIiwiYSI6ImNrcGJ1a2d4ODExYW0zMXBuMjQzMmNkZjAifQ.NQ0cgbgnG5CA0thqNdke7g';
const baseUrl = 'https://api.mapbox.com/';

const geocode = (address, callback) => {
    const url = `${baseUrl}geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${access_key}`;
   if(address) {
       request(url, {
           rejectUnauthorized: false
       }, (error, { body} ) => {


           console.log(JSON.parse(body));
           if (error) {
               console.log(error);
               callback('Unable to connect to location services', undefined);
           }
           /* else if(response.body.features.length === 0) {
                callback('Unable to find location. Try another search.')
            }*/
           else {
               callback(undefined, JSON.parse(body));
           }
       });
   }
   else{
       console.log('Please provide a location in the command line arguments')
   }
}

module.exports = geocode;
