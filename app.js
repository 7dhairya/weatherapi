const express = require("express");
const app = express();
const https = require("https");
const body = require("body-parser");
app.use(body.urlencoded({extended:true}));
app.get("/", function(req, res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req, res){
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a14ab4979e2db4f41fd5b46c78333048&units=metric";
  https.get(url, function(response){
    console.log(response.statuscode);
    response.on ("data", function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const location = weatherdata.name
      const weatherdes = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>the weather forecast web API</h1>");
      res.write("<ul><li>LOCATION="+location+"</li><li>TEMPERATURE="+temp+"</li><li>WEATHER DESCRIPTION="+weatherdes+"</li>    <img src="+imgurl+"></ul>");
      res.send()
        })
  })
})

app.listen(3000, function(){
  console.log("server is run at 3000");
})
