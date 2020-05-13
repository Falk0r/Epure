
# Epure.io

lien du site : https://www.epure.io/
## Sideprojet

Le concept est de proposer à des entreprises de gérer les accès, identifiants, mots de passe et applications disponibles pour chacun de leurs collaborateurs.

Le collaborateur s'identifie sur un portail web à l'aide d'une seule paire login/mot de passe, et accède automatiquement à ses applications qui lui sont affectés. L'accès aux applications et transparente pour le collaborateur, il n'a pas à ce soucier des logins et mot de passe associés.

Epure.io, en lien avec le chargé de projet ou l'informaticien de l'entreprise, configurent ensemble les solutions à dispositions des collaborateurs au cas par cas ou par groupes utilisateurs.

## Concernant le développement de l'application web

L'application est basé sur une architecture en __NODE.js__ à l'aide du framework __Express.js__.

Le front est articulé autour d'un template HTML Colorlib. Ce choix a été fait pour lancer le site le plus rapidement possible sans avoir à coder l'ensemble du visuel.

Le développement d'un front-end "maison" serait pertinent après un lancement de la société.

## Formulaire d'inscription

le formulaire d'inscription sur la page https://www.epure.io/subscription est connecté à un fichier __Airtable__ via les lignes de code suivantes :

```javascript
const airtable = require('airtable');
const base = new airtable({apiKey: account.airtableAPI}).base(account.airtableBase);

const body = req.body;
  const prenom = body.prenom;
  const nom = body.nom;
  const societe = body.societe;
  const mail = body.mail;
  const phone = body.phone;

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
  ```
  On connecte notre formulaire à l'application __Airtable__ par API afin que les coordonnées soit directement accèssibles pour convenir d'un entretien téléphonique.

  ## Formulaire de contact

  La gestion d'envoi des mails de contact est codé à l'aide du module Nodemailer. Voici le détail du code :

  ```javascript
  const nodemailer = require('nodemailer');

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
  ```
  La mise en forme du contenu du mail est faite avec le framework __Bootstrap__.
