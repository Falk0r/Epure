var express = require('express');
var router = express.Router();
const request = require('request');
const axios = require('axios');

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
  console.log("le prénom est " + prenom);

  axios.post('https://v2-api.sheety.co/98c650b7a10456361b4a41952403a398/subscriptionAlpha/feuille1', {
    feuille1: {
      prenom: prenom,
      nom: nom,
      societe: societe,
      mail: mail
    }
  })
  .catch(function(error) {
    console.log(error);
  });

let send = true;
res.render('subscription', {send: send});

});

module.exports = router;
