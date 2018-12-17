const { firestore } = require('firebase-functions-helper');

const racesCollection = 'races';

function POST({ body }, res, db) {
  firestore.createNewDocument(db, racesCollection, body);

  res.status(200).send({ message: 'Created a new race' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, racesCollection)
    .then(({ races }) => res.status(200).send(Object.keys(races).map(id => races[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}