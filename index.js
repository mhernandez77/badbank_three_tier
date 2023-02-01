var express = require("express");
var app = express();
var cors = require("cors");

require("dotenv").config();
console.log(process.env);

var dal = require("./dal.js");

//create user account
app.get('/public/create/:name/:email/:password', function (req, res) {
  res.send({
    name: req.params.name,
    email: req.params.email,
    password: req.params.password
  });
});

//login user
app.get ('public/login/:email/:password', function (req, res){
  res.send({
    email: req.params.email,
    password: req.params.password
  });
});

//return all accounts
app.get('/public/alldata', function (req, res){
  res.send({
    name: 'peter',
    email: "peter@mit.edu",
    password: 'secret'
  });
});
// Used to serve the static files from the public directory
app.use(express.static("public"));
app.use(cors());

// Adding the route definition for creating new users (now with the database)
app.get("/public/create/:name/:email/:password/:userID", function (req, res) {
  dal
    .create(
      req.params.name,
      req.params.email,
      req.params.password,
      req.params.userID
    )
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// Adding the route definition for getting the user info
app.get("/public/balance/:userID", function (req, res) {
  dal.getBalance(req.params.userID).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// Adding the route definition for updating the user balance
app.get("/public/balance/:userID/:newBalance", function (req, res) {
  dal.changeBalance(req.params.userID, req.params.newBalance).then((result) => {
    console.log(result);
    res.send(result);
  });
});

// Adding the route definition for updating the user activity
app.get(
  "/account/changeactivity/:userID/:activityDate/:activityTime/:activityType/:activityAmount/:activityBalance",
  function (req, res) {
    dal
      .updateActivity(
        req.params.userID,
        req.params.activityDate,
        req.params.activityTime,
        req.params.activityType,
        req.params.activityAmount,
        req.params.activityBalance
      )
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  }
);

// Adding the route definition for returning all account data (now with the database)
app.get("/public/alldata", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

// Listening for the port
var port = 3000;
app.listen(port);
  console.log("Running on port: " + port);
