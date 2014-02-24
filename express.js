var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/views'));

app.get('/doug', function(req, res) {
  //res.sendfile("views/index.html");
  console.log("foundation");
  res.sendfile("views/foundation.html");
});


/*
var transport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "gmail.user@gmail.com",
    pass: "userpass"
  }
});
*/

app.get('*', function(req, res) {
  res.send("404");
});

module.exports = app;