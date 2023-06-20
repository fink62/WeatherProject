const express = require('express');
const https = require("https");

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Berlin,DE&appid=6691763b26f6cae92f9e7f9673a5fbe2&units=metric"
  https.get(url, (response) => {
    console.log(response.statusCode);
  
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const clouds = weatherData.weather[0].description;
      res.write('<h1>The temperature in Berlin is ' + temp + '°C.</h1>');
      res.write('<p>The cloud situation is ' + clouds + '.</p>')
    })

  })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })