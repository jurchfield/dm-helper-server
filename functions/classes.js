const { firestore } = require('firebase-functions-helper');

const classesCollection = 'classes';

function POST({ body }, res, db) {
  firestore.createNewDocument(db, classesCollection, body);

  res.status(200).send({ message: 'Created a new class' });
}

function PUT(req, res, db) {
  res.status(403).send({ message: 'Put is forbidden at this time :(' });
}

function GET(req, res, db) {
  firestore
    .backup(db, classesCollection)
    .then(({ classes }) => res.status(200).send(Object.keys(classes).map(id => classes[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}