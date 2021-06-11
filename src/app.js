const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//console.log(__dirname);

//define paths for express config
const staticContentPath = path.join(__dirname,'template');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//console.log(partialsPath);
//configure handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticContentPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'EXPRESS WEATHER APP',
        name: 'Dwain Richardson'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About HandleBars',
        name: 'Dwain Richardson'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'HELP HandleBars',
        message: 'This is my templated help message',
        name: 'Dwain Richardson'
    })
})

app.get('/help/*', (req,res) => {
    res.render('notfound', {
        title: 'HELP HandleBars',
        content: 'Help page not found',
        name: 'Dwain Richardson'
    })
})

app.get('/weather', (req,res) =>{

    const address = req.query.address;

   if(!req.query.address){
       return res.send({error: 'You must provide an address'})
   }

    geocode(address, (error,data) => {

        if(error) {
            console.log(`Error: ${error}`);
            return res.send({error});
        }
        if(data) {

            const {center} = data.features[0];

          //  console.log(`Longitude: ${center[0]}`);
          //  console.log(`Latitude:  ${center[1]}`);

            forecast(center[1], center[0], (error, forecastData) =>{
                if(error) {
                    console.log(error);
                    return res.send({error});
                    return;
                }
                if(forecastData) {
                    const { observation_time,temperature, weather_descriptions } = forecastData.current;
                    const  {name} = forecastData.location;

                    //   console.log(forecastData);
                    // console.log(`The current forecast in ${forecastData.location.name} as of ${forecastData.current.observation_time} is ${forecastData.current.temperature} degrees. Conditions are ${forecastData.current.weather_descriptions[0]}` );
                   const forecastmessage = `The current forecast in ${name} as of ${observation_time} is ${temperature} degrees. Conditions are ${weather_descriptions[0]}`;

                   return res.send({location: name , forecast:  forecastmessage, address: address});
                }
            });
        }
    });

   //return res.send({ location: 'Philadelphia', forecast: 'Overcast and 60 degrees'})
});


app.get('/products', (req, res) => {
    if(req.query.search) {
        res.send({products: []})
    }
    else{
        res.send({ message: 'A search parameter must be provided'})
    }
})
app.get('*',(req,res)=> {
   res.render('notfound',{
       content: 'Page Not Found'
   })
});

app.listen(port, () => {
    console.log('server running on port 3000')
});
