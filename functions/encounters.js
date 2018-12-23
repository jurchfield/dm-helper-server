const { firestore } = require('firebase-functions-helper');
const { constructListResponse } = require('./shared');

const encountersCollection = 'encounters';

function POST(req, res, db) {
  firestore.createNewDocument(db, encountersCollection, req.body);
  res.status(200).send({ message: 'Create a new encounter' });
}

function PUT(req, res, db) {
  firestore
    .updateDocument(db, encountersCollection, req.params.encounterId, req.body);
  res.status(200).send({ message: 'Update a new encounter' });
}

function GET(req, res, db) {
  firestore
    .backup(db, encountersCollection)
    .then(({ encounters }) => res.status(200).send(constructListResponse(encounters)))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db, auth) => {
  const token = req.header('Token');

  if (!token) return res.status(401).send({ message: 'No token. Please log in to use encounters' });

  return auth
    .verifyIdToken(token)
    .then(({ uid }) => {
      return {
        POST,
        PUT,
        GET,
      }[req.method](req, res, db, uid);
    })
    .catch(error  => res.status(500).send({ message: 'Error verifying token. Please log in again', error }));
}