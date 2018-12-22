const { firestore } = require('firebase-functions-helper');

const traitsCollection = 'traits';

function POST({ body }, res, db) {
  firestore.createNewDocument(db, traitsCollection, body);

  res.status(200).send({ message: 'Created a new trait' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, traitsCollection)
    .then(({ traits }) => res.status(200).send(Object.keys(traits).map(id => traits[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}