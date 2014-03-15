var express = require("express");
var logfmt = require("logfmt");
var nconf = require('nconf');
var app = express();

// TODO: if gets more complex, switch to passing in app and config into init methods
nconf.argv()
  .env()
  .file({ file: 'config/config.json' });

app.use(logfmt.requestLogger());
app.use(express.json());
app.use(express.urlencoded());
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/views'));

app.get('/single-page', function(req, res) {
  res.sendfile("views/single-page.html");
});

var nodemailer = require('nodemailer');

app.post("/contact", function(req, res) {
  console.log("contact post", req.body);

  // TODO: validate name, email, message;

  var mailOpts, smtpTrans;

  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: nconf.get("google:gmail:user"),
      pass: nconf.get("google:gmail:password")
    }
  });

  //Mail options
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'info@dynamicnaturalmedicine.com',
    subject: 'Contact Us - DynamicNaturalMedicine.com',
    text: req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.json({ error: true, message: "Oops, something went wrong, please try again later." });
    }
    else {
      res.json({ error: false, message: "We will get back to you shortly!"});
    }
  });
});

// all else
app.get('*', function(req, res) {
  res.send("404");
});

module.exports = app;