

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article",articleSchema);

//// All Articles

app.route("/articles")
.get(function(req,res){
    Article.find(function(err,posts){
        if(!err) {
            res.send(posts);
        }
        else {
            res.send(err);
        }
    })
})
.post(function(req,res){

    const newArticle = new Article({
        title: req.body.title,
        content:req.body.content
    });
    
    newArticle.save(function(err){
        if(!err) {
            res.send("Successfully added a new article!");
        }
        else {
            res.send(err);
        }
    });
    
    })
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles!");
        }
        else
        {
            res.send(err);
        }
    })
})

//// Specific Articles

app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title: req.params.articleTitle},function(err,foundPost){
        if(foundPost) {
            res.send(foundPost);
        }
        else 
        {
            res.send("No Matches Found!" + " " + err);
        }
    })
})
.put(function(req,res){
    Article.findOneAndUpdate(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite : true},
    function(err) {
        if(!err){
            res.send("Successfully updated the article!");
        }
        else {
            res.send(err);
        }
    }
    )
})
.patch(function(req,res){
    Article.findOneAndUpdate(
        {title:req.params.articleTitle},
        {$set: req.body},
        function(err) {
            if(!err){
                res.send("Successfully updated the article!")
            }
            else 
            {
                res.send(err);
            }
        }
    )
})
.delete(function(req,res){
    Article.findOneAndDelete(
        {title:req.params.articleTitle},function(err){
            if(!err) {
                res.send("Successfully deleted article");
            }
            else {
                res.send(err);
            }
        })
})
    
app.listen(3000, function() {
  console.log("Server started on port 3000");
});