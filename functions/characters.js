const { firestore } = require('firebase-functions-helper');

const charactersCollection = 'characters';

function POST(req, res, db) {
  firestore.createNewDocument(db, charactersCollection, req.body);
  res.status(200).send('Create a new character');
}

function PUT(req, res, db) {
  firestore
    .updateDocument(db, charactersCollection, req.params.characterId, req.body);
  res.status(200).send('Update a new character');
}

function GET(req, res, db) {
  firestore
    .backup(db, charactersCollection)
    .then(({ characters }) => res.status(200).send(Object.keys(characters).map(id => characters[id])))
    .catch(err => res.status(500).send(err));
}

exports.handler = (req, res, db) => {
  return {
    POST,
    PUT,
    GET,
  }[req.method](req, res, db);
}