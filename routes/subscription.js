var express = require('express');
var router = express.Router();
const request = require('request');
const account = require('./account.js');
const airtable = require('airtable');
const base = new airtable({apiKey: account.airtableAPI}).base(account.airtableBase);

var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  let send = false
  res.render('subscription', {send: send});
});

router.post('/',urlencodedParser, function(req, res) {

  const body = req.body;
  console.log(body);
  const prenom = body.prenom;
  const nom = body.nom;
  const societe = body.societe;
  const mail = body.mail;
  const phone = body.phone;
  console.log("le prénom est " + prenom);

  base('Table 1').create([
    {
      "fields": {
        "Name": prenom,
        "Mail": mail,
        "Society": societe,
        "LName": nom,
        "Phone": phone,
        "State": "Non appelé, Non client"
      }
    }
  ], function(err, records) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("enregistrement effectué");
  });



let send = true;
res.render('subscription', {send: send});

});

module.exports = router;
