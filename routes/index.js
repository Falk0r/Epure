var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const nodemailer = require('nodemailer');
const account = require('./account.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let send = false
  res.render('index', {send: send});
});

router.post('/',urlencodedParser, function(req, res) {

  const body = req.body;
  console.log(body);
  const fname = body.fname;
  const lname = body.lname;
  const society = body.society;
  const email = body.email;
  const message = body.message;
  const phone = body.phone;

  var transporter = nodemailer.createTransport({
    host: account.host,
    port: account.port,
    secure: true,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  var mailOptions = {
    from: account.from,
    to: account.user,
    replyTo: email,
    subject: "Message envoyé du formulaire de contact, société : " + society,
    text: message,
    html: `<!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      </head>
      <body>
        <div class="container">
        <h3>Via formulaire de contact de Epure.io</h3>
        <p>Prénom : ` + fname +`</p>
        <p>Nom : ` + lname +`</p>
        <p>Société : ` + society +`</p>
        <p>Téléphone : ` + phone +`</p>
        <p>Email : ` + email +`</p>
        <hr>
        <h4>Message :</h4>
        <p>` + message +`</p>
        </div>
      </body>
    </html>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  let send = true;
  res.render('success', {send: send});

});



module.exports = router;
