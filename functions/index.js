const functions = require('firebase-functions');
const admin = require('firebase-admin');
const characters = require('./characters');
const creatures = require('./creatures');
const cors = require('cors')({
  origin: true,
});

const settings = {timestampsInSnapshots: true};

/** INITIALIZE DATABASE */
admin.initializeApp(functions.config().firebase);
admin.firestore().settings(settings);

const database = admin.firestore();

/** CHARACTERS API */
exports.characters = functions.https.onRequest((req, res) => {
  return cors(req, res, () => characters.handler(req, res, database))
});

/** CREATURES API */
exports.creatures = functions.https.onRequest((req, res) => {
  return cors(req, res, () => creatures.handler(req, res, database));
});