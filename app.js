const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
  const query = req.body.cityName;
  const appID = "6691763b26f6cae92f9e7f9673a5fbe2";
  const units ="metric";
  
  const url = apiURL + query + "&appid=" + appID + "&units=" + units;

  https.get(url, (response) => {
    console.log(response.statusCode);
  
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const clouds = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write('<h1>The temperature in ' + query + ' is now ' + temp + ' degrees Celsius.</h1>');
      res.write('<p>The cloud situation is ' + clouds + '.</p>');
      res.write('<img src=' + iconURL +'>');
      res.send();
  })
})
console.log(req.body.cityName);
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})