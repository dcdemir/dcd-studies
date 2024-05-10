const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000);

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req,res) {
    const query = req.body.cityname;
    const unit = "metric";
    const apikey = "e716b6d1f31b61383e194b066aef349f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apikey; 

 

    https.get(url,function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently : " + weatherDescription +  "</p>");
            res.write("<h1>The temprature in " + query  + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imgUrl  +">");
            res.send();
        }) 
      
        
    })

    })