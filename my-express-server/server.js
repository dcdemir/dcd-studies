const express = require("express");

const app = express();

app.get("/", function(req,res) {
    res.send("<h1>Hello World</h1>");
})

app.get("/contact", function(req,res) {
    res.send("Contact me at fuckoff@gmail.com")
})

app.get("/about", function(req,res) {
    res.send("Who cares who i am man piss off")
})

app.get("/hobbies", function(req,res) {
    res.send("<ul><li>Gaming</li><li>Music</li><li>Anime</li></ul>")
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});