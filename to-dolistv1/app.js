const express = require("express");
const bodyParser = require("express");

const app = express();

let items = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen("3000",function() {
    console.log("The server is running on port 3000");
})

app.get("/",function(req,res) {
    
    let today = new Date();
    let currentDay = today.getDay();

    let options = {
         weekday: "long",
         day: "numeric",
         month: "long"
    };

    let day = today.toLocaleDateString("en-US",options);

    res.render("List",{kindOfDay: day, newlistItems: items});
  
})

app.post("/",function(req,res) {
    let item = req.body.newItem;  
    items.push(item);
    res.redirect("/");
})

