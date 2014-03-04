var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/views'));

app.get('/single-page', function(req, res) {
  res.sendfile("views/single-page.html");
});

//app.get('/contact', routes.contact);
//exports.contact = function(req, res){
//  res.render('contact', { title: 'Raging Flame Laboratory - Contact', page: 'contact' })
//};

/*
var transport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "gmail.user@gmail.com",
    pass: "userpass"
  }
});
*/

var nodemailer = require('nodemailer');




app.get('*', function(req, res) {
  res.send("404");
});

module.exports = app;