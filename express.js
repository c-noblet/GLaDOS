const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const options = require('options.env');
let urlencodedParser = bodyParser.urlencoded({extended: false});
let app = express();

mongoose.set('useFindAndModify', false);
const port = 80;

mongoose.connection.on("error", () => {
  console.log('Erreur lors de la connexion à la base de données');
});
mongoose.connection.on("open", () => {
  console.log('Connexion à la base de données réussie');
});

app.get('/glados', async (req, res, next) => {
  res.send('response');
  next();
});

app.listen(port, () => {
  console.log('Serveur à l\'écoute sur le port %d', port);
});