//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
   name: String
});

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item ({
   name: "Welcome to your to do list!"
})

const item2 = new Item ({
  name: "Click the + button to add a new item."
})

const item3 = new Item ({
  name: "<----- Hit this to delete an item."
})

const defaultItems = [item1,item2,item3];

const listSchema = new mongoose.Schema({
   name: String,
   items: [itemsSchema]
});

const List = mongoose.model("List",listSchema);

app.get("/", function(req, res) {

  Item.find({},function(err,foundItems){
    
  if (foundItems.length === 0) {
    Item.insertMany(defaultItems,function(err){
      if (err) {
        console.log(err,"There was an error");
      }
      else {
        console.log("Items added sucessfully");
      }
  });
  }
  else {
    res.render("list", {listTitle: "Today", newListItems: foundItems});
  }     
 });  
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName},function(err,foundList){
       foundList.items.push(item);
       foundList.save();
       res.redirect("/" + listName);
    });
  }
 

});

/*app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});*/

app.post("/delete",function(req,res){
  const checkedItemid = req.body.checkBox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemid,function(err){
      if (err){
        console.log(err,"There has been an error in removing the item!");
      }
      else {
        console.log("Item successfully removed");
        res.redirect("/");
      }
   });
 } else {
   List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemid}}},function(err,foundList){
          if (!err) {
             res.redirect("/" + listName);
          }
   });
 }

  
})

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/:customListName",function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName},function(err,foundList){
        if (!err) {
          if(!foundList) {
            const list = new List({
              name: customListName,
              items: defaultItems
          });
             list.save();
             res.redirect("/" + customListName);
          }
          else {
            res.render("List",{listTitle: foundList.name, newListItems: foundList.items});
            
          }
        }
  });




});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
