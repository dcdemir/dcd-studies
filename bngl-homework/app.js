const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const https = require("https");
const { chunk, each, includes, isEmpty } = require("lodash");
const { json } = require("express/lib/response");
const async = require("async");
const res = require("express/lib/response");
const { promiseImpl } = require("ejs");
const request = require("request");
const { Console } = require("console");


const app = express();
app.locals._ = _;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

let url = "https://bilimneguzellan.net/wp-json/wp/v2/";
let postsUrl = "https://bilimneguzellan.net/wp-json/wp/v2/posts/";
let homeUrl = "https://bilimneguzellan.net/wp-json/wp/v2/posts?_embed=author,wp:term,wp:featuredmedia&per_page=20";
let categoryUrl = "https://bilimneguzellan.net/wp-json/wp/v2/categories?_embed=up";
let categoryJSON;


let getWPPost = function(req, res){
  let headers, options;
  // Set the headers
  headers = {
      'Content-Type':'application/x-www-form-urlencoded',
     
  }
  // Request Configuration
  options = {
      url: homeUrl,
      method: 'GET',
      headers: headers,
      
  }
  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.render("home",{
             success: true,
             message: "Successfully fetched a list of post", 
             posts: JSON.parse(body),
          });
      } else {
           console.log(error);
      }
   });
 };

//JSON file sends titles and dates in a weird way. I have to figure out a way fix that problem.
// Found a way to display the names of the authors/users.
// Still trying to find a way to display category names instead of IDs. 
app.get("/", function(req,res) {


  getWPPost(req,res);
    
  
})

// Able to get post content but the rendered text is all wrong. Gettings posts by post ID. SEO will be done later (idk if I can though).
app.get('/posts/:posts',function(req,res) {
  let requestedPost = req.params.posts;
  let headers, options;
  let articleUrl = 'https://bilimneguzellan.net/wp-json/wp/v2/posts/' + requestedPost;
    headers = {
        'Content-Type':'application/x-www-form-urlencoded', 
    }
    options = {
        url: articleUrl,
        method: 'GET',
        headers: headers
    }
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            res.render("posts",{
               success: true,
               message: "Successfully fetched a list of post", 
               articles: JSON.parse(body)
               
            });   
        } else {
             console.log(error);
        }
     });   
})




// Just for test. Subject to change.
// Gotta send get request to v2/categories/ and embed the "up" section to get both the parent categories and the sub categories. 
// Gotta figure out pagination for every route not just this one.
// stylesheet gets rejected on the category.ejs file for some reason idk why. Gotta fix.
app.get('/category/:maincategory',function(req,res) {

    let requestedCategory = req.params.maincategory;
    let categoryID;

    switch(requestedCategory) {
        case "pop":
            categoryID=60;
            break;
        case "dogal":
            categoryID=61;
            break;
        case "sosyal":
            categoryID=62;
            break;
    }
    
    let headers, options;
    let articleUrl = 'https://bilimneguzellan.net/wp-json/wp/v2/posts?_embed=author,wp:term,wp:featuredmedia&categories=' + categoryID;
      headers = {
          'Content-Type':'application/x-www-form-urlencoded', 
      }
      options = {
          url: articleUrl,
          method: 'GET',
          headers: headers
      }
      // Start the request
      request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              res.render("category",{
                 success: true,
                 message: "Successfully fetched a list of post", 
                 posts: JSON.parse(body)
                 
              });   
          } else {
               console.log(error);
          }
       });
  
  })




app.get("/faq",function(req,res){
    res.render("faq");
})

// Gotta send a get request to this site https://bilimneguzellan.net/wp-json/wp/v2/pages/2227
// Gotta find a way to render the content. Rendered content is displayed as plain text instead of html.
app.get("/about",function(req,res){
  /*  let headers, options;
  // Set the headers
  headers = {
      'Content-Type':'application/x-www-form-urlencoded',
     
  }
  // Request Configuration
  options = {
      url: "https://bilimneguzellan.net/wp-json/wp/v2/pages/2227",
      method: 'GET',
      headers: headers,
      
  }
  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.render("info",{
             success: true,
             message: "Successfully fetched a list of post", 
             users: JSON.parse(body)
          });
      } else {
           console.log(error);
      }
   });*/
   res.render('info');
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port,function() {
    console.log("Server started on port: " + port + " !");
})
