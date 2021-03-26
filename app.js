const express = require("express");
const https = require("https");
const path = require('path');

const app = express();

app.get("/", function(req, res){
  //const url = "https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=bfde51449c27aea6eaf036853e7630b5&units=metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=bfde51449c27aea6eaf036853e7630b5&units=metric";
  const page = 'C:/Users/Johnathan Nichols/Desktop/intro-to-node/WeatherProject/index.html';
  app.engine('html', require('ejs').renderFile);

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const cloudImage = "https://github.com/johnathan-Nichols/IWS_19l1040001/blob/main/cloud.png?raw=true";
      res.render(page,{
        cloudImage: cloudImage,
        weatherData: weatherData,
        temp: temp,
        weatherDescription: weatherDescription,
        icon: icon,
        imageURL: imageURL
      });

      res.sendFile(page);
    });
  });


});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
