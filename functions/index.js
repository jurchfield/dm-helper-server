const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase); 
const database = admin.firestore();

const characters = require('./characters');

// Pass database to child functions so they have access to it
exports.characters = functions.https.onRequest((req, res) => {
  characters.handler(req, res, database);
});