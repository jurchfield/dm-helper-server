const functions = require('firebase-functions');
const admin = require('firebase-admin');
const characters = require('./characters');
const creatures = require('./creatures');
const spells = require('./spells');
const weapons = require('./weapons');
const encounters = require('./encounters');
const races = require('./races');
const classes = require('./classes');
const subclasses = require('./subclasses')
const cors = require('cors')({
  origin: true,
});

const settings = {timestampsInSnapshots: true};

/** INITIALIZE DATABASE */
admin.initializeApp(functions.config().firebase);
admin.firestore().settings(settings);

const database = admin.firestore();
const auth = admin.auth();

/** CREATURES API */
exports.creatures = functions.https.onRequest((req, res) => {
  return cors(req, res, () => creatures.handler(req, res, database));
});

/** SPELLS API */
exports.spells = functions.https.onRequest((req, res) => {
  return cors(req, res, () => spells.handler(req, res, database));
});

/** WEAPONS API */
exports.weapons = functions.https.onRequest((req, res) => {
  return cors(req, res, () => weapons.handler(req, res, database));
});

/** ENCOUNTERS API */
exports.encounters = functions.https.onRequest((req, res) => {
  return cors(req, res, () => encounters.handler(req, res, database, auth));
});

/** CHARACTERS API */
exports.characters = functions.https.onRequest((req, res) => {
  return cors(req, res, () => characters.handler(req, res, database, auth))
});

/** RACES API */
exports.races = functions.https.onRequest((req, res) => {
  return cors(req, res, () => races.handler(req, res, database, auth))
});

/** CLASSES API */
exports.classes = functions.https.onRequest((req, res) => {
  return cors(req, res, () => classes.handler(req, res, database, auth))
});

/** SUBCLASSES API */
exports.subclasses = functions.https.onRequest((req, res) => {
  return cors(req, res, () => subclasses.handler(req, res, database, auth))
});
