var express = require("express");
var logfmt = require("logfmt");
var nconf = require('nconf');
var app = express();

// TODO: if gets more complex, switch to passing in app and config into init methods
nconf.argv()
  .env()
  .file({ file: 'config/config.json' });

// TODO: setup loggly
// TODO: set logo on admin.google.com

console.log("env", process.env);

app.use(logfmt.requestLogger());
app.use(express.compress());
app.use(express.json());
app.use(express.urlencoded());
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// make sure no filename collisions
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views/meta"));

app.get('/', function(req, res) {
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
    subject: '(' + req.body.name + ') Contact Us - DynamicNaturalMedicine.com',
    //text: "name: " + req.body.name + " ::: " + "email: " + req.body.email + " ::: " + "message: " + req.body.message,
    html: "<html><body><div>name: " + req.body.name + "</div><div>" + "email: " + req.body.email + "</div><div>" + "message: " + req.body.message +"</div></body></html>"
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    console.log("sendMail", error, response);
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
  res.status(404);
  res.sendfile("views/404.html");
});

module.exports = app;