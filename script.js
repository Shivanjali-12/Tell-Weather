const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
});
    

app.post("/", function(req,res){
    const query = req.body.cityName ;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid="+process.env.API_KEY+"&units=metric";
    
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const desc = weatherData.weather[0].description;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            //var fs = require('fs');
            //res.write(fs.readFileSync('style.css'));
            res.write("<style>body{background-color:rgb(208, 233, 225);text-align:center; padding-top:100px;}</style>");
            res.write("<h1>Temperature : " + temp + " Degrees Celcius</h1>");
            res.write("<img src="+ imgUrl + ">");
            res.write("<h1>Weather description : " + desc );
            //res.end();
            res.send();
        });
    });
});

app.listen(3000, function(){
    console.log("server started at port 3000");
});