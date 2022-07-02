const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

const items = ["But Food", "Eat"];
const workItems = [];

app.set("view engine", "ejs");

const bodtParser = require("body-parser");

app.use(bodtParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItem: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work Items", newListItem: workItems }); //passing work items
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/work", function (req, res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work"); //run aap.get
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  console.log(req.body.list);
  if (req.body.list == "Work") {   //work lekhe ne hune
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/"); //run root
  }
});

app.listen(3000, function () {
  console.log("Server Up and running");
});
