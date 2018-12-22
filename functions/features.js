const { firestore } = require('firebase-functions-helper');

const featuresCollection = 'features';

function POST({ body }, res, db) {
  firestore.createNewDocument(db, featuresCollection, body);

  res.status(200).send({ message: 'Created a new feature' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, featuresCollection)
    .then(({ features }) => res.status(200).send(Object.keys(features).map(id => features[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}