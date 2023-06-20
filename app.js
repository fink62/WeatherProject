const express = require('express');
const https = require("https");

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=London,UK&appid=6691763b26f6cae92f9e7f9673a5fbe2"
  https.get(url, (response) => {
    console.log(response.statusCode);
  
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
    })
  })
  res.send('Server is up and running');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })